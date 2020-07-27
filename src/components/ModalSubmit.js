import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import FormDyanmicFields from './FormDynamicFields';

const ModalSubmit = (props) => {
  
  const [state, setState] = useState({
    ModalText: 'How will your goals? Add the fields of interest below to give your aim some structure!',
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

  const handleForm = (info) => {
    console.log("success:", info)
  }

  const { visible, confirmLoading, ModalText } = state;

  return(
    <div>
      <Button type="primary" onClick={showModal} style={{ width: props.width }}>
        New Goal
      </Button>
      <Modal
        title="New Goal Setup"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{ModalText}</p>

      <FormDyanmicFields handleForm={handleForm} visible={state.visible}/>

      </Modal>
    </div>
  );
}
export default ModalSubmit