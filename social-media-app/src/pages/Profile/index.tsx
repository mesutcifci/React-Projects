import { Layout, Row, Col, Spin, Image } from "antd";
import PostCardRenderer from "../../components/PostCardRenderer";
import { useGetPostsQuery } from "../../services/api";
import "./styles.css";

const Profile = () => {
  const { data: posts, isLoading: loadingForPosts } = useGetPostsQuery();

  if (loadingForPosts) {
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
          <h2 className="m-0">Mesut Çifci</h2>
          <address className="m-0">
            <a href="mailto:webmaster@example.com">webmaster@example.com</a>
            <p className="m-0">Ankara</p>
          </address>
        </div>
      </div>

      <Layout.Content className="profile__card-wrapper">
        <PostCardRenderer posts={posts || []} flex={true}/>
      </Layout.Content>
    </Layout>
  );
};

export default Profile;
