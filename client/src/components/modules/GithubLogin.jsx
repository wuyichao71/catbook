import { jumpLink } from "../../utilities";
import "./GithubLogin.css";

const GithubLogin = () => {
  return (
    <a href={jumpLink("/api/auth/github")}>
      <button className="GithubLogin-login">
        使用 GitHub 登录
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub logo"
          style={{ width: "24px", height: "24px", verticalAlign: "middle", marginLeft: "24px" }}
          // style="width:20px; height:20px; vertical-align:middle; margin-right:8px;"
        ></img>
      </button>
    </a>
  );
};

export default GithubLogin;
