import {
  UploadOutlined,
  UserSwitchOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Space, Divider } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import SignInPage from "./signinPage";
import DeviceTable from "./deviceTable";
import DeviceSearch from "./deviceSearch";
import Partner from "./partner";
import PartnerCard from "./partnerCard";
const { Header, Content, Footer, Sider } = Layout;

const LayoutPage = (props) => (
  <Layout>
    <Sider
      theme="light"
      breakpoint="lg"
      style={{ background: "#f0f2f5" }}
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <p style={{ background: "#f0f2f5" }}>
        <img
          className="img-center"
          alt="logo"
          src="https://simferopol.miranda-media.ru/public/images/logo.png"
          style={{ height: "70px" }}
        />
      </p>

      <Menu
        theme="light"
        mode="inline"
        style={{ background: "#f0f2f5" }}
        defaultSelectedKeys={["0"]}
      >
        <Menu.Item key={0}>
          <Link to="/device/table">Склад</Link>
        </Menu.Item>
        <Menu.Item key={1}>
          <Link to="/device/search"> Поиск оборудования</Link>
        </Menu.Item>
        <Menu.Item key={3}>
          <Link to="/partner">Контакты</Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header
        className="site-layout-sub-header-background"
        style={{
          padding: 0,
          background: "#f0f2f5",
        }}
      >
        <div
          className="img-center"
          style={{
            background: "#f0f2f5",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>
            <b>Группа технического обеспечения</b>
          </span>
          <span style={{ marginRight: "10px" }}>
            <Link to="/login">
              <UserSwitchOutlined style={{ color: "orange" }} /> Войти
            </Link>
          </span>
        </div>
      </Header>
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          {/* отрисовка контента */}
          {props.page === "login" ? <SignInPage /> : null}
          {props.page === "devicetable" ? <DeviceTable /> : null}
          {props.page === "devicesearch" ? <DeviceSearch /> : null}
          {props.page === "partner" ? <Partner /> : null}
          {props.page === "partnercard" ? <PartnerCard /> : null}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        DeviceStorageDB ©2022 Created by <img src="./fmt.png" width={"15pt"} />{" "}
        <span> </span>
        FollowMyTrack group
      </Footer>
    </Layout>
  </Layout>
);

export default LayoutPage;
