import {
  UploadOutlined,
  UserSwitchOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Divider } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import SignInPage from "./signinPage";
import DeviceTable from "./deviceTable";
import History from "./history";
import Partner from "./partner";
import PartnerCard from "./partnerCard";
import DeviceCard from "./deviceCard";
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
          <Link to="/history"> История</Link>
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
            {!sessionStorage.getItem("isLogin") ? (
              <Link to="/login">
                <UserSwitchOutlined style={{ color: "orange" }} /> Войти
              </Link>
            ) : (
              <>
                <Avatar
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {sessionStorage.getItem("login") &&
                    sessionStorage.getItem("login")[0]}
                </Avatar>
                <span> </span>
                <b>{sessionStorage.getItem("login")}</b>
                <span> | </span>
                <a
                  onClick={() => {
                    sessionStorage.clear();
                    window.location = "/login";
                  }}
                >
                  Выйти
                </a>
              </>
            )}
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
          {props.page === "history" ? <History /> : null}
          {props.page === "partner" ? <Partner /> : null}
          {props.page === "partnercard" ? <PartnerCard /> : null}
          {props.page === "devicecard" ? <DeviceCard /> : null}
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
