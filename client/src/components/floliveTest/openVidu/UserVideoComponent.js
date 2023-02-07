import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";

export default class UserVideoComponent extends Component {
	getNicknameTag() {
		// Gets the nickName of the user
		return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
	}

	render() {
		return (
			<>
				{this.props.streamManager !== undefined ? (
					<>
						<OpenViduVideoComponent streamManager={this.props.streamManager} />
						{/* 참여자 이름 */}
						{/* <div>
							<p>{this.getNicknameTag()}</p>
						</div> */}
					</>
				) : null}
			</>
		);
	}
}
