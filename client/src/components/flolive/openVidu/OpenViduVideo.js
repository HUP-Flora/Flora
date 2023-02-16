import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { Component } from "react";
import UserVideoComponent from "./UserVideoComponent";

import {
	SessionContainer,
	OwnerVideo,
	CustomerVideo,
	LeaveSessionButton,
	SessionWrapper,
	SessionHeader,
	VideoContainer,
	SwitchCameraWrapper,
	ButtonsContainer,
} from "../../../styles/flolive/OpenViduStyle";

import switchCamera from "../../../assets/flolive/switch-camera.png";

const APPLICATION_SERVER_URL = "https://i8b203.p.ssafy.io:8445";
// process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

class OpenViduVideo extends Component {
	constructor(props) {
		super(props);

		// These properties are in the state's component in order to re-render the HTML whenever their values change
		this.state = {
			mySessionId: this.props.mySessionId,
			myUserName: this.props.myType,
			userType: this.props.userType,
			session: undefined,
			mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
			publisher: undefined,
			subscribers: [],
		};

		console.log("세션아이디", this.state.mySessionId);
		console.log("유저네임", this.state.myUserName);
		this.joinSession = this.joinSession.bind(this);
		this.leaveSession = this.leaveSession.bind(this);
		this.switchCamera = this.switchCamera.bind(this);
		this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
		this.handleChangeUserName = this.handleChangeUserName.bind(this);
		this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
		this.onbeforeunload = this.onbeforeunload.bind(this);
		this.handleClickExit = this.handleClickExit.bind(this);
	}

	componentDidMount() {
		window.addEventListener("beforeunload", this.onbeforeunload);

		this.joinSession();
	}

	componentWillUnmount() {
		window.removeEventListener("beforeunload", this.onbeforeunload);
	}

	onbeforeunload(event) {
		this.leaveSession();
	}

	handleChangeSessionId(e) {
		this.setState({
			mySessionId: e.target.value,
		});
	}

	handleChangeUserName(e) {
		this.setState({
			myUserName: e.target.value,
		});
	}

	handleMainVideoStream(stream) {
		if (this.state.mainStreamManager !== stream) {
			this.setState({
				mainStreamManager: stream,
			});
		}
	}

	deleteSubscriber(streamManager) {
		let subscribers = this.state.subscribers;
		let index = subscribers.indexOf(streamManager, 0);
		if (index > -1) {
			subscribers.splice(index, 1);
			this.setState({
				subscribers: subscribers,
			});
		}
	}

	joinSession() {
		// --- 1) Get an OpenVidu object ---

		this.OV = new OpenVidu();

		// --- 2) Init a session ---

		this.setState(
			{
				session: this.OV.initSession(),
			},
			() => {
				var mySession = this.state.session;

				// --- 3) Specify the actions when events take place in the session ---

				// On every new Stream received...
				mySession.on("streamCreated", event => {
					// Subscribe to the Stream to receive it. Second parameter is undefined
					// so OpenVidu doesn't create an HTML video by its own
					var subscriber = mySession.subscribe(event.stream, undefined);
					var subscribers = this.state.subscribers;

					// subscribers.push(subscriber);

					// 참여자를 2인으로 제한
					subscribers.length = 2;

					// 사장이면 고객을 0번째 인덱스에, 고객이면 사장을 1번째 인덱스에
					// [고객, 사장]
					if (this.state.myUserName === "owner") {
						subscribers[0] = subscriber;
					} else if (this.state.myUserName === "customer") {
						subscribers[1] = subscriber;
					}

					// Update the state with the new subscribers
					this.setState({
						subscribers: subscribers,
					});
				});

				// On every Stream destroyed...
				mySession.on("streamDestroyed", event => {
					// Remove the stream from 'subscribers' array
					this.deleteSubscriber(event.stream.streamManager);
				});

				// On every asynchronous exception...
				mySession.on("exception", exception => {
					console.warn(exception);
				});

				// --- 4) Connect to the session with a valid user token ---

				// Get a token from the OpenVidu deployment
				this.getToken().then(token => {
					// First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
					// 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
					mySession
						.connect(token, { clientData: this.state.myUserName })
						.then(async () => {
							// --- 5) Get your own camera stream ---

							// Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
							// element: we will manage it on our own) and with the desired properties
							let publisher = await this.OV.initPublisherAsync(undefined, {
								audioSource: undefined, // The source of audio. If undefined default microphone
								videoSource: undefined, // The source of video. If undefined default webcam
								publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
								publishVideo: true, // Whether you want to start publishing with your video enabled or not
								resolution: "640x480", // The resolution of your video
								frameRate: 30, // The frame rate of your video
								insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
								mirror: false, // Whether to mirror your local video or not
							});

							// --- 6) Publish your stream ---

							mySession.publish(publisher);

							// Obtain the current video device in use
							var devices = await this.OV.getDevices();
							var videoDevices = devices.filter(device => device.kind === "videoinput");
							var currentVideoDeviceId = publisher.stream
								.getMediaStream()
								.getVideoTracks()[0]
								.getSettings().deviceId;
							var currentVideoDevice = videoDevices.find(
								device => device.deviceId === currentVideoDeviceId
							);

							// Set the main video in the page to display our webcam and store our Publisher
							this.setState({
								currentVideoDevice: currentVideoDevice,
								mainStreamManager: publisher,
								publisher: publisher,
							});
						})
						.catch(error => {
							console.log(
								"There was an error connecting to the session:",
								error.code,
								error.message
							);
						});
				});
			}
		);
	}

	leaveSession() {
		// --- 7) Leave the session by calling 'disconnect' method over the Session object ---

		const mySession = this.state.session;

		if (mySession) {
			mySession.disconnect();
		}

		// Empty all properties...
		this.OV = null;
		this.setState({
			mySessionId: this.props.mySessionId,
			myUserName: this.props.myType,
			userType: this.props.userType,
			session: undefined,
			mainStreamManager: undefined,
			publisher: undefined,
			subscribers: [],
		});
	}

	async switchCamera() {
		try {
			const devices = await this.OV.getDevices();
			var videoDevices = devices.filter(device => device.kind === "videoinput");

			if (videoDevices && videoDevices.length > 1) {
				var newVideoDevice = videoDevices.filter(
					device => device.deviceId !== this.state.currentVideoDevice.deviceId
				);

				if (newVideoDevice.length > 0) {
					// Creating a new publisher with specific videoSource
					// In mobile devices the default and first camera is the front one
					var newPublisher = this.OV.initPublisher(undefined, {
						videoSource: newVideoDevice[0].deviceId,
						publishAudio: true,
						publishVideo: true,
						mirror: true,
					});

					//newPublisher.once("accessAllowed", () => {
					await this.state.session.unpublish(this.state.mainStreamManager);

					await this.state.session.publish(newPublisher);
					this.setState({
						currentVideoDevice: newVideoDevice[0],
						mainStreamManager: newPublisher,
						publisher: newPublisher,
					});
				}
			}
		} catch (e) {
			console.error(e);
		}
	}

	handleClickExit() {
		this.props.setIsModalShow(true);
	}

	render() {
		const mySessionId = this.state.mySessionId;
		const myUserName = this.state.myUserName;
		const userType = this.state.userType;

		return (
			<SessionContainer>
				{this.state.session !== undefined ? (
					<SessionWrapper>
						<SessionHeader>
							<ButtonsContainer>
								<LeaveSessionButton onClick={this.handleClickExit}>종료</LeaveSessionButton>
								{/* <input
									className="btn btn-large btn-success"
									type="button"
									id="buttonSwitchCamera"
									onClick={this.switchCamera}
									value="Switch Camera"
								/> */}
								<SwitchCameraWrapper
									className="btn btn-large btn-success"
									type="button"
									id="buttonSwitchCamera"
									onClick={this.switchCamera}
									value="Switch Camera"
								>
									<img src={switchCamera} />
								</SwitchCameraWrapper>
							</ButtonsContainer>

							{this.state.publisher !== undefined ? (
								<>
									{/* 고객 화면 */}
									{/* 내가 고객이면 내 화면, 내가 사장이면 고객 화면 */}
									{/* [고객, 사장] */}
									<CustomerVideo>
										{/* <CustomerVideo onClick={() => this.handleMainVideoStream(this.state.publisher)}> */}
										<UserVideoComponent
											streamManager={
												this.state.myUserName === "customer"
													? this.state.publisher
													: this.state.subscribers[0]
											}
										/>
										<div style={{ backgroundColor: "green" }}>{userType}</div>
									</CustomerVideo>
								</>
							) : null}
						</SessionHeader>

						<VideoContainer>
							{this.state.mainStreamManager !== undefined ? (
								// 사장 화면
								// 내가 사장이면 내 화면, 내가 고객이면 사장 화면
								// [고객, 사장]
								<OwnerVideo>
									<UserVideoComponent
										streamManager={
											this.state.myUserName === "owner"
												? this.state.publisher
												: this.state.subscribers[1]
										}
									/>
									<div style={{ backgroundColor: "red" }}>{userType}</div>
								</OwnerVideo>
							) : null}
							{/* <div id="video-container" className="col-md-6"> */}
							{/* 내 화면 */}
							{/* {this.state.publisher !== undefined ? (
								<CustomerVideo
									// className="stream-container col-md-6 col-xs-6"
									onClick={() => this.handleMainVideoStream(this.state.publisher)}
								>
									<UserVideoComponent streamManager={this.state.publisher} />
								</CustomerVideo>
							) : null} */}
							{/* 다른 참여자 화면 */}
							{console.log("내 이름: ", myUserName)}
							{console.log("퍼블리셔", this.state.publisher)}
							{console.log("구독자", this.state.subscribers)}
							{/* {this.state.subscribers.map((sub, i) => (
								<>
									{console.log("서브!!!", sub?.stream?.connection?.data)}
									<CustomerVideo
										key={sub.id}
										className="stream-container col-md-6 col-xs-6"
										onClick={() => this.handleMainVideoStream(sub)}
									>
										<span>{sub.id}</span>
										<UserVideoComponent streamManager={sub} />
									</CustomerVideo>
								</>
							))} */}
							{/* </div> */}
						</VideoContainer>
					</SessionWrapper>
				) : null}
			</SessionContainer>
		);
	}

	/**
	 * --------------------------------------------
	 * GETTING A TOKEN FROM YOUR APPLICATION SERVER
	 * --------------------------------------------
	 * The methods below request the creation of a Session and a Token to
	 * your application server. This keeps your OpenVidu deployment secure.
	 *
	 * In this sample code, there is no user control at all. Anybody could
	 * access your application server endpoints! In a real production
	 * environment, your application server must identify the user to allow
	 * access to the endpoints.
	 *
	 * Visit https://docs.openvidu.io/en/stable/application-server to learn
	 * more about the integration of OpenVidu in your application server.
	 */
	async getToken() {
		const sessionId = await this.createSession(this.state.mySessionId);
		return await this.createToken(sessionId);
	}

	async createSession(sessionId) {
		// const response = await axios
		// 	.post(
		// 		APPLICATION_SERVER_URL + "openvidu/api/sessions",
		// 		{ customSessionId: sessionId },
		// 		{
		// 			headers: {
		// 				// Authorization: `Basic T1BFTlZJRFVBUFAgOiBNWV9TRUNSRVQ=`,
		// 				Authorization:
		// 					"Basic " + window.btoa("OPENVIDUAPP:" + process.env.REACT_APP_OPENVIDU_SERVER_SECRET),
		// 				// Authorization: "Basic " + encodedString,

		// 				// Authorization: `Basic EncodeBase64(OPENVIDUAPP:MY_SECRET)`,
		// 				"Content-Type": "application/json",
		// 			},
		// 		}
		// 	)
		// 	.then(response => {
		// 		console.log("세션 생성", response.data);
		// 		console.log("세션 아이디", response.data.sessionId);
		// 	})
		// 	.catch(error => {
		// 		console.log("세션 생성 에러", error);
		// 	});

		// console.log(response);

		// return response?.data?.sessionId; // The sessionId

		return new Promise((resolve, reject) => {
			let data = JSON.stringify({ customSessionId: sessionId });
			axios
				.post(`${APPLICATION_SERVER_URL}/openvidu/api/sessions`, data, {
					headers: {
						Authorization: `Basic ${window.btoa(
							`OPENVIDUAPP:${process.env.REACT_APP_OPENVIDU_SERVER_SECRET}`
						)}`,
						"Content-Type": "application/json",
					},
				})
				.then(response => {
					resolve(response.data.id);
				})
				.catch(response => {
					let error = { ...response };
					if (error?.response?.status === 409) {
						resolve(sessionId);
					}
				});
		});
	}

	async createToken(sessionId) {
		// console.log("토큰 생성", sessionId);
		// const response = await axios.post(
		// 	APPLICATION_SERVER_URL + "openvidu/api/sessions/" + sessionId + "/connection",
		// 	{},
		// 	{
		// 		headers: {
		// 			Authorization:
		// 				"Basic " + window.btoa("OPENVIDUAPP:" + process.env.REACT_APP_OPENVIDU_SERVER_SECRET),
		// 			"Content-Type": "application/json",
		// 		},
		// 	}
		// );
		// return response.data; // The token

		return new Promise((resolve, reject) => {
			let data = {};
			axios
				.post(`${APPLICATION_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`, data, {
					headers: {
						Authorization: `Basic ${window.btoa(
							`OPENVIDUAPP:${process.env.REACT_APP_OPENVIDU_SERVER_SECRET}`
						)}`,
						"Content-Type": "application/json",
					},
				})
				.then(response => {
					resolve(response.data.token);
				})
				.catch(error => reject(error));
		});
	}
}

export default OpenViduVideo;
