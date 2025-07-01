import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { NewMessage } from "../modules/NewPostInput";
import Chat from "../modules/Chat";

import "./Chatbook.css";

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

  const userId = useContext(UserContext);

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  if (!userId) {
    return <div>Log in before using Chatbook</div>;
  }

  return (
    <>
      <Chat
        data={{
          recipient: ALL_CHAT,
          messages: TEST_MESSAGES,
        }}
      />
    </>
  );
};

export default Chatbook;
