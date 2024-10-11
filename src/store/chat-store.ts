import { Id } from "../../convex/_generated/dataModel";
import { create } from "zustand";

export type Room = {
	_id: Id<"rooms">;
	imageUrl?: string;
	participants: Id<"users">[];
	isGroup: boolean;
	name?: string;
	groupImage?: string;
	admin?: Id<"users">;
	// isOnline?: boolean;
	lastMessage?: {
		_id: Id<"messages">;
		room: Id<"rooms">;
		message: string;
		sender: Id<"users">;
	};
};

type RoomStore = {
	selectedRoom: Room | null;
	setSelectedRoom: (room: Room | null) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
	selectedRoom: null,
	setSelectedRoom: (room) => set({ selectedRoom: room }),
}));

export interface IMessage {
	_id: string;
	message: string;
	_creationTime: number;
	type: "text" | "image" | "video" | "document";
	sender: {
		_id: Id<"users">;
		imageUrl: string;
		name?: string;
		tokenIdentifier: string;
		email: string;
		_creationTime: number;
		isOnline: boolean;
	};
}