import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.jsx";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>亲疏有度，远近相安</h1>
          <p>
            "在社交中，最重要的不是你说了什么，而是你让别人感受到了什么。与人交往的过程中，善于用心感受对方的情绪，并以温暖和体贴的方式回应，这样才能在心与心之间建立起真正的连接。"
          </p>
          <span>您还没有账户?</span>
          <Link to="/register">
            <button>注册</button>
          </Link>
        </div>
        <div className="right">
          <h1>登录</h1>
          <form>
            <input
              type="text"
              placeholder="用户名"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="密码"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>登录 </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
