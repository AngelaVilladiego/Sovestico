import { Outlet } from "react-router-dom";
import Chat from "../components/chat/chat";
import "../components/chat/chat.css";

function ChatLayout() {
  return (
    <div className="w-full grow flex relative">
      <div className="thin-scrollbar top-0 bottom-0 left-0 absolute w-9/12 bg-white overflow-y-auto">
        <Outlet />
      </div>
      <Chat className="w-3/12 top-0 bottom-0 right-0 absolute"></Chat>
    </div>
  );
}

export default ChatLayout;
