import React, { useContext, useState } from 'react'
import AppContext from '../AppContext';
import { Row, Col, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { ModalForm, CollectionsPage } from '../components/ModalForm.js';
import { ModalFormTwo, CollectionsPg } from '../components/ModalFormTwo.js';
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
  const cardWidth = 200;

  if (state.loaded) {
    return(
      <div>
        <Row justify="center" gutter={[0, 16]} style={{marginTop: 8}}>
        <Col>
        <Card
          style={{ width: cardWidth }}
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
        </Col>
        </Row>
        
        <Row justify="center" gutter={[16, 16]}  style={{marginTop: 8}}>
          <CollectionsPage width={cardWidth}/>
        </Row>
        <Row justify="center" gutter={[16, 16]}  style={{marginTop: 8}}>
          <CollectionsPg width={cardWidth}/>
        </Row>
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