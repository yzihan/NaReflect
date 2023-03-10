import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import icon1 from '../components/icon1.png';
import icon2 from '../components/icon2.png';
import sound1 from '../components/sound1.png';
import sound2 from '../components/sound2.png';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Sound = (props) => {
    const [regen, setRegen] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }

    return (
        <div className='input-container' style={{textAlign:'left'}}>
            <label className='h3-light'>Background Music and Narration</label>

            
            <button className='button-light' type='submit' onClick={() => navigate("/interpretation")} style={{position: 'relative', left: '70px', top: '120px'}}>Back</button>
            <button className='button-light' type='submit' onClick={() => navigate("/video")} style={{position: 'relative', left: '70px', top: '120px', marginLeft:'30px'}}>Save</button>
            <button className='button-light' type='submit' style={{position: 'relative', left: '70px', top: '120px', marginLeft:'30px'}}>Regenerate</button>
            <form className='desc-form' style={{height: '500px'}} onSubmit={handleSubmit}>
            
            <div class='row'>
                <div class='column' style={{width:'5%'}}>
                <img src={icon1} style={{width:'100%', height:'100%'}}/>
                </div>
                <div class='column' style={{width:'75%', marginTop:'10px'}}>
                <text className='input-title' style={{textAlign:'left', marginTop:'60px'}}>Do you want a generative background music?</text>
                </div>
                <div class='column' style={{width:'20%'}}>
                <button className='button-dark' type='button'  >Add</button>
           
                </div>
            </div>

            <img src={sound1} style={{width:'45%', height:'25%', marginLeft:'6%'}}/>

            <div class='row' style={{marginTop:'30px'}}>
                <div class='column' style={{width:'5%'}}>
                <img src={icon2} style={{width:'80%', height:'80%', marginLeft:'10px'}}/>
                </div>
                <div class='column' style={{width:'75%', marginTop:'10px'}}>
                <text className='input-title' style={{textAlign:'left', marginTop:'60px'}}>Do you want the narration has sound?</text>
                </div>
                <div class='column' style={{width:'20%'}}>
                <button className='button-dark' type='button'  >Add</button>
           
                </div>
            </div>
            <img src={sound2} style={{width:'45%', height:'25%', marginLeft:'6%'}}/>
            
            </form>
        </div>
    );
};

export default Sound;