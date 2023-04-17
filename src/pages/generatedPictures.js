import { useNavigate } from 'react-router-dom';
import React from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from 'react-resizable';

const Pictures = () => {
    const navigate = useNavigate();

    const ResizableBox = require('react-resizable').ResizableBox;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }
    const Draggable = require('react-draggable');

    const data = JSON.parse(window.localStorage.getItem('data'))

    return (
        <div className='input-container' style={{textAlign:'left'}}>
            <div className='desc-form' style={{height: '650px'}}>
                <p className='input-title' style={{textAlign:'center', marginTop:'10px'}}>Your generated album is ready!</p>
                <p className='input-text' style={{textAlign:'center', marginTop:'10px'}}>Feel free to adjust the layout of the characters.</p>
                <div className='row' style={{overflowX:'scroll',display:'flex'}}>
                    {
                        data.map((item, index)=>(
                            <div key={index} className='column' style={{width: '30%'}}>
                                <img src={item.picture} style={{
                                    width: '260px',
                                    height: '260px',
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    margin: '15px',
                                    borderRadius: '15px'
                                }}></img>
                                <p className='input-title' style={{marginLeft: '105px', marginTop: '0px'}}>Scene#{index+1}</p>
                                <div className='row' style={{display:'flex'}}>
                                    {
                                        item['characters'].map((character,index)=>(
                                            <Draggable key={index}>
                                                <ResizableBox>
                                                    <img src={character.src} style={{width:'120px', height:'120px', opacity:'100%', backgroundColor:'rgba(0,0,0,0)'}}/>
                                                </ResizableBox>
                                            </Draggable>
                                        ))
                                    }
                                </div>
                            </div>
                            ))
                    }
                </div>
            </div>
        </div>

    );
};

export default Pictures;

