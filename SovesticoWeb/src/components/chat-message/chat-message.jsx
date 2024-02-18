import "./chat-message.css";

function ChatMessage({ type, content }) {
  const title = type == "received" ? "Tico" : "You";
  const titleStyle =
    type == "received"
      ? "text-violet-300 text-start"
      : "text-slate-600 ml-auto text-end";
  const classNames =
    type == "received"
      ? "bg-slate-100 self-start"
      : "bg-white border-slate-100 border-[1px] self-end";

  const textContent = content
    ? content
    : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt consequuntur, molestiae nulla corrupti animi harum nisi saepe quibusdam, alias veniam similique enim porro! Incidunt dolore, dicta accusamus est ratione cumque.";

  return (
    <div className={`${classNames} rounded-lg p-3 font-body w-fit max-w-[80%]`}>
      <p className={`${titleStyle}`}>{title}</p>
      <p>{textContent}</p>
    </div>
  );
}

export default ChatMessage;
