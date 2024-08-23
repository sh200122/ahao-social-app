import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import React from "react";
import { Alert } from "antd";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false); // 控制提示框的显示
  const [alertMessage, setAlertMessage] = useState(""); // 控制提示框的信息

  const { currentUser } = useContext(AuthContext);

  // 获取帖子的点赞数据
  const { isLoading: isLikesLoading, data: likesData } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => res.data),
  });

  // 获取帖子的评论数据
  const { isLoading: isCommentsLoading, data: commentsData } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + post.id).then((res) => res.data),
  });

  const queryClient = useQueryClient();

  // 点赞或取消点赞的请求
  const likeMutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id]);
    },
  });

  // 删除帖子的请求
  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // 处理点赞的点击事件
  const handleLike = () => {
    if (currentUser) {
      likeMutation.mutate(likesData?.includes(currentUser.id));
    } else {
      setAlertMessage("请先登录再进行点赞操作！");
      setAlertVisible(true);
    }
  };

  // 处理删除帖子的点击事件
  const handleDelete = () => {
    if (currentUser?.id === post.userId) {
      deleteMutation.mutate(post.id);
    } else if (!currentUser) {
      setAlertMessage("请先登录再删除此帖子！");
      setAlertVisible(true);
    } else {
      alert("你没有权限删除此帖子！");
    }
  };

  // 处理评论的点击事件
  const handleCommentClick = () => {
    if (currentUser) {
      setCommentOpen(!commentOpen);
    } else {
      setAlertMessage("请先登录再进行评论！");
      setAlertVisible(true);
    }
  };

  // 处理分享的点击事件
  const handleShareClick = () => {
    if (!currentUser) {
      setAlertMessage("请先登录再进行分享！");
      setAlertVisible(true);
    } else {
      setAlertMessage("分享功能待实现！");
      setAlertVisible(true);
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {currentUser && (
            <MoreHorizIcon
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            />
          )}
          {menuOpen && currentUser?.id === post.userId && (
            <button onClick={handleDelete} style={{ borderRadius: "4px" }}>
              删除
            </button>
          )}
        </div>

        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={"/upload/" + post.img} alt="" />}
        </div>

        <div className="info">
          <div className="item">
            {isLikesLoading ? (
              "加载中"
            ) : currentUser ? (
              likesData?.includes(currentUser.id) ? (
                <FavoriteOutlinedIcon
                  style={{ color: "red" }}
                  onClick={handleLike}
                />
              ) : (
                <FavoriteBorderOutlinedIcon onClick={handleLike} />
              )
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {likesData?.length} 喜欢
          </div>
          <div className="item" onClick={handleCommentClick}>
            <TextsmsOutlinedIcon />
            {isCommentsLoading ? "加载中" : commentsData?.length} 评论
          </div>
          <div className="item" onClick={handleShareClick}>
            <ShareOutlinedIcon />
            分享
          </div>
        </div>

        {commentOpen && <Comments postId={post.id} />}

        {/* 提示框，当用户未登录时显示 */}
        {alertVisible && (
          <Alert
            message={alertMessage}
            type="warning"
            showIcon
            closable
            onClose={() => setAlertVisible(false)} // 提示框关闭时设置为不可见
          />
        )}
      </div>
    </div>
  );
};

export default Post;
