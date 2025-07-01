import "./SingleMessage.css";

const SingleMessage = (props) => {
  return (
    <div className={"u-flex"}>
      <span className="">{props.message.sender.name + ":"}</span>
      <span className="">{props.message.content}</span>
    </div>
  );
};

export default SingleMessage;
