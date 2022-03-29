import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { Post } from "../../model/post.model";
import { useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "../../services/api";
import { useDispatch } from "react-redux";
import { postsActions } from "../../store";
interface PostCardProps {
  posts: Post[];
  flex?: boolean;
}

function PostCardRenderer({ posts, flex }: PostCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletePost] = useDeletePostMutation();

  const navigateToUserProfile = (username: string) => {
    !username && navigate("/");
    navigate(`/profile/${username}`);
  };

  const deletePostHandler = async (id: string) => {
    await deletePost(id);
    dispatch(postsActions.removePost(id));
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
            <DeleteOutlined
              key={"delete"}
              onClick={() => deletePostHandler(post.id)}
            />,
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
