import React, { Component } from "react";

import { StreamVideo } from "../../../styles/flolive/OpenViduStyle";

export default class OpenViduVideoComponent extends Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
	}

	componentDidUpdate(props) {
		if (props && !!this.videoRef) {
			this.props.streamManager.addVideoElement(this.videoRef.current);
		}
	}

	componentDidMount() {
		if (this.props && !!this.videoRef) {
			this.props.streamManager.addVideoElement(this.videoRef.current);
		}
	}

	render() {
		return <StreamVideo autoPlay={true} ref={this.videoRef} />;
	}
}
