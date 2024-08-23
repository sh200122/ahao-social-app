import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { Dropdown, Menu } from "antd";
import { DeleteOutlined, CloseOutlined } from "@mui/icons-material";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    setSearchInput("");
  }, [location.pathname]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchHistoryClick = (item) => {
    setSearchInput(item);
    handleSearchSubmit(item); // 调用搜索提交方法
  };

  const handleSearchSubmit = (searchTerm) => {
    const searchValue = searchTerm || searchInput;
    if (searchValue.trim()) {
      const newHistory = [
        searchValue,
        ...searchHistory.filter((item) => item !== searchValue),
      ];
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      window.location.href = `/search?search=${encodeURIComponent(
        searchValue
      )}`;
    }
  };

  // 定义 handleClearHistory 函数
  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const handleDeleteSingleHistory = (item) => {
    const updatedHistory = searchHistory.filter((history) => history !== item);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const menu = (
    <Menu style={{ marginTop: "5px" }}>
      {searchHistory.length > 0 ? (
        <>
          {searchHistory.map((item, index) => (
            <Menu.Item
              key={index}
              onClick={() => handleSearchHistoryClick(item)}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{item}</span>
                <CloseOutlined
                  style={{ marginBottom: "-7px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSingleHistory(item);
                  }}
                />
              </div>
            </Menu.Item>
          ))}
          <Menu.Divider />
          <Menu.Item onClick={handleClearHistory}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>清空搜索历史</span>
              <DeleteOutlined style={{ marginBottom: "-7px" }} />
            </div>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item disabled>暂无搜索历史</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="left">
        <img
          src={darkMode ? "/images/logo-w.png" : "/images/logo-b.png"}
          alt="logo"
        />
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <HomeOutlinedIcon />
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
      </div>
      <div className="search">
        <Dropdown overlay={menu} trigger={["click"]}>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <SearchOutlinedIcon onClick={handleSearchSubmit} />
            <input
              type="text"
              placeholder="查找..."
              value={searchInput}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            />
          </div>
        </Dropdown>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          {currentUser && (
            <img src={"/upload/" + currentUser.profilePic} alt="Profile" />
          )}
          <span>{currentUser ? currentUser.name : "游客"}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
