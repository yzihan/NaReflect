import './App.css';
import React from "react";
import Login from './pages/Login';
import Register from './pages/Register';
import Interpretation from './pages/Interpretation';
import Sound from './pages/Sound'
import Blocks from './pages/blocks'
import QA from "./pages/Q&A";
import Test from './pages/test'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import GeneratedContent from "./pages/generatedContent";
import GeneratedStyle from './pages/generatedStyle';
import Loading from "./pages/loading";
import Pictures from "./pages/generatedPictures";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/interpretation' element={<Interpretation />}/>
            <Route path='/loading' element={<Loading />}/>
            <Route path='/pictures' element={<Pictures />}/>
            <Route path='/sound' element={<Sound />}/>
            <Route path='/blocks' element={<Blocks />}/>
            <Route path='/test' element={<Test />}/>
            <Route path='/QA' element={<QA />}/>
            <Route path='/generatedContent/:length' element={<GeneratedContent />}/>
            <Route path='/generatedStyle' element={<GeneratedStyle />}/>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
