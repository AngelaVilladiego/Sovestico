import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import ChatMessage from "../chat-message/chat-message";
import "./chat.css";

function Chat({ className }) {
  const chatBox = useRef(null);

  const onSendMessage = () => {
    if (chatBox.current) {
      console.log(chatBox.current.value);
    }
  };

  return (
    <div className={`${className} flex flex-col`}>
      <div className="h-full w-full relative">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="scrollable-messages px-8  flex flex-col-reverse pt-6 gap-8 h-full overflow-y-auto">
            <ChatMessage type="received" content="Sit amet fit quertur." />
            <ChatMessage type="received" />
            <ChatMessage type="sent" content="Lorem ipsum dolor sit amet?" />
            <ChatMessage type="received" content="Sit amet fit quertur." />
          </div>
        </div>
      </div>
      <div className="send-message-container py-3 w-full px-5">
        <div className="h-10 px-5 rounded-full text-sm focus:outline-none relative bg-slate-100">
          <input
            ref={chatBox}
            className="w-full h-full focus:outline-none font-body bg-slate-100"
            type="search"
            name="search"
            placeholder="Search by name or symbol"
          />

          <button
            onClick={onSendMessage}
            className="absolute right-0 top-1/2 -translate-y-1/2 mr-4"
          >
            <PaperAirplaneIcon className="text-violet-600 w-8 aspect-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
