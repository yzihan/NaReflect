import React, { useRef, useState } from "react";
import NoticeBar from "../components/noticeBar";
import {useNavigate} from "react-router-dom";

const Blocks = () => {

    const navigate = useNavigate();

    const storys = [

    ]

    const position = [
        {
            left: '425px',
            top: '115px'
        },
        {
            left: '133px',
            top: '285px'
        },
        {
            left: '133px',
            top: '608px'
        },
        {
            left: '560px',
            top: '395px'
        },
        {
            left: '910px',
            top: '400px'
        },
        {
            left: '1266px',
            top: '368px'
        },
    ]

    const navigateTo = (index)=>{
        if(index>=storys.length){
            navigate('/QA')
        }else{
            navigate('/video')
        }
    }
    return (
        <div>
            <NoticeBar content='Click on block to start or view history'></NoticeBar>
            <div>
                {
                    position.map((pos, index)=>(
                        <div
                            key={index}
                            className='pink-block'
                            style={{position:'absolute', left: pos.left, top: pos.top}}
                            onClick={()=>{
                                navigateTo(index)
                            }}
                        >
                            {
                                index<storys.length? <p><p>{storys[index]['title']}</p></p>:<p>start</p>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Blocks;

