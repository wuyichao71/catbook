import { useContext } from "react";
import { UserContext } from "../modules/CreateContext";

const Chatbook = () => {
  const userId = useContext(UserContext);

  return <>{userId ? <p>Hello, world</p> : <div>Log in before using Chatbook</div>}</>;
};

export default Chatbook;
