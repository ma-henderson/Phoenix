import React, { useState } from 'react';
import { Modal, Button } from 'antd';

var ModalSubmit = (props) => {
  
  const [state, setState] = useState({
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  })

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const handleOk = () => {
    setState({
      ...state,
      ModalText: 'Setting up your new goal tracker',
      confirmLoading: true,
    });
    // replace with async/await functions
    setTimeout(() => {
      setState({
        ...state,
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  const handleCancel = () => {
    // when functioning, comment out or delete log
    console.log('Clicked cancel button');
    setState({
      ...state,
      visible: false,
    });
  };

  const { visible, confirmLoading, ModalText } = state;

  return(
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{ModalText}</p>
      </Modal>
    </div>
  );
}
export default ModalSubmit