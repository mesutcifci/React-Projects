import React from "react";
import "./styles.css";
import { Layout, Menu, Anchor, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const Navigation = () => {
  return (
    <Layout>
      <Layout.Header className="flex justify-between items-center">
        <Anchor>
          <Anchor.Link
            title="MESSLIFE"
            href="/"
            className="navigation-header__link cursor-pointer"
          />
        </Anchor>
        <Menu mode="horizontal" theme="dark" className="flex items-center">
          <Menu.Item key="1">
            <Button shape="circle" icon={<PlusCircleOutlined />}/>
          </Menu.Item>
          <Menu.Item key="2">Home</Menu.Item>
          <Menu.Item key="3">Profile</Menu.Item>
        </Menu>
      </Layout.Header>
    </Layout>
  );
};

export default Navigation;
