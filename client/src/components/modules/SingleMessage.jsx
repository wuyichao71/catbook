import { useOutletContext } from "react-router-dom";
import "./SingleMessage.css";

const SingleMessage = (props) => {
  const { userId } = useOutletContext();
  return (
    <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      {userId === props.message.sender._id ? (
        <>
          <span className="SingleMessage-content u-itemRight">{props.message.content}</span>
          <span className="SingleMessage-sender u-bold u-textRight">
            {":" + props.message.sender.name}
          </span>
        </>
      ) : (
        <>
          <span className="SingleMessage-sender u-bold">{props.message.sender.name + ":"}</span>
          <span className="SingleMessage-content">{props.message.content}</span>
        </>
      )}
    </div>
  );
};

export default SingleMessage;
