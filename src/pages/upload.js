import React, {useState, useRef} from "react";

const Upload = () => {
    const [userImg, setUserImg] = useState('')
    const [userName, setUserName] = useState('')
    const [src, setSrc] = useState('')
    const inputRef = useRef();

    const uploadImg = (value)=>{
        console.log(value)
        setUserImg(value[0])
        const fileReader = new FileReader()
        fileReader.readAsDataURL(value[0])
        fileReader.onloadend = (res) => {
            console.log(res.target.result)
            setSrc(res.target.result)
        }
    }


    return (
        <form className='column inte-form' action='http://127.0.0.1:3001/upload_photo/' method='post' encType='multipart/form-data' style={{width:'40%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', position:'absolute', backgroundColor:'white'}}>
            <input ref={inputRef} type='file' accept="image/*" onChange={(e)=>{uploadImg(e.target.files)}} name='file' style={{ display: "none" }} />
            {
                userImg==''?
                    <p className="image-box pointer" onClick={()=>{inputRef.current.click()}} style={{fontSize:'24px', color:'white', paddingTop:'34px', backgroundColor: 'rgba(0,0,0,0.4)'}}>Photo</p>
                    :
                    <img src={src}  className="image-box" style={{objectFit:'cover', objectPosition:'0% 0%'}}/>
            }
            <input className='input-box' type='text' style={{width: '80%'}} onChange={(e)=>{setUserName(e.target.value)}} name='username'/>
            <button type='submit' className='button-dark'>Submit</button>
        </form>
        )
}

export default Upload;
