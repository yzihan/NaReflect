import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const GeneratedStyle = ()=>{
    const [style, setStyle] = useState('');
    const [emo, setEmo] = useState('Neutral');

    const navigate = useNavigate();
    const next = ()=>{
        window.localStorage.setItem('style', style)
        window.localStorage.setItem('emo', emo)
        navigate('/loading')
    }

    return(
        <div className='desc-form desc-form-extend'>
            <div className='column' style={{width: '100%'}}>
                <label className='input-title'>Generated Image Style.</label>
                <select className='dropdown' value={style}
                        onChange={e => setStyle(e.target.value)} id='style' name='style'
                        style={{width: '100%', backgroundColor:'#757595b8', color:'white', border: 'none', outline: 'none'}}>
                    <option value='real photo high resolution'>Real photo</option>
                    <option value='artistic'>Artistic</option>
                    <option value='photorealistic'>Photorealistic</option>
                </select>
            </div>
            <div className='column' style={{width: '100%'}}>
                <label className='input-title'>Emotion tone.</label>
                <select className='dropdown' value={emo}
                        onChange={(e) => (setEmo(e.target.value))} id='style' name='style'
                        style={{width: '100%', backgroundColor:'#757595b8', color:'white', border: 'none', outline: 'none'}}>
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
            <button className='button-dark' onClick={next}>NEXT</button>
        </div>
    )
}

export default GeneratedStyle;
