import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../../components/skeletons/MessageSkeleton.jsx";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessage.js";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	 useListenMessages();
	const lastMessageRef = useRef();
	useListenMessages();

	useEffect(() => {
		if (messages.length > 0) {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className="px-4 flex-1 overflow-auto">
			{!loading &&
				messages.length > 0 &&
				messages.map((message, index) => (
					<div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className="text-center">Send a message to start the conversation</p>
			)}
		</div>
	);
};

export default Messages;
