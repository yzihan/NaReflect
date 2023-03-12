
import './App.css';
import React,{Routes} from "react";
import Login from './pages/Login';
import Register from './pages/Register';
import Description from './pages/Description';
import Interpretation from './pages/Interpretation';
import Sound from './pages/Sound'
import {BrowserRouter as Router, Route} from 'react-router-dom';



function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/description' element={<Description />}/>
            <Route path='/interpretation' element={<Interpretation />}/>
            <Route path='/sound' element={<Sound />}/>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;


