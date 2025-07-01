import { NewMessage } from "./NewPostInput";
import SingleMessage from "./SingleMessage";

import "./Chat.css";

const Chat = (props) => {
  return (
    <div className="u-flexColumn Chat-container">
      <h3>Chatting with {props.data.recipient.name}</h3>
      <div className="Chat-historyContainer">
        {props.data.messages.map((m, i) => (
          <SingleMessage message={m} key={i} />
        ))}
      </div>
      <div className="Chat-newContainer">
        <NewMessage recepient={props.data.recipient} />
      </div>
    </div>
  );
};

export default Chat;
