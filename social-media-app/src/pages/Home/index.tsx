import React, { useEffect } from "react";
import { usePostsQuery, useUsersQuery } from "../../services/api";

const Home = () => {
  const { data, isLoading, isFetching, error } = useUsersQuery();
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isFetching: isPostsFetch,
    error: errorForPosts,
  } = usePostsQuery();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (postsData) {
      console.log(postsData);
    }
  }, [data, postsData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <div>a</div>;
};

export default Home;
