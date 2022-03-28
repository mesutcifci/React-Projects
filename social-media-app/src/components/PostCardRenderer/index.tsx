import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { Post } from "../../model/post.model";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  posts: Post[];
  flex?: boolean;
}

function PostCardRenderer({ posts, flex }: PostCardProps) {
  const navigate = useNavigate();

  const navigateToUserProfile = (username: string) => {
    !username && navigate("/");
    navigate(`/profile/${username}`);
  };

  return (
    <>
      {posts?.map((post: Post) => (
        <Card
          key={post.id}
          hoverable
          className={`md:w-[400px] !mb-8} !cursor-auto`}
          cover={<img className="max-w-[100%]" src="/images/image1.jpg" />}
          actions={[
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Card.Meta
            avatar={
              <div
                onClick={() => navigateToUserProfile(post.owner)}
                className="cursor-pointer"
              >
                <Avatar size={"large"} src="/images/avatar1.svg" />
              </div>
            }
            title={post.title}
            description={post.body}
          />
        </Card>
      ))}
    </>
  );
}

export default PostCardRenderer;
