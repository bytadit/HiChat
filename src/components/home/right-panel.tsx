"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, X } from "lucide-react";
import MessageInput from "./message-input";
import MessageContainer from "./message-container";
import ChatPlaceHolder from "@/components/home/chat-placeholder";
import GroupMembersDialog from "@/components/home/group-members-dialog";
import { useRoomStore } from "@/store/chat-store";

const RightPanel = () => {
	const {selectedRoom, setSelectedRoom} = useRoomStore();
	if (!selectedRoom) return <ChatPlaceHolder />;

	const roomName = selectedRoom.name;
	const isGroup = selectedRoom.isGroup;
	const roomImage = selectedRoom.imageUrl;


	return (
		<div className='w-3/4 flex flex-col'>
			<div className='w-full sticky top-0 z-50'>
				<div className='flex justify-between bg-gray-primary p-3'>
					<div className='flex gap-3 items-center'>
						<Avatar>
							<AvatarImage src={roomImage || "/placeholder.png"} className='object-cover' />
							<AvatarFallback>
								<div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full' />
							</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<p>{roomName}</p>
							{isGroup && <GroupMembersDialog selectedRoom={selectedRoom} />}
						</div>
					</div>

					<div className='flex items-center gap-7 mr-5'>
						<X size={16} className='cursor-pointer' 
						onClick={() => setSelectedRoom(null)}/>
					</div>
				</div>
			</div>
			<MessageContainer />
			<MessageInput />
		</div>
	);
};
export default RightPanel;