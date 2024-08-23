import SearchPosts from "../../components/searchPosts/SearchPosts";
import "./search.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Search = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("search") || ""); // 获取搜索关键词
  }, [location.search]);

  return (
    <div className="search">
      <SearchPosts searchQuery={searchQuery} />{" "}
      {/* 传递搜索关键词给 Posts 组件 */}
    </div>
  );
};

export default Search;
