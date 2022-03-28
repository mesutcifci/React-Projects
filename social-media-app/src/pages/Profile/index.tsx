import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserQuery,
  useGetPostsByUsernameQuery,
} from "../../services/api";
import { RootState, usersActions, postsActions } from "../../store";

import PostCardRenderer from "../../components/PostCardRenderer";

import { Layout, Spin } from "antd";
import "./styles.css";

const Profile = () => {
  const username = useLocation()?.pathname?.split("/")[2] || "";
  const dispatch = useDispatch();

  const { data: userQueryResult, isLoading: loadingForUser } =
    useGetUserQuery(username);
  const { data: postsQueryResult, isLoading: loadingForPosts } =
    useGetPostsByUsernameQuery(username);

  const user = useSelector<RootState, any>((state) => state.usersSlice.user);
  const posts = useSelector<RootState, any>((state) => state.postsSlice.posts);

  useEffect(() => {
    if (!loadingForUser) {
      dispatch(usersActions.setUser(userQueryResult));
    }

    if (!loadingForPosts) {
      dispatch(postsActions.setPosts(postsQueryResult));
    }
  }, [userQueryResult, postsQueryResult]);


  if (loadingForUser || loadingForPosts) {
    return (
      <Spin size="large" className="!w-max !h-max !absolute top-2/4 left-2/4" />
    );
  }

  return (
    <Layout className="!grow-[20] !shrink-0 p-8">
      <div className="flex items-center mb-8 justify-center">
        <img
          src="/images/avatar1.svg"
          alt="avatar"
          className="!w-[100px] rounded-full !border-solid !border-2 !border-[#001529]"
        />

        <div className="ml-5">
          <h2 className="m-0">{user?.fullName}</h2>
          <address className="m-0">
            <a href="mailto:webmaster@example.com">{user.email}</a>
            <p className="m-0">{user.city}</p>
          </address>
        </div>
      </div>

      <Layout.Content className="profile__card-wrapper">
        <PostCardRenderer posts={posts || []} flex={true} />
      </Layout.Content>
    </Layout>
  );
};

export default Profile;
