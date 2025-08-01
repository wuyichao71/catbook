import { useRef } from "react";
import { NewMessage } from "./NewPostInput";
import SingleMessage from "./SingleMessage";
import { post } from "../../utilities";

import "./Chat.css";
import { useEffect } from "react";

/**
 * @typedef UserObject
 * @property {string} _id
 * @property {string} name
 */
/**
 * @typedef MessageObject
 * @property {UserObject} sender
 * @property {string} content
 */
/**
 * @typedef ChatData
 * @property {MessageObject[]} messages
 * @property {UserObject} recipient
 */

/**
 * Renders main chat window including previous messages,
 * who is being chatted with, and the new message input.
 *
 * Proptypes
 * @param {ChatData} data
 */
const Chat = (props) => {
  const scrollRef = useRef(null);

  const addNewMessage = (value) => {
    // console.log(value);
    post("/api/message", value);
  };

  // const scrollToBottom = () => {
  //   const historyContainer = document.querySelector(".Chat-historyContainer");
  //   if (historyContainer) {
  //     historyContainer.scrollTop = historyContainer.scrollHeight;
  //   }
  // };

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [props.data.messages]);

  return (
    <div className="u-flexColumn Chat-container">
      <h3>Chatting with {props.data.recipient.name}</h3>
      <div ref={scrollRef} className="Chat-historyContainer">
        {props.data.messages.map((m, i) => (
          <SingleMessage message={m} key={i} />
        ))}
      </div>
      <div className="Chat-newContainer">
        <NewMessage recipient={props.data.recipient} addNewMessage={addNewMessage} />
      </div>
    </div>
  );
};

export default Chat;
