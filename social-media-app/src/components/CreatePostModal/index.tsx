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
    <Modal visible={isVisible} centered onCancel={hideCreatePostModal}>
      <Form></Form>
    </Modal>
  );
};

export default CreatePostModal;
