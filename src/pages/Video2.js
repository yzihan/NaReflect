import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Player } from 'video-react';
import ReactPlayer from 'react-player'
import video from '../components/video.mp4'
import Draggable, {DraggableCore} from "react-draggable";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import img1 from '../components/img1.png';
import img2 from '../components/img2.png';
import img3 from '../components/img3.png';
import s1 from '../components/s1.jpeg';
import s2 from '../components/s2.jpeg';
import s3 from '../components/s3.jpeg';


const Video2 = (props) => {
    const [regen, setRegen] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }
    const Draggable = require('react-draggable');
    const DraggableCore = Draggable.DraggableCore;




    return (
        <div className='input-container' style={{textAlign:'left'}}>
            <label className='h3-light'>Restore your dream video.</label>

            <button className='button-light' type='submit' onClick={() => navigate("/interpretation")} style={{position: 'relative', left: '70px', top: '120px'}}>Edit</button>
            <button className='button-light' type='submit' style={{position: 'relative', left: '70px', top: '120px', marginLeft:'30px'}} label='save'>Save</button>
            <button className='button-light' type='submit' style={{position: 'relative', left: '70px', top: '120px', marginLeft:'30px'}}>Regenerate</button>
            <form className='desc-form' style={{height: '500px'}} onSubmit={handleSubmit}>
            <text className='input-title' style={{textAlign:'center', marginTop:'10px'}}>Your dream video is ready!</text>
             
            <ReactPlayer url={video} style={{width:'50%', height:'50%', marginLeft:'200px', marginTop:'20px' }}  playIcon={<button className='button-light' >Play</button>}></ReactPlayer>
            {/*}
            <text className='input-text' style={{textAlign:'center', marginTop:'10px'}}>Feel free to adjust the layout of the characters.</text>
            <div class='row'>
                <div class='column' style={{width:'30%', marginLeft:'6%'}}>
                <img src={s1} style={{width:'260px', height:'260px', backgroundColor:'rgba(0,0,0,0)', margin:'15px', borderRadius:'15px'}} ></img>
                <text className='input-title' style={{marginLeft:'105px', marginTop:'0px'}}>Scene#1</text>
                <Draggable><img src={img1} style={{width:'110px', height:'110px', opacity:'100%', backgroundColor:'rgba(0,0,0,0)', marginTop:'-300px', transform:'translate(-50%, -50%)'}}></img></Draggable>
                </div>
                <div class='column' style={{width:'30%'}}>
                <img src={s2} style={{width:'260px', height:'260px', backgroundColor:'rgba(0,0,0,0)', margin:'15px', borderRadius:'15px'}} ></img>
                <text className='input-title' style={{marginLeft:'105px', marginTop:'0px'}}>Scene#2</text>
                </div>
                <div class='column' style={{width:'30%'}}>
                <img src={s3} style={{width:'260px', height:'260px', backgroundColor:'rgba(0,0,0,0)', margin:'15px', borderRadius:'15px'}} ></img>
                <text className='input-title' style={{marginLeft:'105px', marginTop:'0px'}}>Scene#3</text>
                <Draggable><img src={img2} style={{width:'140px', height:'140px', opacity:'100%', backgroundColor:'rgba(0,0,0,0)', marginTop:'-300px', transform:'translate(-50%, -50%)'}}></img></Draggable>
                <Draggable><img src={img3} style={{width:'125px', height:'125px', opacity:'100%', backgroundColor:'rgba(0,0,0,0)', marginTop:'-300px', transform:'translate(-50%, -50%)'}}></img></Draggable>
                
                </div>
    </div>*/}
            
    </form>
        
    </div>

    );
};

export default Video2;
//<ReactPlayer url={video} style={{width:'50%', height:'50%', marginLeft:'200px'}} controls={true}></ReactPlayer>

