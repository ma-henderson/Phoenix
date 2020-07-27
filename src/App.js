import React, { useState } from 'react';
import './App.css';
import AppContext from './AppContext';
import { BrowserRouter, Route } from 'react-router-dom';
import { Row, Col } from 'antd';

import Navigation from './Pages/Navigation';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';

function App() {
  
  const [ globalState, setGlobalState ] = useState({
    loggedIn: sessionStorage.getItem('jwt') ? true : false,
    username: sessionStorage.getItem('username')
  })  

  return (
    <AppContext.Provider value ={[globalState, setGlobalState]}>
      <div className="App">
        <BrowserRouter>
        <Navigation />

          <Route path ="/" exact component={Home} />
          <Route path ="/user"  component={Login} />
          <Route path ="/profile"  component={Profile} />

        </BrowserRouter>
      </div>
    </AppContext.Provider>

  );
}

export default App;
