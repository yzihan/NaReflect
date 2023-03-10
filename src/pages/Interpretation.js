import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
var connect_config = require('../config.json');



const Interpretation = (props) => {
    
    //const [items] = React.useState(getItems);
    //const scenes = ['scene1','s2','s3','s4']
    //alert(JSON.parse(window.sessionStorage.getItem('dream_chars'))[2])
    //alert(JSON.parse(window.sessionStorage.getItem('dream_chars'))[3])
    const newChars = [];
    const initChars = JSON.parse(window.sessionStorage.getItem('dream_chars'));
    for (let i=0;i<initChars.length;i++) { var char = initChars[i].split('; '); newChars.push(char.map((s,i) => {return s;})); }
    const newActs = [];
    var initActs = JSON.parse(window.sessionStorage.getItem('dream_acts'));
    for (let i=0;i<initActs.length;i++) { var act = initActs[i].split('; '); newActs.push(act);}
    const [sentences, setSentences] = useState(JSON.parse(window.sessionStorage.getItem('dream_sentences')));
    const [chars, setChars] = useState(newChars);
    const [scenes, setScenes] = useState(JSON.parse(window.sessionStorage.getItem('dream_scenes')));
    const [acts, setActs] = useState(newActs);
    const navigate = useNavigate();
    const sceneStates = [];
    for (let i=0;i<4;i++) {
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('output'+e);
    }
    
    function handleMerge(itemId) {
        chars.splice(itemId+1, 1);
        const newActs = acts.map((s,i) => {if(i===itemId){return s+' '+acts[i+1];}else{return s;}});
        newActs.splice(itemId+1, 1);
        setActs(newActs);
        scenes.splice(itemId+1, 1);
        const newSentences = sentences.map((s,i) => {if(i===itemId){return s+' '+sentences[i+1];}else{return s;}});
        newSentences.splice(itemId+1, 1);
        setSentences(newSentences);
    }
    function handleAdd(itemId) {
        chars.splice(itemId, 0, ['']);
        acts.splice(itemId, 0, ['']);
        scenes.splice(itemId, 0, '');
        sentences.splice(itemId, 0, '');
    }

    function handleScenes(e, itemId) {
        const newScenes = scenes.map((s,i) => {if(i===itemId){return e;}else{return s;}});
        setScenes(newScenes);
    }
    function handleChars(e, itemId, charId) {
        const newChars = [];
        for (let i=0;i<scenes.length;i++) {
            if (i === itemId) newChars.push( chars[i].map((s,i) => {if(i===charId){return e;}else{return s;}}));
            else newChars.push( chars[i].map((s,i) => {return s;}));
        }
        setChars(newChars);
        //alert(chars[itemId][charId]);
    }
    function handleActs(e, itemId, charId) {
        const newActs = [];
        for (let i=0;i<scenes.length;i++) {
            if (i === itemId) newActs.push( acts[i].map((s,i) => {if(i===charId){return e;}else{return s;}}));
            else newActs.push( acts[i].map((s,i) => {return s;}));
        }
        setActs(newActs);
    }

    const SceneCard = ({itemId}) => {
        //alert('id:'+id.target);
        //const itemId = '0';

        return (
            <div style={{width:'10%'}}>
                <form className='desc-form' style={{minHeight:'120px', marginTop:'0px'}}>
                <div class='row'>
                    <div class='column' style={{width:'80%'}}>
                    <text className='input-text' style={{textAlign:'left', fontSize:'22px'}}>{sentences[itemId]}</text>
                    {itemId < 3 ? <text className='input-text' style={{textAlign:'left', color:'#777777', fontSize:'22px'}}>{sentences[itemId+1]}</text>:<text></text>}
                    </div>
                    <div class='column' style={{width:'10%'}}>
                    {
                        itemId < 3 ? <button className='button-dark' type='button' onClick = {(e) => handleMerge(itemId)} style={{position: 'relative', left: '90%', top: '0px'}}>Merge</button> : <></>
                    }
                    
                    {/*<button className='button-dark' type='button' onClick = {(e) => handleAdd(itemId)} style={{position: 'relative', left: '90%', top: '-10px'}}>Add</button>*/}
                    </div>
                </div>
                </form>
               <form className='inte-form' style={{marginTop:'30px', marginBottom:'120px'}}>
                    <body>
                    <div class='row'>
                        <div class='column' style={{width:'15%'}}>
                        <label className='input-title'>Character.</label> 
                        
                        </div>

                        <div class='column' style={{width:'10%'}}>
                        {/*<label className='input-box' type='button' style={{width:'30px', height:'10px', backgroundColor:'#FFFFFF', padding:'2px', fontSize:'20px'}} > + </label>*/}
                        <button style={{width:'30px', height: '28px', borderRadius:'15px', backgroundColor:'#777777', color:'#FFFFFF', padding:'2px', fontSize:'20px'}}>+</button>

                        </div>
                        <div class='column' style={{width:'75%'}}>
                        <label className='input-title' style={{marginLeft:'60px'}}>Scene.</label>
                        </div>
                    </div>

                    {
                        <div>{CharCard({itemId:itemId, chars:chars[itemId]})} </div>
                    /*
                    chars[itemId].map((char, index) => (
                        <div>{CharCard({itemId:itemId,charId:index})} </div>
                    ))
                    */
                    }
                    </body>
                    {
                /*
                    <label className='input-title' style={{marginTop:'10px'}}>Scene.</label>
                    <textarea className='input-box-large' value={scenes[itemId]} style={{height:'100px'}} onChange={(e) => handleScenes(e.target.value, itemId)} rows='5' cols='50' placeholder='' id='scene' name='scene' />
                */
                }
                </form>
            </div>
        );
    }

    const CharCard1 = ({itemId, charId}) => {
        return (
            <div class='row'>
                <div class='column' style={{width:'25%'}}>
                <input className='input-box' value={chars[itemId][charId]} style={{width:'250px'}} onChange={(e) => handleChars(e.target.value, itemId, charId)} type='text' placeholder='' id='char' name='char' />
                </div>
                <div class='column' style={{width:'75%'}}>
                <input className='input-box' value={acts[itemId][charId]} style={{marginLeft:'60px', width:'700px'}} onChange={(e) => handleActs(e.target.value, itemId, charId)} type='text' placeholder='' id='act' name='act' />
                </div>
            </div>
        )
    }

    const CharCard = ({itemId, chars}) => {
        return (
            <div class='row'>
                <div class='column' style={{width:'25%'}}>
            {
                chars[0]!==''?<input className='input-box' value={chars[0]} style={{width:'250px'}} onChange={(e) => handleChars(e.target.value, itemId, 0)} type='text' placeholder='' id='char' name='char' />:<input className='input-box' style={{width:'250px', backgroundColor: 'rgba(0,0,0,0)', border:'None',}} />
            }
             {   chars.length>1?<input className='input-box' value={chars[1]} style={{width:'250px'}} onChange={(e) => handleChars(e.target.value, itemId, 0)} type='text' placeholder='' id='char' name='char' />:<div />
             }
                

                
                
                </div>
                <div class='column' style={{width:'75%'}}>
                <textarea className='input-box-large' value={acts[itemId]} rows='5' cols='50' style={{marginLeft:'60px', width:'700px', height:'127px'}} onChange={(e) => handleActs(e.target.value, itemId, 0)} type='text' placeholder='' id='act' name='act' />
                </div>
            </div>
        )
    }

    return (
        <div className='input-container' style={{textAlign:'left'}} onSubmit={handleSubmit}>
            <div className='header' style={{position:'fixed', width:'1100px'}} >
                <label className='h3-light'>Information and relationship interpretation.</label>
                <button className='button-dark' type='submit' onClick={() => navigate("/description")} style={{position: 'relative', left: '70px', top: '120px'}}>Back</button>
                <button className='button-dark' type='submit' onClick={() => navigate("/sound")} style={{position: 'relative', left: '70px', top: '120px', marginLeft:'30px'}}>Save</button>
            </div>

            <div class='row' style={{height:'550px', width:'1100px', marginTop:'20%', paddingTop:'-200px', marginBottom:'10%', overflow:'scroll'}}>
                {scenes.map((item, index) => (
                    <div>{SceneCard( {itemId:index}) }</div>
                ))}
            </div>
        </div>
    );
};
/*
<div style={{ width: "100%", overflow: "auto", display: "flex" }}>
            {map(range(4), idx => (
                <Container itemId={idx} />
            ))}
        </div>
        */


//<SceneCard itemId={index} /> <SceneCard itemId='0' chars={chars} acts={acts} scenes={scenes}/>
/*
    return (
        <div className='input-container' style={{textAlign:'left'}}>
            <label className='h3-light'>Information and relationship interpretation.</label>
            <button className='button-light' type='submit' style={{position: 'relative', left: '70px', top: '120px'}}>Save</button>
            
            <form className='desc-form' onSubmit={handleSubmit}>
                <text className='input-text' style={{textAlign:'left'}}>{sentence}</text>
                <button className='button-dark' style={{position: 'relative', left: '85%', top: '-35px'}}>Merge</button>
            </form>

            <form className='inte-form'>
                <body>
                <div class='row'>
                    <div class='column' style={{width:'30%'}}>
                    <label className='input-title'>Character.</label>
                    <input className='input-box' value={char} style={{width:'300px'}} onChange={e => setChar(e.target.value)} type='text' placeholder='' id='char' name='char' />
                    </div>
                    <div class='column' style={{width:'70%'}}>
                    <label className='input-title' style={{marginLeft:'60px'}}>Action.</label>
                    <input className='input-box' value={act} style={{marginLeft:'60px', width:'630px'}} onChange={e => setAct(e.target.value)} type='text' placeholder='' id='act' name='act' />
                    </div>
                </div>
                </body>
                <label className='input-title' style={{marginTop:'20px'}}>Scene.</label>
                <textarea className='input-box-large' value={scene} style={{height:'100px'}} onChange={e => setScene(e.target.value.replace('\\n', '\n'))} rows='5' cols='50' placeholder='' id='scene' name='scene' />
                
            </form>
        </div>
    );
};
*/



export default Interpretation;