import React, { useEffect } from "react";
import { Form, Input, Button, Select, Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalActions, RootState, usersActions } from "../../store";
import { User } from "../../model/user.model";
import { useGetUsersQuery } from "../../services/api";

type ModalProps = {
  isVisible: boolean;
};

const CreatePostModal = ({ isVisible }: ModalProps) => {
  const dispatch = useDispatch();
  const { data: usersQueryResult, isLoading: loadingForUsers } =
    useGetUsersQuery();
  const users = useSelector<RootState, any>((state) => state.usersSlice.users);

  useEffect(() => {
    if (!loadingForUsers) {
      dispatch(usersActions.setUsers(usersQueryResult));
    }
  }, [loadingForUsers]);

  const hideModal = () => {
    dispatch(modalActions.hideModal());
  };

  const renderUsers = () => {
    return users?.map((user: User) => (
      <Select.Option key={user.id} value={user.username}>
        {user.username}
      </Select.Option>
    ));
  };

  return (
    <Modal
      visible={isVisible}
      centered
      onCancel={hideModal}
      footer={[
        <Button key="submit" type="primary">
          Submit
        </Button>,
      ]}
    >
      <Form name="addUser" labelCol={{ span: 5 }} wrapperCol={{ span: 20 }}>
        <Form.Item
          label="Owner"
          name="owner"
          rules={[
            { required: true, message: "Please input username of owner!" },
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
          name="bıdy"
          rules={[{ required: true, message: "Please input body!" }]}
          className="!mt-6"
        >
          <Input.TextArea showCount maxLength={200} rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
