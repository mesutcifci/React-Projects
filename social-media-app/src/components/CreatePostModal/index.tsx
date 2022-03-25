import React from "react";
import { Form, Input, Button, Select, Modal } from "antd";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store";

type ModalProps = {
  isVisible: boolean;
};

const CreatePostModal = ({ isVisible }: ModalProps) => {
  const dispatch = useDispatch();

  const hideCreatePostModal = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <Modal
      visible={isVisible}
      centered
      onCancel={hideCreatePostModal}
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
          <Select defaultValue="Zhejiang">
            <Select.Option value="Zhejiang">Zhejiang</Select.Option>
            <Select.Option value="Jiangsu">Jiangsu</Select.Option>
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
