import { Link as RouterLink, useNavigate} from 'react-router-dom';
import React, { useRef, useState } from "react";
import FileInput from "../components/FileInput";
import ImageCropper from "../components/ImageCropper";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import map from "lodash/map";
import range from "lodash/range";
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';
import edit from '../components/pencil.png';
import man from '../components/man.jpg';


const Account = (props) => {
    const items=['Item 1', 'Item 2', 'Item 3'];
    const dream_titles = ['Party', 'No bustle', 'Bitten'];
    const dream_descriptions = ['I find myself on a beach, with many beachfront mansions nearby. My friends and I decide we ...',
                                'In my dream, as usual, I woke up early. I had breakfast. I came out of the door with ...',
                                'It was like the zombie apocalypse but slower, calmer. Everyone was sequestered into ...'];
    const [names, setNames] = useState(['']);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('output'+e);
    }

    const [images, setImages] = useState(['']);
    const [currentId, setCurrentId] = useState(0);
    const [currentPage, setCurrentPage] = useState(-1); //choose-img:-1, crop-img: idx
    const [imgAfterCrops, setImgAfterCrops] = useState(['']);
    // Invoked when new image file is selected
    const onImageSelected = (selectedImg, itemId) => {
        const newImages = images.map((s,i) => {if(i===itemId){return selectedImg;}else{return s;}});
        setImages(newImages);
        setCurrentPage(itemId);
    };

    // Generating Cropped Image When Done Button Clicked
    function onCropDone(imgCroppedArea, itemId) {
        //alert('oncropdone page:'+currentPage);
        const canvasEle = document.createElement("canvas");
        canvasEle.width = imgCroppedArea.width;
        canvasEle.height = imgCroppedArea.height;

        const context = canvasEle.getContext("2d");

        let imageObj1 = new Image();
        imageObj1.src = images[itemId];
        imageObj1.onload = function () {
        context.drawImage(
            imageObj1,
            imgCroppedArea.x,
            imgCroppedArea.y,
            imgCroppedArea.width,
            imgCroppedArea.height,
            0,
            0,
            imgCroppedArea.width,
            imgCroppedArea.height
        );

        const dataURL = canvasEle.toDataURL("image/jpeg");
        /*
        var a = document.createElement('a');
        a.href = dataURL;
        a.download = '../test_img.png';
        document.body.appendChild(a);
        a.click();*/
        const newImgAfterCrops = imgAfterCrops.map((s,i) => {if(i===currentPage){return dataURL;}else{return s;}});
        setImgAfterCrops(newImgAfterCrops);
        //alert('oncropdone:'+currentPage)
        setCurrentPage(-1);
        
        };
    };

    // Handle Cancel Button Click
    function onCropCancel(itemId) {
        setCurrentPage(-1);
        const newImages = images.map((s,i) => {if(i===itemId){return '';}else{return s;}});
        setImages(newImages);
    };

    const inputRef = useRef();

    function handleOnChanges(e, itemId) {
        if (e && e.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(e[0]);
        
        reader.onload = function () {
            onImageSelected(reader.result, itemId);
        };
        }
    };

    const onChooseImg = () => {
        inputRef.current.click();
    };

    const addChar = () => {
        
        setNames([...names, '']);
        setImages([...images, '']);
        setImgAfterCrops([...imgAfterCrops, '']);
        
    }



    function handleNames(e, itemId) {
        const newNames = names.map((s,i) => {if(i===itemId){return e;}else{return s;}});
        setNames(newNames);
    }


    const DreamCard = ({itemId}) => {
        //alert('id:'+id.target);
        //const itemId = '0';
        //alert(dream_titles[itemId]);

        return (
            <div className='column' style={{minHeight:'60px', width:'30%', textAlign:'left',}}>
                <form className='dream-file' >
                    <text className='input-title' style={{textAlign:'left'}}>{dream_titles[itemId]}</text>
                    <img src={edit} style={{width:'22%', height:'22%', opacity:'80%', backgroundColor:'rgba(0,0,0,0.2)', borderRadius:'10px', padding:'3px', transform:'translate(120px,-25px)'}}/>
                    <text className='input-text' style={{textAlign:'left', marginTop:'-15px', fontSize:'18px', color:'#777777', lineHeight:'115%'}}>{dream_descriptions[itemId]}</text>
                    
                    
                </form>
            </div>
        );
    }

    const CharCard = ({itemId}) => {
        return (
            <div class='row' style={{textAlign:'center', }}>
                <form className='dream-file' style={{height:'110px', width:'110px'}}>
                </form>
                <text className='input-title' style={{color:'#FFFFFF'}}>Char {itemId}</text>
            </div>
        )
    }


    const CharImgCard = ({itemId}) => {
        var top_offset = Math.floor(itemId/3) * 160+130;
        //alert(itemId+', '+currentId);
        //setCurrentId(itemId);
        //alert(itemId)
        return (
        <div>
            <div className="input-container" style={{ height:'400px', width:'400px', position:'fixed', top:'20%'}}>
            <div class='row' style={{textAlign:'center', }}>
                <div>
                <input type="file" accept="image/*" ref={inputRef} onChange={(e) => handleOnChanges(e.target.files, itemId)} style={{ display: "none" }}  />
                {imgAfterCrops[itemId] === ''? (
                    <button className="image-box" style={{position:'fixed', top:top_offset, fontSize:'24px', color:'#777777', paddingLeft:'26px', paddingTop:'34px', backgroundColor: 'rgba(0,0,0,0.4)'}}>Photo</button>
                ): (
                    <img src={imgAfterCrops[itemId]}  className="image-box" style={{position:'fixed', top:top_offset.toString()+'px', objectFit:'cover', objectPosition:'0% 0%'}}/>
                )}
                <button className="image-box" onClick={onChooseImg} style={{position:'fixed', top:top_offset.toString()+'px', backgroundColor: 'rgba(0,0,0,0)'}}></button>
                </div>
            <input className='input-box' type='text' style={{color:'#FFFFFF', backgroundColor: 'rgba(0,0,0,0)', border:'None', position:'relative', top:(top_offset-45).toString()+'px', textAlign:'center', left:'-125px', width:'160px', marginTop:'0px'}} value={names[itemId]} placeholder='Name' onChange={(e) => handleNames(e.target.value, itemId)} />
            </div>
            </div>
        </div>
        )
    }

    return (
        <div className='input-container' style={{textAlign:'left'}}>
            <div className='column' style={{width:'50%', textAlign:'left', }} onSubmit={handleSubmit}>
                <div className='header' style={{position:'fixed', width:'1100px'}} >
                    <label className='h3-light'>Want to have a new dream journey?</label>
                    <button className='button-light' onClick={() => navigate("/description")} style={{position: 'relative', left: '70px', top: '120px'}}>Start</button>
                    <button className='button-light' onClick={() => navigate("/login")} style={{position: 'relative', left: '70px', top: '120px', marginLeft:'30px'}}>Logout</button>
                </div>

                <div class='inte-form' style={{height:'500px', width:'500px', marginTop:'250px', marginBottom:'100px', overflow:'scroll'}}>
                <label className='input title' style={{textAlign:'center', fontSize:'30px'}}>Dream Gallery.</label>
                <div class='row' style={{textAlign:'left', }}>
                    {items.map((item, index) => (
                       
                        <div className='column' style={{minHeight:'60px', width:'50%', textAlign:'left',}}>{DreamCard( {itemId:index}) }</div>
                       
                    ))}
                     </div>
                </div>
            </div>

            <div  className='column' style={{width:'50%', textAlign:'right', transform:'translate(9%, 0)'}} onSubmit={handleSubmit}>
            
            <div class='inte-form' style={{background: 'rgba(0,0,0, 0.5)', height:'700px', width:'500px', paddingTop:'20px', marginTop:'50px', marginBottom:'100px', overflow:'scroll'}}>
            <label className='input title' style={{textAlign:'center', fontSize:'30px', color:'#FFFFFF', marginBottom:'20px'}}>Character Portraits.</label>
                <div class='row'>
                    {names.map((item, index) => (
                        <div className='column' style={{minHeight:'60px', width:'33%', textAlign:'left',}}>{CharImgCard( {itemId:index}) }</div>
                    ))}
                </div>
                {currentPage !== -1 ? (
                    <div className="input-container" style={{position:'absolute', height:'650px', width:'450px', marginTop:'100px', marginBottom:'100px',textAlign:'center', transform:'translate(-2%, -12%)'}}>
                    <ImageCropper
                    image={images[currentPage]}
                    onCropDone={(e) => onCropDone(e, currentPage)}
                    onCropCancel={(e) => onCropCancel(currentPage)}
                    />
                    </div>
                ):(<></>) }
                {currentPage === -1 ?(<button type='button' className='button-light' onClick={() => addChar()} style={{position: 'absolute', left: '40%', top: '75%', marginLeft:'30px'}}>Add</button>):(<></>)}
            </div>

            </div>
        </div>
    );
};

export default Account;

/*}*/