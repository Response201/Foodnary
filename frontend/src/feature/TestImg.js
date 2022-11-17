/*eslint-disable */
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import "./TestImg.scss";
import getCroppedImg from "./cropImage";
import { useDispatch } from "react-redux";
import { ui } from "../reducers/ui";
export const TestImg = ({ preview, setImage, setImageCopped, image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const dispatch = useDispatch();
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const croppedImage = await getCroppedImg(preview, croppedAreaPixels);

        setCroppedImage(croppedImage);
        setImageCopped(croppedImage);
      } catch (e) {
        console.error(e);
      }
    },
    [croppedAreaPixels]
  );

  const ImageNull = (e) => {
    e.preventDefault();
    setImage(null);
    dispatch(ui.actions.setShowCropper(false));
  };

  return (
    <div className="crop-container">
      <div className="crop-content">
        <Cropper
          image={preview}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value);
          }}
          style={{ backgroundColor: "transparent" }}
        />
        <button className="controls___btns" onClick={showCroppedImage}>
          Save
        </button>
        <button className="controls___btns" onClick={ImageNull}>
          {" "}
          X{" "}
        </button>
      </div>
    </div>
  );
};
