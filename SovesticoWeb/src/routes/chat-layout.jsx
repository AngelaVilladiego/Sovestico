import { Outlet } from "react-router-dom";

function ChatLayout() {
  return (
    <div className="w-full grow flex relative">
      <div className="top-0 bottom-0 left-0 absolute w-9/12 bg-white overflow-y-auto">
        <Outlet />
      </div>
      <div className="w-3/12 top-0 bottom-0 right-0 bg-orange-400 absolute">
        <p>chatbot</p>
      </div>
    </div>
  );
}

export default ChatLayout;
