import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageSeenSvg } from "@/lib/svgs";
import { ImageIcon, Users, VideoIcon, FileIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRoomStore } from "@/store/chat-store";
// import { Id } from "./../../../convex/_generated/dataModel";

const Room = ({ room }: { room: any }) => {
	const roomImage = room.imageUrl;
	const roomName = room.name || "Private Chat";
	const lastMessage = room.lastMessage;
	const lastMessageType = lastMessage?.type;
	const me = useQuery(api.users.getMe);

	const { setSelectedRoom, selectedRoom } = useRoomStore();

	const activeBgClass = selectedRoom?._id === room._id;

	return (
		<>
			<div className={`flex gap-2 items-center p-3 hover:bg-chat-hover cursor-pointer ${activeBgClass ? "bg-gray-tertiary" : ""}`}
			onClick={() => setSelectedRoom(room)}
			>
				<Avatar className='border border-gray-900 overflow-visible relative'>
					<AvatarImage src={roomImage || "/placeholder.png"} className='object-cover rounded-full' />
					<AvatarFallback>
						<div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full'></div>
					</AvatarFallback>
				</Avatar>
				<div className='w-full'>
					<div className='flex items-center'>
						<h3 className='text-xs lg:text-sm font-medium'>{roomName}</h3>
						<span className='text-[10px] lg:text-xs text-gray-500 ml-auto'>
							{formatDate(lastMessage?._creationTime || room._creationTime)}
						</span>
					</div>
					<p className='text-[12px] mt-1 text-gray-500 flex items-center gap-1 '>
						{lastMessage?.sender === me?._id ? <MessageSeenSvg /> : ""}
						{room.isGroup && <Users size={16} />}
						{!lastMessage && "Say Hi!"}
						{lastMessageType === "text" ? lastMessage?.message.length > 30 ? (
							<span className='text-xs'>{lastMessage?.message.slice(0, 30)}...</span>
						) : (
							<span className='text-xs'>{lastMessage?.message}</span>
						) : null}
						{lastMessageType === "image" && <ImageIcon size={16} />}
						{lastMessageType === "video" && <VideoIcon size={16} />}
						{lastMessageType === "document" && <FileIcon size={16} />}
					</p>
				</div>
			</div>
			<hr className='h-[1px] mx-10 bg-gray-primary' />
		</>
	);
};
export default Room;