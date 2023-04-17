import { useNavigate } from 'react-router-dom';
import React, {useRef, useState} from "react";
import NoticeBar from "../components/noticeBar";
import check from '../components/check.png'
import cancel from '../components/cancel.png'
import add from '../components/add.png'
import profile from '../components/profile.png'
var connect_config = require('../config.json');

const QA = () => {
    const [emo, setEmo] = useState('Neutral');
    const [isAddingCharacter, setAddingCharacter] = useState(false);
    const [tempCharacter, setTempCharacter] = useState('')
    const [isAddingPlace, setAddingPlace] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tempPlace, setTempPlace] = useState('')
    const [selectedKey, setSelectedKey] = useState('scenario1')
    const [scenarios, setScenarios] = useState({
        'scenario1':{
            places: [],
            characters: [],
            emotion:''
        }
    })
    const navigate = useNavigate();

    const [userImg, setUserImg] = useState('')
    const [existingCharacters, setExistingCharacters] = useState(Array())
    const [src, setSrc] = useState('')
    const inputRef = useRef();
    const userName = window.sessionStorage.getItem('user_name')

    const uploadImg = (value)=>{
        setUserImg(value[0])
        const fileReader = new FileReader()
        fileReader.readAsDataURL(value[0])
        fileReader.onloadend = (res) => {
            setSrc(res.target.result)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setAddingCharacter(false)
        setIsLoading(true)
        const serverUrl ='http://127.0.0.1:3001/upload_photo/'
        const form = document.getElementById('form')
        const formData = new FormData(form)
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            body: formData
          })
          .then(response => response.json())
          .then(async (response) => {
              console.log(response)
              const characterName = formData.get('characterName')
              const img = response.img.src
              const src = img
              addCharacter(characterName, src)
              setTempCharacter('')
              setSrc('')
              setUserImg('')
              setIsLoading(false)
          })
    }

    const preAddCharacter = () => {
        setAddingCharacter(true)
        showPics()
    }

    const preAddPlace = () => {
        setAddingPlace(true)
    }

    const  addCharacter = async (characterName,src) => {
        scenarios[selectedKey]['characters'].push(
            {
                name:characterName,
                src: src
            })
        setAddingCharacter(false)

    }

    const addPlace = () => {
        scenarios[selectedKey]['places'].push(tempPlace)
        setAddingPlace(false)
        setTempPlace('')
    }

    const addScenario = () => {
        const name = 'scenario'+(Object.keys(scenarios).length+1)
        console.log('add scenario', name)
        const newScenarios = {...scenarios}
        newScenarios[name]={
            places: [],
            characters: [],
            emotion:''
        }
        setScenarios(newScenarios)

    }

    const addEmo = (emo) => {
        scenarios[selectedKey].emotion = emo
        setEmo(emo)
    }

    const showScenarioInfo = (key) => {
        console.log('in scenarios info, key is', key)
        setSelectedKey(key)

    }

    const addExistingCharacter = (key) => {
        const characterName = existingCharacters[key]['name']
        const src = 'data:image/png;base64,' + existingCharacters[key]['src']
        addCharacter(characterName, src)
    }

    const showPics = () => {
        let userName = window.sessionStorage.getItem('user_name')
        let url = connect_config.server_host + '/obtain_photo/?username='+userName
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const copyData=data['imgs'].slice()
                let finalData = []
                for(let img of copyData){
                    let isAdded = false
                    for(let character of scenarios[selectedKey]['characters']){
                        if(img.name===character.name){
                            isAdded = true
                        }
                    }
                    if(!isAdded){
                        finalData.push(img)
                    }
                }
                setExistingCharacters([...finalData])
            });
    }

    const finish = () => {
        window.sessionStorage.setItem('scenarios', JSON.stringify(scenarios))
        navigate('/test')
    }

    return (
        <div>
            <NoticeBar content='Start to write!'></NoticeBar>
                <div className='desc-form' style={{marginTop: '100px'}}>
                    {/*<div style={{display:'grid', gridTemplateColumns:'1fr 3fr', height: '450px'}}>*/}
                    <div style={{display:'flex', height: '450px'}}>

                        {/*<div className='column' style={{display:'flex', flexDirection:'column', borderRight: '2px dotted gray', overflowY: 'scroll'}}>*/}
                        {/*    {*/}
                        {/*        Object.keys(scenarios).map((key, index)=>(*/}
                        {/*            <span className='tag-dark scenarioTag' style={{backgroundColor:(key==selectedKey)?"rgb(64 64 84)":"#A6A6B3"}} key={index} onClick={()=>{showScenarioInfo(key)}}>{key}</span>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*    <button className='tag-dark addBtn' onClick={addScenario}>+</button>*/}
                        {/*</div>*/}

                        <div className='row' style={{marginLeft: '10px', width: '100%'}}>
                            {
                                isLoading&&
                                <p style={{position:'absolute', top:'300px', left:'0', width:'100%'}}>
                                    <span style={{backgroundColor:'#00000060', padding: '10px', color:'white', borderRadius:'15px', fontSize:'26px'}}>Abstract people from pictures. Segmenting...</span>
                                </p>
                            }
                            <div className='column' style={{width: '100%'}}>
                                <p className='input-title'>Place: List the place(s) where the experience happened.</p>
                                <div style={{display:'flex', overflowY: 'scroll', flexWrap:'wrap',height: '140px'}}>
                                    {
                                        Object.keys(scenarios).map((key,index)=>(
                                            key==selectedKey&&scenarios[key]['places'].map((place,idx)=>(
                                                <span className='tag-dark' key={idx}>{place}</span>
                                            ))
                                        ))
                                    }
                                    {
                                        isAddingPlace&&
                                        <div style={{display:'flex', alignItems:'center',margin:'10px', backgroundColor:'#757595b8', borderRadius: '15px', border: 'None', height: '50px'}} >
                                            <input className='tag-dark input-box' style={{width: '220px', backgroundColor:'#f5deb300', fontFamily:'Zen Old Mincho', textAlign:'center', fontSize:'26px', padding:'0', margin:'0', height:'30px'}} value={tempPlace} maxLength='15' onChange={e=>{setTempPlace(e.target.value)}}/>
                                            <img className='checkBtn'  src={check} style={{width: '32px', height: '32px', marginRight:'5px'}} onClick={addPlace}/>
                                            <img className='checkBtn'  src={cancel} style={{width: '32px', height: '32px', marginRight:'5px'}} onClick={()=>{setAddingPlace(false)}}/>
                                        </div>
                                    }
                                    {
                                        !isAddingPlace&&<button className='tag-dark addBtn' style={{display:'inline'}} onClick={preAddPlace}>+</button>
                                    }
                                </div>
                            </div>
                            <div className='column' style={{width: '100%'}}>
                                <p className='input-title'>Character: List one or more key people who were in the experience.</p>
                                <div style={{display:'flex', overflowX: 'scroll', paddingBottom:'15px'}}>
                                    {
                                        Object.keys(scenarios).map((key,index)=>(
                                            key==selectedKey&&Object.keys(scenarios[key]['characters']).map((subkey,idx)=>(
                                                <div style={{height:'160px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                    <span className='tag-dark' key={idx}>{scenarios[key]['characters'][subkey].name}</span>
                                                    <img src = {scenarios[key]['characters'][subkey].src?scenarios[key]['characters'][subkey].src:profile}  className="image-box" style={{objectFit:'cover', objectPosition:'0% 0%'}} />
                                                </div>
                                            ))
                                        ))
                                    }
                                    {
                                        isAddingCharacter&&
                                        <div className=' inte-form' style={{display: 'flex', justifyContent:'center', position: 'absolute',left:'20%', top:'0', width:'60%',backgroundColor:'#e1bdbc', color:'rgba(0, 0, 0, 0.6)', fontWeight:'bold'}}>
                                            <div style={{ overflowX:'scroll', position:'relative'}}>
                                                <p>Choose Characters</p>
                                                <p className='pointer' style={{position:'absolute', right:'10px', top:'-20px'}} onClick={()=>{setAddingCharacter(false)}}>x</p>
                                                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr', overflowY:'scroll', height: '250px', alignItems:'center'}}>
                                                    {
                                                        Object.keys(existingCharacters).map((key, index)=>(
                                                            <div className='pointer' key={index} style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}} onClick={(e)=>(addExistingCharacter(key))}>
                                                                <img className="image-box" src={'data:image/png;base64,'+ existingCharacters[key]['src']} style={{objectFit:'cover', objectPosition:'0% 0%'}}/>
                                                                <p>{existingCharacters[key]['name']}</p>
                                                            </div>
                                                        ))
                                                    }
                                                    <form id='form' style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                        <input ref={inputRef} type='file' accept="image/*" onChange={(e)=>{uploadImg(e.target.files)}} name='file' style={{ display: "none" }} />
                                                        {
                                                            userImg==''?
                                                                <p className="image-box pointer" onClick={()=>{inputRef.current.click()}} style={{fontSize:'24px', color:'white', paddingTop:'26px', backgroundColor: 'rgba(0,0,0,0.4)'}}>Add</p>
                                                                :
                                                                <img src={src}  className="image-box" style={{objectFit:'cover', objectPosition:'0% 0%'}} onClick={()=>{inputRef.current.click()}}/>
                                                        }
                                                        <div style={{display:'flex', alignItems:'center',marginTop:'8px', backgroundColor:'#f5deb375', width:'50%'}} >
                                                            <input className='input-box' style={{width: '80%', height:'20px', backgroundColor:'#f5deb300', fontFamily:'Zen Old Mincho', textAlign:'center', fontSize:'16px', padding:'0'}} type='text' placeholder='name' name='characterName' value={tempCharacter} onChange={e=>{setTempCharacter(e.target.value)}}/>
                                                            <input className='input-box' type='text' style={{display: 'none'}} value={userName} name='username' readOnly={true}/>
                                                            <img className='checkBtn' src={add} style={{width: '20px', height: '20px', margin:'0 5px 0 0'}} onClick={handleSubmit}/>
                                                        </div>
                                                        <div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        !isAddingCharacter&&
                                        <button className='tag-dark addBtn' style={{display:'inline'}} onClick={preAddCharacter}>+</button>
                                    }
                                </div>
                            </div>
                            {/*<div className='column' style={{width: '100%'}}>*/}
                            {/*    <p className='input-title'>Emotion: Choose the emotional tone of the experience.</p>*/}
                            {/*    <select className='dropdown' value={emo} style={{width: '100%', backgroundColor:'#757595b8', color:'white', border: 'none', outline: 'none'}}*/}
                            {/*            onChange={(e) => (addEmo(e.target.value))} id='style' name='style'>*/}
                            {/*        <option>Admiration</option>*/}
                            {/*        <option>Amusement</option>*/}
                            {/*        <option>Anger</option>*/}
                            {/*        <option>Annoyance</option>*/}
                            {/*        <option>Approval</option>*/}
                            {/*        <option>Caring</option>*/}
                            {/*        <option>Confusion</option>*/}
                            {/*        <option>Curiosity</option>*/}
                            {/*        <option>Desire</option>*/}
                            {/*        <option>Disappointment</option>*/}
                            {/*        <option>Disapproval</option>*/}
                            {/*        <option>Disgust</option>*/}
                            {/*        <option>Embarrassment</option>*/}
                            {/*        <option>Excitement</option>*/}
                            {/*        <option>Fear</option>*/}
                            {/*        <option>Gratitude</option>*/}
                            {/*        <option>Grief</option>*/}
                            {/*        <option>Joy</option>*/}
                            {/*        <option>Love</option>*/}
                            {/*        <option>Nervousness</option>*/}
                            {/*        <option>Optimism</option>*/}
                            {/*        <option>Pride</option>*/}
                            {/*        <option>Realization</option>*/}
                            {/*        <option>Relief</option>*/}
                            {/*        <option>Remorse</option>*/}
                            {/*        <option>Sadness</option>*/}
                            {/*        <option>Surprise</option>*/}
                            {/*        <option>Neutral</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <button className='button-dark' style={{alignSelf:'center', marginTop:'50px'}} onClick={finish}>Next</button>
                </div>
        </div>
    );
};

export default QA;
