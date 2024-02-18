function TitledCard(props) {
  return (
    <div
      className={`${props.className} bg-white rounded-md border-2 mx-auto border-slate-100 aspect-square flex flex-col h-full`}
    >
      <div className="bg-black bg-clip-border rounded-ss-md rounded-se-md text-white text-md font-semibold uppercase text-center">
        {props.title}
      </div>
      <div className="flex justify-center items-center grow">
        {props.children}
      </div>
    </div>
  );
}

export default TitledCard;
