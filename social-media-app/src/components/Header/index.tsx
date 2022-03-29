import "./styles.css";
import { Layout, Menu, Anchor, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store";

const Navigation = () => {
  const dispatch = useDispatch();

  const showCreatePostModal = () => {
    dispatch(modalActions.showModal({key: "createPostModal"}));
  };

  return (
    <Layout className="!shrink-0">
      <Layout.Header className="flex justify-between items-center">
        <Anchor>
          <Anchor.Link
            title="MESSLIFE"
            href="/"
            className="navigation__link cursor-pointer"
          />
        </Anchor>
        <Menu mode="horizontal" theme="dark" className="flex items-center">
          <Menu.Item key="1" onClick={showCreatePostModal}>
            <Button
              shape="circle"
              icon={<PlusCircleOutlined className="navigation__plus-icon" />}
            />
          </Menu.Item>
          <Menu.Item key="2">Home</Menu.Item>
          <Menu.Item key="3">Profile</Menu.Item>
        </Menu>
      </Layout.Header>
    </Layout>
  );
};

export default Navigation;
