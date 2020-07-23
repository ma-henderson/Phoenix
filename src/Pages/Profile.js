import React, { useEffect, useContext, useState } from 'react'
import AppContext from '../AppContext';
import { Row, Col, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import ModalSubmit from '../components/ModalSubmit.js';
const { Meta } = Card;

const Profile = () => {

  const [globalState, setGlobalState] = useContext(AppContext)
  const [state, setState] = useState({loaded: false})

  globalState.loggedIn && !state.loaded && fetch(`${process.env.REACT_APP_BACKEND_URL}profile`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem('jwt')}`}
      }    
  ).then(response=>response.json())
  .then(
    (result)=>{
      // use DB info to create profile page (name, picture, goals, etc)
      setState({...state, loaded: true, result: result})
    }
  )

  if (state.loaded) {
    return(
      <div>
        <Card
          style={{ width: 200 }}
          cover={
            <img
              alt="example"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSKsmTSO8AUBRn1D-9hiSMles-PJRO9Ci5_5w&usqp=CAU"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            title={state.result.username}
            description={state.result.email}
          />
        </Card>
        
        <ModalSubmit />

      </div>
    )
  } else {
    return(
    <div>
      <h1>Loading...</h1>
    </div>
    )
  }
}
export default Profile