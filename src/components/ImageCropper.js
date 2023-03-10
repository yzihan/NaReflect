import React, { useState } from "react";
import Cropper from "react-easy-crop";

function ImageCropper({ image, onCropDone, onCropCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(3/4);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value);
  };

  return (
    <div className="input-container" style={{textAlign:'center'}} >
      <div>
        <Cropper 
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onAspectRatioChange={setAspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: "100%",
              height: "75%",
              marginTop:'20px',
              backgroundColor: "#fff",
            },
          }}
        />
      </div>

      <div style={{position:'fixed', left:'10%', top:'82%'}}>
        <div className="input-text" style={{color:'#FFFFFF'}} onChange={onAspectRatioChange}>
          <input type="radio" value={1/1} name="ratio" /> 1:1
          <input type="radio" value={3/4} name="ratio" /> 3:4
          <input type="radio" value={9/16} name="ratio" /> 9:16
          <text style={{marginLeft:'30px'}}>   Zoom </text>
            <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(e.target.value)}  class="slider" id="zoom"/>
        </div>
        <button className="button-light" onClick={onCropCancel} style={{left: '100px', marginLeft:'-0px'}}>Cancel</button>
        <button className="button-light" onClick={() => {onCropDone(croppedArea);}} style={{left: '100px', marginLeft:'30px'}}>Done</button>
      </div>
    </div>
  );
}

export default ImageCropper;