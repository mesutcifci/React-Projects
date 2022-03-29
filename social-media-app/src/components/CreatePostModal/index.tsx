import React, { useEffect } from "react";
import { Form, Input, Button, Select, Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  modalActions,
  RootState,
  usersActions,
  postsActions,
} from "../../store";
import { User } from "../../model/user.model";
import { useGetUsersQuery, useCreatePostMutation } from "../../services/api";

type ModalProps = {
  isVisible: boolean;
};

const CreatePostModal = (props: ModalProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const users = useSelector<RootState, any>((state) => state.usersSlice.users);

  const { data: usersQueryResult, isLoading: loadingForUsers } =
    useGetUsersQuery();
  const [createPost] = useCreatePostMutation();

  useEffect(() => {
    if (!loadingForUsers) {
      dispatch(usersActions.setUsers(usersQueryResult));
    }
  }, [loadingForUsers]);

  const hideModal = () => {
    dispatch(modalActions.hideModal("createPostModal"));
  };

  const renderUsers = () => {
    return users?.map((user: User) => (
      <Select.Option key={user.id} value={user.username}>
        {user.username}
      </Select.Option>
    ));
  };

  const handleSubmit = async () => {
    const now = new Date().toISOString();
    const post = {
      ...form.getFieldsValue(),
      createdAt: now,
      updatedAt: now,
    };
    const addedPost = await createPost(post);
    if("data" in addedPost) {
      dispatch(postsActions.setPosts([addedPost.data]));
    }
    hideModal();
  };

  return (
    <Modal
      visible={props.isVisible}
      centered
      onCancel={hideModal}
      footer={null}
    >
      <Form
        name="addUser"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Owner"
          name="owner"
          rules={[
            {
              required: true,
              message: "Please select username of post owner!",
            },
          ]}
          className="!mt-6"
        >
          <Select
            defaultValue="Select user"
            notFoundContent={loadingForUsers ? <Spin size="small" /> : null}
          >
            {renderUsers()}
          </Select>
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
          className="!mt-6"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: "Please input body!" }]}
          className="!mt-6"
        >
          <Input.TextArea showCount maxLength={200} rows={4} />
        </Form.Item>
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          form="addUser"
          className="!ml-auto  mt-10 !block"
        >
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
