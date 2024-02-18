import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useRef, useState } from "react";
import ChatMessage from "../chat-message/chat-message";
import "./chat.css";
import { QueryTico } from "../../services/endpoints";
import { QueryContext } from "../../utilities/query-context";
import { Typing } from "../typing-indicator/typing-indicator";

function Chat({ className }) {
  const chatBox = useRef(null);
  const [msgState, setMsgState] = useState({ loading: false, messages: [] });
  const { queryContext, setQueryContext } = useContext(QueryContext);

  const onSendMessage = () => {
    if (chatBox.current && chatBox.current.value) {
      const msg = chatBox.current.value;
      chatBox.current.value = "";

      setMsgState({
        ...msgState,
        messages: [{ type: "sent", content: msg }, ...msgState.messages],
      });
    }
  };

  useEffect(() => {
    console.log(msgState);
    if (
      msgState.messages.length > 0 &&
      msgState.messages[0].type == "sent" &&
      !msgState.loading
    ) {
      queryApi(msgState.messages[0].content);
    }
  }, [msgState]);

  const queryApi = (query) => {
    setMsgState({
      ...msgState,
      loading: true,
    });

    QueryTico(queryContext, query).then((data) => {
      setMsgState({
        ...msgState,
        loading: false,
        messages: [{ type: "received", content: data }, ...msgState.messages],
      });
    });
  };

  return (
    <div className={`${className} flex flex-col`}>
      <div className="h-full w-full relative">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="scrollable-messages px-8  flex flex-col-reverse pt-6 gap-8 h-full overflow-y-auto">
            {msgState.messages.map((msg, i) => (
              <ChatMessage key={i} type={msg.type} content={msg.content} />
            ))}
            {msgState.loading ? <Typing /> : null}
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
