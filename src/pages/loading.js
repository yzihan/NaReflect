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


const Video = () => {

    return (
        <div className='input-container' style={{textAlign:'left'}}>
            <div className='desc-form' style={{height: '500px'}}>
                <text className='input-title' style={{textAlign:'center', marginTop:'160px'}}>Generating...</text>
            </div>
        </div>
    );
};

export default Video;
