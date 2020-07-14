import React, { useEffect, useContext, useState } from 'react'
import AppContext from '../AppContext';

const Profile = () => {

  const [globalState, setGlobalState] = useContext(AppContext)
  const [state, setState] = useState({})

  globalState.loggedIn && fetch(`${process.env.REACT_APP_BACKEND_URL}profile`,
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
      setState({...state, username: result.username})
    }
  )

  if (globalState.loggedIn) {
    return(
      <div>
      <h1>Welcome back,  </h1>
      </div>
    )
  }
}
export default Profile