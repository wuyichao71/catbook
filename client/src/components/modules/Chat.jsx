import "./Chat.css";
import { NewMessage } from "./NewPostInput";
import SingleMessage from "./SingleMessage";

const Chat = (props) => {
  return (
    <div>
      <h3>Chatting with {props.data.recipient.name}</h3>
      {props.data.messages.map((m, i) => (
        <SingleMessage message={m} key={i} />
      ))}
      <NewMessage recepient={props.data.recepient} />
    </div>
  );
};

export default Chat;
