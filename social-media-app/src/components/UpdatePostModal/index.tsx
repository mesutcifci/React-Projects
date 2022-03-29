import { Form, Input, Button,  Modal } from "antd";
import { useDispatch } from "react-redux";
import {
  modalActions,
  postsActions,
} from "../../store";
import {  useUpdatePostMutation } from "../../services/api";
import { Post } from "../../model/post.model";

type ModalProps = {
  isVisible: boolean;
  previewedPostData: Post;
};

const UpdatePostModal = ({isVisible, previewedPostData}: ModalProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [updatePost] = useUpdatePostMutation();

  const hideModal = () => {
    dispatch(modalActions.hideModal("updatePostModal"));
  };
  const handleUpdate = async () => {
    const now = new Date().toISOString();
    const post = {
      ...previewedPostData,
      ...form.getFieldsValue(),
      updatedAt: now,
    };
    const updatedPost = await updatePost(post);
    dispatch(postsActions.updatePost(updatedPost));
    hideModal();
  };

  return (
    <Modal
      visible={isVisible}
      centered
      onCancel={hideModal}
      footer={null}
    >
      <Form
        name="update"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        onFinish={handleUpdate}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
          className="!mt-6"
          initialValue={previewedPostData.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: "Please input body!" }]}
          className="!mt-6"
          initialValue={previewedPostData.body}
        >
          <Input.TextArea showCount maxLength={200} rows={4} />
        </Form.Item>
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          form="update"
          className="!ml-auto  mt-10 !block"
        >
          Update
        </Button>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
