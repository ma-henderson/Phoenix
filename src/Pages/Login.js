import React, {useContext, useState} from 'react'
import AppContext from '../AppContext';
import { Form, Input, Space, Row, Col, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Redirect } from "react-router-dom";

const Login = () => {
  //Setting up for Form to disappear when Submitted
  const [state, setState] = useState({saved: false, redirect: '/profile/'})
  const [globalState, setGlobalState] = useContext(AppContext);

  //Styling from AntD
  const layout = {labelCol: { span: 8 }, wrapperCol: { span: 16 }};
  const tailLayout = {wrapperCol: { offset: 8, span: 16 }};

  // 1. Send log in data
  const onFinish = values => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}user/login`, 
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify({
        email: values.userEmail,
        password: values.userPassword
      })
    })
    .then(
      (response)=>response.json()
    )
    .then(
      (result) => {
        // 2.1 IF Correct, change state to logged in and store token(s)
        sessionStorage.setItem('jwt', result.accesstoken)
        sessionStorage.setItem('username', result.username)
        setGlobalState({...globalState, loggedIn: true, userdata: result});
        // 2.2 Send user to protected route Profile
        
          // 3. IF Wrong data, send message
      }
    )
  }  

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  if (globalState.loggedIn == false) {
    return(
      <Space direction="vertical">
        
        <h3>Log in!</h3>
        <Form
          {...layout}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

        <Form.Item
          label="Email"
          name="userEmail"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input placeholder="input e-mail"/>
        </Form.Item>
        <Form.Item
          label="Password"
          name="userPassword"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            placeholder="input password"
            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">Log in</Button>
        </Form.Item>
        </Form>
      
      </Space>
    )
  } else {
    return(
      <Space direction="vertical">
        <Redirect to={state.redirect}/>
        <h2>You're already logged in, {globalState.username}!</h2>
        <h3>go here to see your profile</h3>
      </Space>
    )

  }
}
export default Login;