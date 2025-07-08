import { useEffect, useState } from "react";
// import { UserContext } from "../context/UserContext";
import Chat from "../modules/Chat";
import ChatList from "../modules/ChatList";
import { get } from "../../utilities";
import { useOutletContext } from "react-router-dom";
import { socket } from "../../socket-client";

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

const Chatbook = () => {
  // const userId = useContext(UserContext);
  const { userId } = useOutletContext();
  // const userId = true;

  const [activeUsers, setActiveUsers] = useState([]);

  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: [],
  });

  const addMessage = (message) => {
    setActiveChat((prevActiveChat) => {
      return {
        recipient: prevActiveChat.recipient,
        messages: prevActiveChat.messages.concat(message),
      };
    });
  };

  const loadMessageHistory = (recipient) => {
    // console.log(recipient);
    get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
      console.log(messages);
      setActiveChat({
        recipient: recipient,
        messages: messages,
      });
    });
  };

  useEffect(() => {
    document.title = "Chatbook";
    loadMessageHistory(ALL_CHAT);

    socket.on("message", addMessage);
    return () => {
      socket.off("message", addMessage);
    };
  }, []);

  const setActiveUser = (user) => {
    console.log(`setting active user to ${user.name}`);
  };

  if (!userId) {
    return <div>Log in before using Chatbook</div>;
  }

  return (
    <>
      <div className="u-flex u-relative Chatbook-container">
        <div className="Chatbook-userList">
          <ChatList
            setActiveUser={setActiveUser}
            userId={userId}
            users={activeUsers}
            active={activeChat.recipient}
          />
        </div>
        <div className="Chatbook-chatContainer u-relative">
          <Chat data={activeChat} />
        </div>
      </div>
    </>
  );
};

export default Chatbook;
