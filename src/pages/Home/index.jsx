import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, theme, Popconfirm } from "antd";
import {
  LogoutOutlined,
  LineChartOutlined,
  PieChartOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import { rmStorage } from "@/utils/index";
import { clearUserInfo, clearUserToken } from "@/store/modules/user";
import "./index.css";

const Home = () => {
  const { Header, Content, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("每日天气预报", "/", <LineChartOutlined />),
    getItem("实时空气质量", "/airquality", <RadarChartOutlined />),
    getItem("空气质量预报", "/qualityforecast", <PieChartOutlined />),
  ];
  // 获取当前 Url 路径 解决手动输入 Url 菜单未更新问题
  const location = useLocation();
  const { pathname } = location;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  // 点击路由进行跳转
  const getMenu = ({ key }) => {
    navigate(key);
  };
  // 获取当前用户名
  const { UserInfo } = useSelector((state) => state.userReducer);

  // 用户退出
  const dispatch = useDispatch();
  const onConfirm = () => {
    // 清空 localStorate
    rmStorage("userToken");
    // 清空 redux 中的信息
    dispatch(clearUserInfo());
    dispatch(clearUserToken());
    // 跳转到 login
    navigate("/login");
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* 导航 */}
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{UserInfo.userName}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>

      <Layout>
        {/* 侧边栏 */}
        <Sider
          width={185}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
            onClick={getMenu}
            selectedKeys={pathname}
          />
        </Sider>

        {/* 内容 */}
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              margin: 24,
              padding: 10,
              minHeight: 650,
              background: colorBgContainer,
            }}
          >
            {/* 二级路由 */}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
