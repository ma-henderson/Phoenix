import React, { useState } from 'react';
import './App.css';
import AppContext from './AppContext';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  
  const [ globalState, setGlobalState ] = useState({
    loggedIn: false
  })  

  return (
    <AppContext.Provider value ={[globalState, setGlobalState]}>
      <div className="App">
        <BrowserRouter>
        <Navigation />

        <Route path ="/" exact component={Home} />
        <Route path ="/login"  component={Login} />
        <Route path ="/profile"  component={Profile} />
        
        </BrowserRouter>
      </div>
    </AppContext.Provider>

  );
}

export default App;
