import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { NewMessage } from "../modules/NewPostInput";
import Chat from "../modules/Chat";
import { get } from "../../utilities";

import "./Chatbook.css";

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

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

const TEST_MESSAGES = [
  {
    sender: {
      _id: 0,
      name: "Abby",
    },
    content: "tell me why",
  },
  {
    sender: {
      _id: 0,
      name: "Abby",
    },
    content: "aint nothin but a heartache",
  },
  {
    sender: {
      _id: 0,
      name: "Abby",
    },
    content: "tElL mE whYyY",
  },
];

const Chatbook = () => {
  const userId = useContext(UserContext);
  // const userId = true;
  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: TEST_MESSAGES,
  });

  const loadMessageHistory = (recipient) => {
    // console.log(recipient);
    get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
      // console.log(messages);
      setActiveChat({
        recipient: recipient,
        messages: messages,
      });
    });
  };

  useEffect(() => {
    document.title = "Chatbook";
    loadMessageHistory(ALL_CHAT);
  }, []);

  // if (!userId) {
  //   return <div>Log in before using Chatbook</div>;
  // }

  return (
    <>
      <div className="u-flex u-relative Chatbook-container">
        <div className="Chatbook-chatContainer u-relative">
          <Chat data={activeChat} />
        </div>
      </div>
    </>
  );
};

export default Chatbook;
