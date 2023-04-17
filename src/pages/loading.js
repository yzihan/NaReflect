import React from "react";
import {useNavigate} from "react-router-dom";

const Loading = () => {
    const navigate = useNavigate();
    const generatePictures = ()=>{
        const style = window.localStorage.getItem('style')
        const emo = window.localStorage.getItem('emo')
        const data  = JSON.parse(window.localStorage.getItem('data'))
        let sum = 0


        for(let item of data){
            const scene = item['scene']
            const imageUrl = 'https://api.openai.com/v1/images/generations'
            fetch(imageUrl,{
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Authorization": "Bearer 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",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'prompt': 'The description of this picture is:' + scene + 'The image style is:' + style + 'The emotion of this picture is: ' + emo,
                    'n': 1,
                    "size": '1024x1024'
                })
            })
                .then(response=>response.json())
                .then((res)=>{
                    item['picture'] = res.data[0].url
                    console.log(item['picture'])
                    sum+=1
                    console.log(sum,data.length)
                    if(sum==data.length){
                        window.localStorage.setItem('data', JSON.stringify(data))
                        navigate('/pictures')
                    }
                })
        }
        console.log(data)
    }

    generatePictures()

    return (
        <div className='input-container' style={{textAlign:'left'}}>
            <div className='desc-form' style={{height: '500px', color:'#504e4a', background: 'rgb(221 179 179 / 80%)'}}>
                <p className='input-title' style={{textAlign:'center', marginTop:'160px', color:'#504e4a'}}>Generating...</p>
                <p className='input-text' style={{textAlign:'center', marginTop:'30px', color:'#504e4a'}}>This might take minutes, feel free to log out and come back again for your generated memory pictures.</p>
            </div>
        </div>
    );
};

export default Loading;
