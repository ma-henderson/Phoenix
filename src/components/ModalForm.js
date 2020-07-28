import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';

// Origin of this is a mix of 2 components: Data-input (Add-item) and Form (with Modal)
const ModalForm = ({ visible, onCreate, onCancel }) => { // factored props from modal button
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
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
            // fetch(`${process.env.REACT_APP_BACKEND_URL}/goal/create`, { //make sure to create model
            //   method: 'POST',
            //   headers: {
            //     'content-type': 'application/json'
            //   },
            //   body: JSON.stringify(values)
            // });

            form.resetFields(); // Change this to fetch
            onCreate(values); 
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form name="form_in_modal" form={form} {...formItemLayoutWithOutLabel}>
      <Form.Item
        {...formItemLayout}
        label="Title"
        name="goalTitle"
        rules={[{ required: true, message: 'You need to give your new goal a name!' }]}
      >
        <Input placeholder="(ie Weight loss, Weekly readings, New car savings)" />
      </Form.Item>
      <Form.List name="names">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Input type' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please provide a data input name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="(ie Distance, time, pages, value)" style={{ width: '85%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      // Take a look at Emotion.sh for css within jsx (ie :hover)
                      style={{ margin: '0 8px', position: 'absolute', right: 0 }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '85%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Form>
    </Modal>
  );
};

const CollectionsPage = (props) => {
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
      <ModalForm
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
  CollectionsPage,
  ModalForm,
}
