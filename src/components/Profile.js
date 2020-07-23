import React, { useEffect, useContext, useState } from 'react'
import AppContext from '../AppContext';
import { Avatar } from 'antd';

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
      console.log(state);
    }
  )

  if (state.loaded) {
    return(
      <div>
      <h1>Welcome back, {state.result.username}</h1>
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