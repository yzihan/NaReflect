import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
var connect_config = require('../config.json');

const Description = (props) => {
    const emos = [ 'admiration', 'amusement', 'anger', 'annoyance', 'approval', 'caring', 'confusion', 'curiosity', 'desire', 'disappointment', 'disapproval', 'disgust', 'embarrassment', 'excitement', 'fear', 'gratitude', 'grief', 'joy', 'love', 'nervousness', 'optimism', 'pride', 'realization', 'relief', 'remorse', 'sadness', 'surprise', 'neutral'];
    const [style, setStyle] = useState(window.sessionStorage.getItem('dream_style'));
    const [emo, setEmo] = useState('Neutral');
    const [title, setTitle] = useState(window.sessionStorage.getItem('dream_title'));
    const [desc, setDesc] = useState(window.sessionStorage.getItem('dream_desc'));
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        var serverUrl = connect_config.server_host+'/description/'
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'user':window.sessionStorage.getItem('user_name'),
                'title':title, 'style':style, 'desc':desc})
          })
          .then(response => response.json())
          .then(response => {
            if (response.res === false) {alert('[Error] '+response.message);}
            else {
                window.sessionStorage.setItem('dream_title', response.title);
                window.sessionStorage.setItem('dream_style', response.style);
                window.sessionStorage.setItem('dream_desc', response.desc);
                window.sessionStorage.setItem('dream_folder', response.folder);
                window.sessionStorage.setItem('dream_sentences', JSON.stringify(response.sentences));
                window.sessionStorage.setItem('dream_chars', JSON.stringify(response.chars));
                window.sessionStorage.setItem('dream_scenes', JSON.stringify(response.scenes));
                window.sessionStorage.setItem('dream_acts', JSON.stringify(response.acts));
                //alert('Success '+window.sessionStorage.getItem('dream_folder'));
                navigate('/interpretation');
            }
          })
    }

    return (
        <div className='input-container' style={{textAlign:'left'}} onSubmit={handleSubmit}>
            <label className='h3-light'>Please describe your dream.</label>
                <button className='button-dark' type='button' onClick={() => navigate("/account")} style={{position: 'relative', left: '70px', top: '120px'}}>Back</button>
                <button className='button-dark' type='submit' onClick={handleSubmit} style={{position: 'relative', left: '70px', top: '120px', marginLeft:'30px'}}>Save</button>
            <form className='desc-form' style={{marginTop:'160px', marginBottom:'120px'}} >
                <body>
                <div class='row'>
                    <div class='column' style={{width:'45%'}}>
                    <label className='input-title'>Dream Title.</label>
                    <input className='input-box' value={title} style={{width:'480px'}} onChange={e => setTitle(e.target.value)} type='text' placeholder='' id='title' name='title' />
                    </div>

                    <div class='column' style={{width:'25%'}}>
                        <label className='input-title' style={{marginLeft:'60px'}}>Dream Emotion.</label>
                        <select className='dropdown' value={emo} style={{marginLeft:'60px', width:'225px'}} onChange={e => setEmo(e.target.value)} id='style' name='style'>
                            <option value='artistic'>Others (please specify)</option>
                            <option>Admiration</option>
                            <option>Amusement</option>
                            <option>Anger</option>
                            <option>Annoyance</option>
                            <option>Approval</option>
                            <option>Caring</option>
                            <option>Confusion</option>
                            <option>Curiosity</option>
                            <option>Desire</option>
                            <option>Disappointment</option>
                            <option>Disapproval</option>
                            <option>Disgust</option>
                            <option>Embarrassment</option>
                            <option>Excitement</option>
                            <option>Fear</option>
                            <option>Gratitude</option>
                            <option>Grief</option>
                            <option>Joy</option>
                            <option>Love</option>
                            <option>Nervousness</option>
                            <option>Optimism</option>
                            <option>Pride</option>
                            <option>Realization</option>
                            <option>Relief</option>
                            <option>Remorse</option>
                            <option>Sadness</option>
                            <option>Surprise</option>
                            <option>Neutral</option>
                        </select>
                    </div>

                    <div class='column' style={{width:'25%'}}>
                    <label className='input-title' style={{marginLeft:'60px'}}>Dream Style.</label>
                    <select className='dropdown' value={style} style={{marginLeft:'60px', width:'225px'}} onChange={e => setStyle(e.target.value)} id='style' name='style'>
                        <option value='real photo high resolution'>Real photo</option>
                        <option value='artistic'>Artistic</option>
                        <option value='photorealistic'>Photorealistic</option>
                        <option value='artistic'>Others (please specify)</option>
                    </select>
                    </div>
                </div>
                </body>
                <label className='input-title' style={{marginTop:'20px'}}>Dream Description.</label>
                <label className='input-text' style={{marginTop:'5px', marginBottom:'5px', color:'#404040'}}>Please specify the name of each character, and seperate each sense using '.'</label>
                <textarea className='input-box-large' value={desc} onChange={e => setDesc(e.target.value.replace('\\n', '\n'))} rows='5' cols='50' placeholder='' id='desc' name='desc' />
                <button className='button-dark' type='submit'>Save</button>

            </form>
        </div>
    );
};

export default Description;
