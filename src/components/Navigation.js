import React, { useState, useContext } from 'react'
import { Menu, Button } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import AppContext from '../AppContext';
const { SubMenu } = Menu;

const Logout = () => {
  const [ state, setState ] = useState({
    current: 'mail',
  })

  const [ globalState, setGlobalState ] = useContext(AppContext);

  const handleClick = e => {
    console.log('click ', e);
    setState({ current: e.key });
  };


  const handleLog = () => {
    const newLogged = !globalState.loggedIn
    setGlobalState({
      ...globalState, loggedIn: newLogged
    })
  }
  return(
    <div>
      <Menu onClick={handleClick} selectedKeys={[state.current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Protected stuff
        </Menu.Item>
        <SubMenu icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
        <Button 
        type="default" 
        style={{float: "right", margin: "8px 20px"}}
        onClick={handleLog}
        >
          {globalState.loggedIn ? "Sign out" : "Log in"}
        </Button>
        <Button type="primary" style={{float: "right", margin: "8px 8px"}}>Register</Button>
      </Menu>
    </div>
  )
}
export default Logout