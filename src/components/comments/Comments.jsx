import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["comments"],
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if (!desc.trim()) {
      message.warning("内容不能为空！");
      return;
    }
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        {currentUser && ( // 确保 currentUser 存在时才渲染用户头像
          <img src={"/upload/" + currentUser.profilePic} alt="Profile" />
        )}
        <input
          type="text"
          placeholder="输入一条评论"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>发送</button>
      </div>

      {isLoading
        ? "加载中..."
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              {currentUser && ( // 确保 currentUser 存在时才渲染用户头像
                <img src={"/upload/" + currentUser.profilePic} alt="Profile" />
              )}
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
