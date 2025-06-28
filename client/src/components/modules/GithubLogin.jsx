import { jumpLink } from "../../utilities";
import "./GithubLogin.css";

const GithubLogin = () => {
  return (
    <a href={jumpLink("/api/auth/github")}>
      <button className="GithubLogin-login">使用 GitHub 登录</button>
    </a>
  );
};

export default GithubLogin;
