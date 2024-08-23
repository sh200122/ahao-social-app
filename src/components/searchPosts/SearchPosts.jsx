import Post from "../post/Post"; // 导入 Post 组件
import "./searchPosts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const SearchPosts = ({ searchQuery }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", searchQuery],
    queryFn: () =>
      makeRequest
        .get(`/posts/search?keyword=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.data),
  });

  if (isLoading) {
    return <p>加载中...</p>;
  }

  if (error) {
    return <p>发生错误: {error.message}</p>;
  }

  return (
    <div className="posts">
      {data && data.length > 0 ? (
        data.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <p>暂无相关内容</p>
      )}
    </div>
  );
};

export default SearchPosts;
