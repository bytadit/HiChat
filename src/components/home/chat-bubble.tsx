import { IMessage, useRoomStore } from "@/store/chat-store";
import { MessageSeenSvg } from "@/lib/svgs";
import ChatBubbleAvatar from "./chat-bubble-avatar";
import DateIndicator from "./date-indicator";
import { useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { Download, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription } from "../ui/dialog";
import ChatAvatarActions from "./chat-avatar-actions";

type ChatBubbleProps = {
  message: IMessage;
  me: any;
  previousMessage?: IMessage;
};

const ChatBubble = ({ me, message, previousMessage }: ChatBubbleProps) => {
  const date = new Date(message._creationTime);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const time = `${hour}:${minute}`;

  const { selectedRoom } = useRoomStore();

  const isMember =
    selectedRoom?.participants.includes(message?.sender?._id) || false;
  const isGroup = selectedRoom?.isGroup || false;
  const fromMe = message.sender?._id === me._id;
  const bgClass = fromMe ? "bg-green-chat" : "bg-white dark:bg-gray-primary";
  const [open, setOpen] = useState(false);

  const renderMessageContent = () => {
    switch (message.type) {
      case "text":
        return <TextMessage message={message} />;
      case "image":
        return (
          <ImageMessage message={message} handleClick={() => setOpen(true)} />
        );
      case "video":
        return <VideoMessage message={message} />;
      case "document":
        return <DocumentMessage message={message} />;
      default:
        return null;
    }
  };

  if (!fromMe) {
    return (
      <>
        <DateIndicator message={message} previousMessage={previousMessage} />
        <div className="flex gap-1 w-2/3">
          <ChatBubbleAvatar
            isGroup={isGroup}
            isMember={isMember}
            message={message}
          />
          <div
            className={`flex flex-col z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}
          >
            <OtherMessageIndicator />
            {<ChatAvatarActions message={message} me={me} />}
            {renderMessageContent()}
            {open && (
              <ImageDialog
                src={message.message}
                open={open}
                onClose={() => setOpen(false)}
              />
            )}
            <MessageTime time={time} fromMe={fromMe} />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <DateIndicator message={message} previousMessage={previousMessage} />
      <div className="flex gap-1 w-2/3 ml-auto">
        <div
          className={`flex ml-auto z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}
        >
          <SelfMessageIndicator />
          {renderMessageContent()}
          {open && (
            <ImageDialog
              src={message.message}
              open={open}
              onClose={() => setOpen(false)}
            />
          )}
          <MessageTime time={time} fromMe={fromMe} />
        </div>
      </div>
    </>
  );
};
export default ChatBubble;

const OtherMessageIndicator = () => (
  <div className="absolute bg-white dark:bg-gray-primary top-0 -left-[4px] w-3 h-3 rounded-bl-full" />
);

const SelfMessageIndicator = () => (
  <div className="absolute bg-green-chat top-0 -right-[3px] w-3 h-3 rounded-br-full overflow-hidden" />
);

const TextMessage = ({ message }: { message: IMessage }) => {
  const isLink = /^(ftp|http|https):\/\/[^ "]+$/.test(message.message);

  return (
    <div>
      {isLink ? (
        <a
          href={message.message}
          target="_blank"
          rel="noopener noreferrer"
          className={`mr-2 text-sm font-light text-blue-400 underline`}
        >
          {message.message}
        </a>
      ) : (
        <p className={`mr-2 text-sm font-light`}>{message.message}</p>
      )}
    </div>
  );
};
const MessageTime = ({ time, fromMe }: { time: string; fromMe: boolean }) => {
  return (
    <p className="text-[10px] mt-2 self-end flex gap-1 items-center">
      {time} {fromMe && <MessageSeenSvg />}
    </p>
  );
};

const DocumentMessage = ({ message }: { message: IMessage }) => {
  const documentName = message.message.split("/").pop();

  return (
    <div className="flex items-center space-x-4 p-2 rounded-md w-[200px]">
      <FileText className="text-white" size={20} />
      <span className="flex-1 truncate text-sm">{documentName}</span>
      <a
        href={message.message}
        download={documentName}
        className="text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Download size={20} />
      </a>
    </div>
  );
};

const VideoMessage = ({ message }: { message: IMessage }) => {
  return (
    <ReactPlayer
      url={message.message}
      width="200px"
      height="200px"
      controls={true}
      light={true}
    />
  );
};

const ImageMessage = ({
  message,
  handleClick,
}: {
  message: IMessage;
  handleClick: () => void;
}) => {
  return (
    <div className="w-[200px] h-[200px] m-2 relative">
      <Image
        src={message.message}
        fill
        className="cursor-pointer object-cover rounded"
        alt="image"
        onClick={handleClick}
      />
    </div>
  );
};

const ImageDialog = ({
  src,
  onClose,
  open,
}: {
  open: boolean;
  src: string;
  onClose: () => void;
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="min-w-[750px]">
        <DialogDescription className="relative h-[450px] flex justify-center">
          <Image
            src={src}
            fill
            className="rounded-lg object-contain"
            alt="image"
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
