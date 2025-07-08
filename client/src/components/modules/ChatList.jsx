import SingleUser from "./SingleUser";
const ChatList = (props) => {
  return (
    <>
      <h3>Open Chats</h3>
      {props.users.map((user, i) => {
        <SingleUser
          key={i}
          setActiveUser={props.setActiveUser}
          user={user}
          active={user === props.active}
        />;
      })}
    </>
  );
};

export default ChatList;
