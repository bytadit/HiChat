"use client";
import {
  ListFilter,
//   LogOut,
  MessageSquareDiff,
  Search,
//   User,
} from "lucide-react";
import { Input } from "../ui/input";
import ThemeSwitch from "@/components/home/theme-switch";
import { rooms } from "@/dummy-data/db";
import Room from "./room";
import { UserButton } from "@clerk/nextjs";
import {
  SignedIn,
  SignedOut,
  SignInButton,
//   SignOutButton,
} from "@clerk/clerk-react";
import UserListDialog from "./user-list-dialog";

export default function LeftPanel() {
  return (
    <div className="w-1/4 border-gray-600 border-r">
      <div className="sticky top-0 bg-left-panel z-10">
        <div className="flex justify-between bg-gray-primary p-3 items-center">
          {/* <User size={24} /> */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <div className="flex items-center gap-3">
            {/* <MessageSquareDiff size={20} /> */}
            <UserListDialog></UserListDialog>
            <ThemeSwitch />
            {/* <LogOut size={20} className='cursor-pointer' /> */}
          </div>
        </div>
        <div className="p-3 flex items-center">
          <div className="relative h-10 mx-3 flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search or start a new chat"
              className="pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent"
            />
          </div>
          <ListFilter className="cursor-pointer" />
        </div>
      </div>
      <div className="my-3 flex flex-col gap-0 max-h-[80%] overflow-auto">
        {rooms.map((room) => (
          <Room key={room._id} {...room} room={room} />
        ))}

        {rooms?.length === 0 && (
          <>
            <p className="text-center text-gray-500 text-sm mt-3">
              No rooms yet
            </p>
            <p className="text-center text-gray-500 text-sm mt-3 ">
              {"C'mon"} start a new chat!
            </p>
          </>
        )}
      </div>
    </div>
  );
}
