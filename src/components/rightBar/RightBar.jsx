import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>建议</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:3000/upload/1723638560668wonder.webp"
                alt=""
              />
              <span>石七</span>
            </div>
            <div className="buttons">
              <button style={{ borderRadius: "4px" }}>关注</button>
              <button style={{ borderRadius: "4px" }}>取消</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:3000/upload/1723709410976sos.webp"
                alt=""
              />
              <span>陈八</span>
            </div>
            <div className="buttons">
              <button style={{ borderRadius: "4px" }}>关注</button>
              <button style={{ borderRadius: "4px" }}>取消</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>最新活动</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:3000/upload/1723620036731afterhours.webp"
                alt=""
              />
              <p>
                <span>阿浩</span> 更改了封面图片
              </p>
            </div>
            <span>一分钟前</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:3000/upload/1723640318403one%20more%20light.webp"
                alt=""
              />
              <p>
                <span>赵六</span> 发布了新内容
              </p>
            </div>
            <span>一小时前</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:3000/upload/1723620407481more%20life.webp"
                alt=""
              />
              <p>
                <span>李四</span> 发布了新内容
              </p>
            </div>
            <span>三小时前</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:3000/upload/1723638592389memories.webp"
                alt=""
              />
              <p>
                <span>王五</span> 修改了封面
              </p>
            </div>
            <span>四小时前</span>
          </div>
        </div>
        <div className="item">
          <span>在线朋友</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:3000/upload/1723620338064justice.webp"
                alt=""
              />
              <div className="online" />
              <span>张三</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:3000/upload/1723640318403one%20more%20light.webp"
                alt=""
              />
              <div className="online" />
              <span>赵六</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:3000/upload/1723620407481more%20life.webp"
                alt=""
              />
              <div className="online" />
              <span>李四</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:3000/upload/1723638592389memories.webp"
                alt=""
              />
              <div className="online" />
              <span>王五</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
