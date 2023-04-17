import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {graph_prompt, scene_prompt} from "../prompts/generate sentence";

const GeneratedContent = () => {

    const params = useParams()
    console.log('params.length', params.length)

    const navigate = useNavigate();
    const originParagraph = 'This morning was eventful from the very start. I had breakfast in the kitchen with Mike, enjoying a delicious meal and catching up on the latest news. However, my peaceful morning was interrupted when I ran into Bob on the road. We ended up having an argument that left both of us frustrated. I tried to shake it off and focus on my day, so I headed to the classroom for my next class. As I walked in, I noticed that Alice was taking an exam. I didn\'t want to disturb her, so I took a seat and quietly waited for the test to be over. It was shaping up to be quite a day, and it was only morning!'
    const [generatedParagraph, setParagraph] = useState(originParagraph)
    const [generatedSentences, setGeneratedSentences] = useState(new Array(params.length))


    // const generate = () => {
    //     const modelUrl = 'https://api.openai.com/v1/completions'
    //     fetch(modelUrl,{
    //         method:'POST',
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "*",
    //             "Authorization": "Bearer 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",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             "model": "text-davinci-003",
    //             "max_tokens": 2048,
    //             "temperature": 0,
    //             "top_p": 1,
    //             "n": 1,
    //             "stream": false,
    //             "logprobs": null,
    //             "prompt": scene_prompt + 'Alice and Xueying is preparing exams at night in a traditional university library with thousands of reference books and comfortable sofas for rest while studying'
    //         })
    //     })
    //         .then(response => response.json())
    //         .then((res)=>{
    //             console.log(res.choices[0].text)
    //             const prompt = res.choices[0].text
    //             const imageUrl = 'https://api.openai.com/v1/images/generations'
    //             fetch(imageUrl,{
    //                 method: 'POST',
    //                 headers: {
    //                     "Access-Control-Allow-Origin": "*",
    //                     "Access-Control-Allow-Methods": "*",
    //                     "Authorization": "Bearer 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",
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     'prompt': prompt,
    //                     'n': 1,
    //                     "size": '1024x1024'
    //                 })
    //             })
    //                 .then(response=>response.json())
    //                 .then((res)=>{
    //                     console.log(res)
    //                     setImgSrc(res.data[0].url)
    //                 })
    //         })
    //
    // }

    useEffect(()=>{
        const sentences = window.localStorage.getItem('sentences')
        setGeneratedSentences([...sentences.split('.').slice(0,-1)])
    }, generatedSentences)


    const saveContent = () => {
        // TODO adding a request to backend to store originParagraph and newParagraph
        const newParagraph = generatedParagraph
        navigate('/')
    }

    return(
        <div className='desc-form' style={{height: '600px'}}>
            <div style={{display: "flex", flexDirection: 'column', alignItems: 'flex-start', height: '280px', overflowY: 'scroll'}}>
                {
                    generatedSentences.map((sentence,index)=>(
                        <p key={index} style={{width:'100%', display:'flex'}}>
                            <span className='indexTag' style={{marginRight: '20px'}} >{index+1}</span>
                            <span className='generatedSentence'>{sentence + '.'}</span>
                        </p>
                    ))
                }
            </div>
            <textarea className='input-box-large' value={generatedParagraph} onChange={e => setParagraph(e.target.value.replace('\\n', '\n'))} rows='5' cols='50' placeholder='' id='desc' name='desc' />
            <button className='button-dark' onClick={saveContent}>NEXT</button>
        </div>
    )

}

export  default GeneratedContent;
