import React, { useState } from 'react';
import { Button, Modal, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';

// Origin of this is a mix of 2 components: Data-input (Add-item) and Form (with Modal)
const ModalFormTwo = ({ visible, onCreate, onCancel }) => { // factored props from modal button
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  }
  const formItemLayout2 = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 23, offset: 1 },
    },
  };
  return (
    <Modal
      visible={visible}
      title="How do you want to track your goal?"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => { // Get "async functionality" from ModalSubmit?
        form
          .validateFields()
          .then(values => {
            // Manipulate values so each input is a record
            // If it's a record it will be filled in simultaneously (x, y, z, ...)
            // whatever is in values.names, make a seperate property

            // fetch(`${process.env.REACT_APP_BACKEND_URL}/goal/create`, { //make sure to create model
            //   method: 'POST',
            //   headers: {
            //     'content-type': 'application/json'
            //   },
            //   body: JSON.stringify(values)
            // });

            form.resetFields(); // Apply this to onCancel as well?
            onCreate(values); 
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form name="form_in_modal" form={form} {...formItemLayout2}>
      <Form.Item
        {...formItemLayout}
        label="Title"
        name="goalTitle"
        rules={[{ required: true, message: 'You need to give your new goal a name!' }]}
        style={{marginBottom: '6px'}}
      >
        <Input placeholder="(ie Weight loss, Weekly readings, New car savings)" />
      </Form.Item>
      <hr style={{height:'0.5px', borderWidth:'0', backgroundColor: 'gainsboro'}}/>
      <Form.List name="names">
        {(fields, { add, remove }) => {
          return (
            <div>
            {fields.map((field, index) => (
              <div style={{display: 'flex'}}>
                  <Form.Item
                    {...formItemLayout2}
                    label={`Input ${index+1}`}
                    name={[field.name, 'data']}
                    fieldKey={[field.fieldKey, 'data']}
                    rules={[{ required: false, message: 'Missing data type!' }]}
                  >
                    <Input placeholder="Data name" />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    {...field}
                    name={[field.name, 'goal']}
                    fieldKey={[field.fieldKey, 'goal']}
                    rules={[{ required: true, message: 'Don\'t forget your goal' }]}
                  > 
                    <Input placeholder="Goal value" />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      // Take a look at Emotion.sh for css within jsx (ie :hover)
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                  </div>
              ))}
              {fields.length < 5 ? 
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '100%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
              :
              null
              }
            </div>
          );
        }}
      </Form.List>
    </Form>
    </Modal>
  );
};

const CollectionsPg = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        shape="round"
        icon={<PlusCircleOutlined />}
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Track a new Goal!
      </Button>
      <ModalFormTwo
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export {
  CollectionsPg,
  ModalFormTwo,
}
