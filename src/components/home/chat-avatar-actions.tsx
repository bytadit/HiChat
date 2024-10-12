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
	const isMember = selectedRoom?.participants.includes(message.sender?._id);
	const createRoom = useMutation(api.rooms.createRoom);
	const isGroup = selectedRoom?.isGroup;

	const handleCreateRoom = async () => {
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
			{isGroup && message.sender?.name}
		</div>
	);
};
export default ChatAvatarActions;