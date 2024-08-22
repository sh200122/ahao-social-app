import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => res.data),
  });

  return (
    <div className="posts">
      {error ? (
        <div>
          发生了一些错误！请<Link to="/login">重新登录</Link>
        </div>
      ) : isLoading ? (
        "加载中... "
      ) : (
        data.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;
