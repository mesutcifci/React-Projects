import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useDeletePostMutation, useGetPostsQuery } from "../../services/api";
import { postsActions, RootState } from "../../store";

import PostCardRenderer from "../../components/PostCardRenderer";
import { Spin, Layout } from "antd";

const Home = () => {
  const dispatch = useDispatch();
  const { data: postsQueryResult, isLoading: loadingForPosts } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const posts = useSelector<RootState, any>((state) => state.postsSlice.posts);

  useEffect(() => {
    if (!loadingForPosts) {
      dispatch(postsActions.setPosts(postsQueryResult));
    }
  }, [postsQueryResult]);

  if (loadingForPosts) {
    return (
      <Spin size="large" className="!w-max !h-max !absolute top-2/4 left-2/4" />
    );
  }

  const deletePostHandler = async (id: string) => {
    await deletePost(id);
  };

  return (
    <Layout className="py-10 flex items-center !shrink-0">
      <Layout.Content className="grid gap-6 items-center">
        <PostCardRenderer posts={ posts || []} />
      </Layout.Content>
    </Layout>
  );
};

export default Home;
