import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom"; // 导入 useNavigate 钩子
import { message } from "antd";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate(); // 初始化 useNavigate

  const queryClient = useQueryClient();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      message.error("文件上传失败，请检查网络连接或稍后重试。");
      console.log(err);
    }
  };

  const mutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login"); // 未登录时导航到登录页面
      return;
    }
    if (!desc.trim()) {
      message.warning("内容不能为空！");
      return;
    }
    let imgURL = "";
    if (file) imgURL = await upload();
    mutation.mutate({ desc, img: imgURL });
    // 清除文件和输入
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {currentUser && ( // 确保 currentUser 存在时才渲染头像
              <img src={"/upload/" + currentUser.profilePic} alt="" />
            )}
            <input
              type="text"
              placeholder={
                currentUser
                  ? `你想写点什么 ${currentUser.name}?`
                  : "请先登录后再发布内容！"
              }
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              disabled={!currentUser} // 未登录时禁用输入框
              style={{ fontSize: currentUser ? "initial" : "20px" }} // 根据登录状态调整字体大小
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              disabled={!currentUser} // 未登录时禁用上传文件
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>添加图片</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>添加地点</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>标记好友</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick} disabled={!currentUser}>
              分享
            </button>{" "}
            {/* 未登录时禁用分享按钮 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
