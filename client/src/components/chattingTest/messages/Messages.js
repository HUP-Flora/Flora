import React, { useEffect } from "react";

import Message from "./message/Message";
import { ChatList } from "../../../styles/chatting/Messages/MessagesStyle";

function Messages({ messages }) {
	useEffect(() => {
		// console.log(messages);
	}, [messages]);

	return (
		<ChatList>
			{messages.map((message, i) => {
				return (
					<div key={i}>
						<Message message={message} />
					</div>
				);
			})}
		</ChatList>
	);
}

export default Messages;
