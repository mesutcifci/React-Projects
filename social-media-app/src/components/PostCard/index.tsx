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
      cover={<img className="max-w-[100%]" src="https://picsum.photos/id/0/300/200" />}
      actions={[
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};

export default PostCard;
