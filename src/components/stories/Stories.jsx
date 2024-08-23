import "./stories.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import "moment/locale/zh-cn";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

moment.updateLocale("zh-cn", {
  relativeTime: {
    future: "%s内",
    past: "%s前",
    s: "几秒",
    ss: "%d秒",
    m: "1分钟",
    mm: "%d分钟",
    h: "1小时",
    hh: "%d小时",
    d: "1天",
    dd: "%d天",
    M: "1个月",
    MM: "%d个月",
    y: "1年",
    yy: "%d年",
  },
});

const Stories = () => {
  const { currentUser } = useContext(AuthContext); // 获取当前用户的认证状态

  // 如果用户未登录，直接返回 null，不渲染该组件
  if (!currentUser) {
    return null;
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () =>
      makeRequest.get("/stories").then((res) => {
        return res.data;
      }),
  });

  if (!data || data.length === 0 || isLoading || error) {
    return null;
  }

  return (
    <div className="stories">
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        freeMode={true}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
        }}
        modules={[FreeMode, Autoplay]}
        className="mySwiper"
      >
        {data.map((story) => (
          <SwiperSlide key={story.id}>
            <Link
              to={`/profile/${story.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="story">
                <img src={"/upload/" + story.img} alt="" />
                <div className="story-details">
                  <img
                    className="avatar"
                    src={"/upload/" + story.profilePic}
                    alt=""
                  />
                  <div>
                    <span className="name">{story.name}</span>
                    <span className="date">
                      {moment(story.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Stories;
