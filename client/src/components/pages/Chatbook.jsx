import { useContext } from "react";
import { UserContext } from "../modules/CreateContext";
import { NewMessage } from "../modules/NewPostInput";

const Chatbook = () => {
  const userId = useContext(UserContext);

  return <>{userId ? <NewMessage /> : <div>Log in before using Chatbook</div>}</>;
};

export default Chatbook;
