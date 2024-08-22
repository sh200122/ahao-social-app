import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Ahao Social.</h1>
          <p>
            "社交礼仪并不是表面上的形式，而是内在素养的外在表现。一个懂得尊重他人时间、空间和感受的人，往往能够在不经意间展现出自己的魅力，从而在各种社交场合中脱颖而出。"
          </p>
          <span>已经有账户?</span>
          <Link to="/login">
            <button>登录</button>
          </Link>
        </div>
        <div className="left">
          <h1>注册</h1>
          <form>
            <input
              type="text"
              placeholder="用户名"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="邮箱"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="密码"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="姓名"
              name="name"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>注册</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
