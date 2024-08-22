import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import Update from "../../components/update/Update.jsx";
import { Dropdown, Menu } from "antd"; // 新增引入

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser, logout } = useContext(AuthContext); // 解构出 logout 方法

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => res.data), // 查询函数
  });

  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest
        .get("/relationships?followedUserId=" + userId)
        .then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationship"]);
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData?.includes(currentUser.id));
  };

  // 创建菜单项
  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>退出登录</Menu.Item>
    </Menu>
  );

  return (
    <div className="profile">
      {isLoading ? (
        "加载中"
      ) : (
        <>
          <div className="images">
            <img src={"/upload/" + data.coverPic} alt="" className="cover" />
            <img
              src={"/upload/" + data.profilePic}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "加载中"
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>更新</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "已关注"
                      : "关注"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                {userId === currentUser.id && ( // 仅在查看当前用户时展示退出按钮
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <MoreVertIcon style={{ cursor: "pointer" }} />
                  </Dropdown>
                )}
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
