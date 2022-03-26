import { useDeletePostMutation, useGetPostsQuery } from "../../services/api";
import Layout, { Content } from "antd/lib/layout/layout";
import PostCard from "../../components/PostCard";
import { Spin } from "antd";

const Home = () => {
  const { data: posts, isLoading: loadingForPosts } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  if (loadingForPosts) {
    return <Spin size="large" className="!w-max !h-max !absolute top-2/4 left-2/4"/>;
  }

  const deletePostHandler = async (id: string) => {
    await deletePost(id);
  };

  return (
    <Layout className="py-10 flex items-center">
      <Content>
        <PostCard/>
      </Content>
    </Layout>
  );
};

export default Home;
