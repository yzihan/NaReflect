import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import profile from '../components/profile.png';
import NoticeBar from "../components/noticeBar";
import {scene_prompt} from "../prompts/generate sentence";


const Interpretation = () => {

    const [data, setData] = useState(JSON.parse(window.localStorage.getItem('data')))

    const navigate = useNavigate();

    const handleSubmit = ()=>{}
    const handleMerge = (itemId)=>{
        console.log(itemId)
        let newData = []
        newData = [...data]
        newData[itemId]['sentence'] = newData[itemId]['sentence'] + newData[itemId+1]['sentence']
        for(let addingCharacter of newData[itemId+1]['characters']){
            let flag = true
            for(let existingCharacter of newData[itemId]['characters']){
                if(addingCharacter.name===existingCharacter.name){
                    flag = false
                    break
                }
            }
            if(flag){
                newData[itemId]['characters'].push(addingCharacter)
            }
        }
        newData.splice(itemId+1,1)
        console.log(newData)
        setData([...newData])
    }

    const generate = (itemId)=>{
        let newData = [...data]
        const modelUrl = 'https://api.openai.com/v1/completions'
        fetch(modelUrl,{
            method:'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "text-davinci-003",
                "max_tokens": 2048,
                "temperature": 0,
                "top_p": 1,
                "n": 1,
                "stream": false,
                "logprobs": null,
                "prompt": scene_prompt + data[itemId]['sentence']
            })
        })
            .then(response => response.json())
            .then(res=>{
                console.log(res)
                newData[itemId]['scene'] = res.choices[0].text.slice(2)
                newData[itemId]['generated']= true
                setData([...newData])
            })

    }

    const handleScene = (value,itemId)=>{
        let newData = [...data]
        newData[itemId]['scene'] = value
        setData([...newData])
    }

    const next = ()=>{
        window.localStorage.setItem('data', JSON.stringify(data))
        navigate('/generatedStyle')
    }
    const Panel = ({itemId}) => {

        return (
            <div>
                <div className='desc-form' style={{minHeight:'120px', marginTop:'0px'}}>
                    <div className='row'>
                        <div className='column' style={{width:'80%'}}>
                            <p className='input-text' style={{textAlign:'left', fontSize:'22px'}}>{data[itemId]['sentence']}</p>
                            {
                                itemId<data.size-1&&<p className='input-text' style={{textAlign:'left', color:'#777777', fontSize:'22px'}}>{data[itemId+1]['sentence']}</p>
                            }
                        </div>
                        <div className='column' style={{width:'10%'}}>
                            <button className='button-dark' type='button' onClick = {(e) => handleMerge(itemId)} style={{position: 'relative', left: '90%', top: '0px'}}>Merge</button>
                        </div>
                    </div>
                </div>
                <div className='inte-form' style={{marginTop:'30px', marginBottom:'120px'}}>
                    <div className='row'>
                        <div className='column' style={{width:'25%'}}>
                            <p className='input-title'>Character.</p>
                        </div>
                        <div className='column' style={{width:'75%'}}>
                            <p className='input-title' style={{marginLeft:'60px'}}>Scene.
                                <span style={{fontSize:'smaller'}}> <br/> Feel free to add more details for better picture generation performance.</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        {Card({itemId:itemId})}
                    </div>
                </div>
            </div>
        );
    }

    const Card = ({itemId}) => {


        return (
            <div className='row'>
                <div className='column' style={{width: '25%'}}>
                    {data[itemId]['characters'].map((character, index)=>(
                        <div className='charWithPic' key={index}>
                            <img className='image-box' style={{objectFit:'cover', objectPosition:'0% 0%'}} src={character.src}/>
                            <p className='input-box'>{character.name}</p>
                        </div>
                    ))}
                </div>
                <div className='column' style={{width: '60%'}}>

                    {
                        data[itemId]['generated']?<textarea className='input-box-large' value={data[itemId]['scene']} rows='5' cols='50'
                                                             style={{marginLeft: '60px', width: '100%', height: '127px'}}
                                                             onChange={(e) => handleScene(e.target.value, itemId)} type='text'/>
                            :
                            <button className='button-dark' style={{marginLeft:'60px'}} onClick={()=>{generate(itemId)}}>generate</button>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='input-container' onSubmit={handleSubmit}>
            <NoticeBar content='Please describe your experience'></NoticeBar>
            <div className='row' style={{height:'550px', width:'1200px', marginTop:'20%', paddingTop:'-200px', marginBottom:'10%', overflow:'scroll'}}>
                {data.map((edge, index) => (
                    <div key={index}>{Panel( {itemId:index}) }</div>
                ))}
            </div>
            <button  className='button-dark' style={{position:'fixed', right:'20%', bottom:'50px'}} onClick={next}>NEXT</button>
        </div>
    );
};


export default Interpretation;
