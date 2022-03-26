import {
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

const PostCard = () => {
  return (
    <Card
      hoverable
      className="w-[400px]"
      cover={<img className="max-w-[100%]" src="./image1.jpg" />}
      actions={[
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src="./avatar1.svg" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};

export default PostCard;
