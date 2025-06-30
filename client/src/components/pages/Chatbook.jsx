const { useContext } = require("react");
const { UserContext } = require("../modules/CreateContext");

const Chatbook = () => {
  const userId = useContext(UserContext);

  return <>{userId ? <p>Hello, world</p> : <div>Log in before using Chatbook</div>}</>;
};
