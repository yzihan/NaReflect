import * as vis from "vis-data";
import {Network} from "vis-network";
import React, {useEffect, useRef, useState} from "react";
import NoticeBar from "../components/noticeBar";
import {useNavigate} from "react-router-dom";
import {graph_prompt, scene_prompt} from "../prompts/generate sentence";
import connect_config from "../config.json";

const MyNetwork = ()=>{
    const dom = useRef(null)
    const [isEditing, setEditing] = useState(false)
    const [isShow, setIsShow] = useState('none')
    const [imgSrc, setImgSrc] = useState('')

    let allNodes = []
    let id = 1
    const scenarios = JSON.parse(window.sessionStorage.getItem('scenarios'))
    const mapping = {}
    for(let scenarioIdx in scenarios){
        for( let place of scenarios[scenarioIdx]['places']){
            allNodes.push({
                id: id,
                label: place,
                color: {
                    border: '#000',
                    background: '#C2EAFB',
                    highlight: {
                        border: 'gray',
                        background: '#4097be'
                    },
                    hover:{
                        border: 'gray',
                        background: '#c4dce7'
                    }
                },
                shape:'box'
            })
            id+=1
        }
        for( let character of scenarios[scenarioIdx].characters){
            allNodes.push({
                id: id,
                label: character.name,
                color: {
                    border: '#000',
                    background: '#FBC2C2',
                    highlight: {
                        border: 'gray',
                        background: '#A45757FF'
                    },
                    hover:{
                        border: 'gray',
                        background: 'rgba(246,170,170,0.59)'
                    }
                },
                shape:'circularImage',
                image: character.src
            })
            mapping[id]={
                name:character.name,
                src:character.src
            }
            id+=1
        }
    }
    const raw_nodes = new vis.DataSet(allNodes)
    const raw_edges = new vis.DataSet([])

    let graphData = {
        nodes: raw_nodes,
        edges: raw_edges
    };
    let options = {
        manipulation:{
            enabled: true,
            initiallyActive: true,
            addNode: false,
            addEdge: function (nodeData,callback){
                setEditing(true)
                document.getElementById('submit').onclick=submit.bind(this,nodeData,callback)
                document.getElementById('cancel').onclick = cancel.bind(this)
            },
            editEdge: function (nodeData,callback){
                setEditing(true)
                document.getElementById('submit').onclick=submit.bind(this,nodeData,callback)
                document.getElementById('cancel').onclick = cancel.bind(this)
            },
            deleteNode: false,
            deleteEdge: true,
            controlNodeStyle:{
            }
        }
    };
    let network = null
    useEffect(()=>{
        let container = dom.current;
        network = new Network(container, graphData, options);
        setIsShow('flex')
    },[])

    const navigate = useNavigate();

    const [newNodes, setNewNodes] = useState([])
    const [newEdges, setNewEdges] = useState([])

    const submit = (nodeData, callback)=>{
        setEditing(false)
        const newLabel = document.getElementById('labelInput').value
        document.getElementById('labelInput').value = ''
        nodeData.label= newLabel
        callback(nodeData)
        const numberOfNodes = network.body.data.nodes.length
        let new_nodes = []
        let new_edges = []
        for(let key of Object.keys(network.body.edges)){
            new_edges.push({
                'fromId': network.body.edges[key].fromId,
                'toId': network.body.edges[key].toId,
                'label': network.body.edges[key].options.label
            })
        }
        for(let n=1; n<=numberOfNodes; ++n){
            new_nodes.push({
                'id': network.body.nodes[n].options.id,
                'label': network.body.nodes[n].options.label,
            })
        }
        setNewEdges([...new_edges])
        setNewNodes([...new_nodes])
    }

    const cancel = () => {
        setEditing(false)
    }
    const data = []

    const next = ()=>{
    console.log(newEdges)
        for(let index in newEdges){
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
                    "prompt": graph_prompt + "edges: " + JSON.stringify(newEdges[index]) + 'nodes: '+ JSON.stringify(newNodes),
                    // "prompt": graph_prompt + 'edges: [{"fromId":4,"ToId":3,"label":"1. date with"},{"fromId":4,"ToId":3,"label":"2. watch movie"},{"fromId":4,"ToId":3,"label":"3. have dinner"},{"fromId":4,"ToId":1,"label":"in"},{"fromId":1,"ToId":2,"label":"at"}], nodes: [{"id":1,"label":"hotel"},{"id":2,"label":"Boston"},{"id":3,"label":"Alice"},{"id":4,"label":"Bob"}]'
                })
            })
                .then((response) => response.json())
                .then((res)=>{
                    // const edges = JSON.parse(window.localStorage.getItem('edges'))
                    let sentence =  res.choices[0].text.slice(2)
                    let tempEdge = newEdges[index]
                    tempEdge['characters'] = []
                    if(mapping.hasOwnProperty(newEdges[index].fromId)){
                        tempEdge['characters'].push(
                            {
                                'name':mapping[newEdges[index].fromId].name,
                                'src':mapping[newEdges[index].fromId].src,
                            },
                        )
                    }
                    if(mapping.hasOwnProperty(newEdges[index].toId)){
                        tempEdge['characters'].push(
                            {
                                'name':mapping[newEdges[index].toId].name,
                                'src':mapping[newEdges[index].toId].src,
                            },
                        )
                    }
                    tempEdge['sentence']= sentence
                    tempEdge['scene'] = ''
                    tempEdge['generated'] = false
                    data.push(tempEdge)
                    console.log(data)
                    if(data.length===newEdges.length){
                        window.localStorage.setItem('data', JSON.stringify(data))
                        const recordingUrl = connect_config.server_host + '/save_recording/'
                        fetch(recordingUrl,{
                            method:'POST',
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "*",
                                "Content-Type": "application/json"
                            },
                            body:JSON.stringify({
                                user:'tester',
                                data: data
                            })
                        })
                            .then((response)=>{ response.json()})
                            .then((response)=>{
                                console.log(response)
                            })
                        navigate('/interpretation')
                    }
                })
        }

    }

    return (
        <div style={{width: '100%', height:"100%", display:'flex', flexDirection:'column'}}>
            <NoticeBar content='View the key elements!'></NoticeBar>
            <div className='desc-form' style={{display:isShow, flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'100px', alignSelf:'center'}}>
                <div ref={dom} style={{width: '100%', height: '500px'}}></div>
                <div style={{display:isEditing?'flex':'none', height: '100%', width:'100%', justifyContent: 'center', alignItems: 'center',position:"fixed", left:0, top: 0}}>
                    <div className='inte-form' style={{backgroundColor:'#e1bdbc', color:'rgba(0, 0, 0, 0.6)', width: '500px', height: 'auto', padding:'20px',fontWeight:'bold'}}>
                        <p>Input the relationship between those two objects, like actions or preposition</p>
                        <input type='text' id='labelInput' className='input-box' style={{width: '100%', height:'20px', backgroundColor:'#f5deb300', fontFamily:'Zen Old Mincho', textAlign:'center', fontSize:'16px', padding:'0', border:'1px solid #00000040'}}/>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button id="submit" style={{display:'inline-block', width: '50%'}}>Submit</button>
                            <button id="cancel" style={{display:'inline-block', width: '50%'}}>Cancel</button>
                        </div>
                    </div>
                </div>
                <button className='button-dark' style={{alignSelf:'center', justifySelf:'center'}} onClick={next}>Next</button>
            </div>
            <img src={imgSrc}/>
        </div>
    )
}

export default MyNetwork;
