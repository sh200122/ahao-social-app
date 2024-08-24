import Post from "../post/Post"; // 导入 Post 组件
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => res.data),
  });

  // Ensure data is an array
  const postsData = Array.isArray(data) ? data : [];

  if (isLoading) {
    return <p>加载中...</p>;
  }

  if (error) {
    return <p>发生错误: {error.message}</p>;
  }

  return (
    <div className="posts">
      {postsData.length > 0 ? (
        postsData.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <p>暂无帖子</p>
      )}
    </div>
  );
};

export default Posts;
