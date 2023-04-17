import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import Draggable, {DraggableCore} from "react-draggable";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import img1 from '../components/img1.png';
import img2 from '../components/img2.png';
import img3 from '../components/img3.png';
import s1 from '../components/s1.jpeg';
import s2 from '../components/s1.jpeg';
import s3 from '../components/s1.jpeg';


const Video = (props) => {
    const [regen, setRegen] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        console.log(e.target.value);
        e.preventDefault();
    }
    const Draggable = require('react-draggable');
    const DraggableCore = Draggable.DraggableCore;

    return (
        <div className='input-container' style={{textAlign:'left'}}>
            <label className='h3-light'>Restore your dream video.</label>


            <button className='button-light' type='submit' onClick={() => navigate("/interpretation")} style={{position: 'relative', left: '70px', top: '120px'}}>Edit</button>
            <button className='button-light' type='submit' style={{position: 'relative', left: '70px', top: '120px', marginLeft:'30px'}}>Save</button>
            <button className='button-light' type='submit' style={{position: 'relative', left: '70px', top: '120px', marginLeft:'30px'}}>Regenerate</button>
            <form className='desc-form' style={{height: '500px'}} onSubmit={handleSubmit}>
                <text className='input-title' style={{textAlign:'center', marginTop:'160px'}}>Generating...</text>
                <text className='input-text' style={{textAlign:'center', marginTop:'30px'}}>This might take minutes, feel free to log out and come back again for your dream video in the dream gallery.</text>
            </form>
        </div>
    );
};

export default Video;
