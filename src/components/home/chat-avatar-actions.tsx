import { IMessage, useRoomStore } from "@/store/chat-store";
import { useMutation } from "convex/react";
import { Ban, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../../../convex/_generated/api";
import React from "react";

type ChatAvatarActionsProps = {
	message: IMessage;
	me: any;
};

const ChatAvatarActions = ({ me, message }: ChatAvatarActionsProps) => {
	const { selectedRoom, setSelectedRoom } = useRoomStore();

	const isMember = selectedRoom?.participants.includes(message.sender._id);
	// const kickUser = useMutation(api.rooms.kickUser);
	const createRoom = useMutation(api.rooms.createRoom);
	const fromAI = message.sender?.name === "ChatGPT";
	const isGroup = selectedRoom?.isGroup;

	// const handleKickUser = async (e: React.MouseEvent) => {
	// 	if (fromAI) return;
	// 	e.stopPropagation();
	// 	if (!selectedConversation) return;
	// 	try {
	// 		await kickUser({
	// 			conversationId: selectedConversation._id,
	// 			userId: message.sender._id,
	// 		});

	// 		setSelectedConversation({
	// 			...selectedConversation,
	// 			participants: selectedConversation.participants.filter((id) => id !== message.sender._id),
	// 		});
	// 	} catch (error) {
	// 		toast.error("Failed to kick user");
	// 	}
	// };

	const handleCreateRoom = async () => {
		// if (fromAI) return;

		try {
			const roomId = await createRoom({
				isGroup: false,
				participants: [me._id, message.sender._id],
			});

			setSelectedRoom({
				_id: roomId,
				name: message.sender.name,
				participants: [me._id, message.sender._id],
				isGroup: false,
				// isOnline: message.sender.isOnline,
				imageUrl: message.sender.imageUrl,
			});
		} catch (error) {
			toast.error("Failed to create conversation");
            console.log(error);
		}
	};

	return (
		<div
			className='text-[11px] flex gap-4 justify-between font-bold cursor-pointer group'
			onClick={handleCreateRoom}
		>
			{isGroup && message.sender.name}

			{!isMember && !fromAI && isGroup && <Ban size={16} className='text-red-500' />}
			{/* {isGroup && isMember && selectedRoom?.admin === me._id && (
				<LogOut size={16} className='text-red-500 opacity-0 group-hover:opacity-100' onClick={handleKickUser} />
			)} */}
		</div>
	);
};
export default ChatAvatarActions;