
import './App.css';
import React, { useState } from "react";
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import Login from './pages/Login';
import Register from './pages/Register';
import Description from './pages/Description';
import Interpretation from './pages/Interpretation';
import Video from './pages/Video'
import Video2 from './pages/Video2'
import Sound from './pages/Sound'
import Account from './pages/Account';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { redirect } from "react-router-dom";

//import test from './pages/test'

const SERVER_ORIGIN = '';

function App() {
  //const routing = useRoutes(routes);
  //const [currentForm, setCurrentForm] = useState('login');
  //const toggleForm = (formName) => {setCurrentForm(formName);}

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/account' element={<Account />}/>
            <Route path='/description' element={<Description />}/>
            <Route path='/interpretation' element={<Interpretation />}/>
            <Route path='/video' element={<Video />}/>
            <Route path='/video2' element={<Video2 />}/>
            <Route path='/sound' element={<Sound />}/>
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;

//{
  //currentForm === 'login' ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
  //<Account />
  //<test />
  //<Description />
  //<Interpretation />
  //<Video />
//}

