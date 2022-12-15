/*eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../components/CreateOrChange.scss";
import { recipes } from "../reducers/recipes";
import { ui } from "../reducers/ui";
import "./ImageInput.scss";
import axios from "axios";
import { TestImg } from "./TestImg";

export const ImageInput = ({ setNext, setnewImage }) => {
  const token = useSelector((store) => store.user.token);
  const getfile = useSelector((store) => store.recipes.uploadFile);
  const getRecipeId = useSelector((store) => store.recipes.id);
  const getimage = useSelector((store) => store.recipes.image);
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState([]);
  const [preview, setPreview] = useState("");
  const [imageCopped, setImageCopped] = useState(null);
  const [placeholderImg, setPlaceholderImg] = useState("");
  const showCropper = useSelector((store) => store.ui.showCropper);
  const dispatch = useDispatch();
  const [path, setPath] = useState("");
  const handleChange = (e) => {
    setNext(true);
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (getimage && !path) {
      setPlaceholderImg(getimage);
     
    }
    dispatch(ui.actions.setShowCropper(false));
  }, [getimage]);

  useEffect(() => {
    if (image) {
     
      if (image.size > 1024 * 1024 * 3) {
        dispatch(ui.actions.setMessage("Error! Image size is to large"));
        setTimeout(() => {
          dispatch(ui.actions.setMessage(""));
        }, 15000);
        setImage(null);
      } else if (image.type.substr(0, 5) !== "image") {
        setImage(null);
        dispatch(ui.actions.setMessage("Error! Unsupported fromat"));
        setTimeout(() => {
          dispatch(ui.actions.setMessage(""));
        }, 15000);
      } else {
        dispatch(ui.actions.setMessage(""));
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      }
      dispatch(ui.actions.setShowCropper(true));
    } else if(!image){
      setImage(null);
    }
  }, [image]);

  useEffect(() => {
    if (imageCopped) {
      /* set a new placeholder image */
      setNext(true);
      var reader = new FileReader();
      reader.readAsDataURL(imageCopped);
      reader.onloadend = function () {
        const base64data = reader.result;
        setPlaceholderImg(base64data);
      };
     
      setPath(`recipe/${getRecipeId}`);
    }
  }, [imageCopped]);


useEffect(() => {
  if( path && token){
    let formData = new FormData();
    formData.append("path", path);
    formData.append("file", imageCopped);
    dispatch(ui.actions.setShowCropper(false))
    UplaodImages(formData, path, token)
    
  }

}, [ path, token])



  useEffect(() => {
    if (response) {
      const takeOutUrl = response.map((e) => {
        return e.url;
      });
      dispatch(recipes.actions.setImage(takeOutUrl[0]));
      setnewImage(takeOutUrl[0]);
      
    }
  }, [response, dispatch, setnewImage]);

  const UplaodImages = async (formData, path, token) => {
    
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}/uploadimg`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data"
            }
          }
        );
        dispatch(recipes.actions.setUploadFile(false));
        dispatch(ui.actions.setShowCropper(false));
        return setResponse(data);
      } catch (error) {
        return setResponse(error.response.data.error);
      }
  };

  return (
    <>
      {showCropper ? (
        <>
          <TestImg
            preview={preview}
            setImage={setImage}
            image={image}
            setImageCopped={setImageCopped}
          />
        </>
      ) : (
        <label class="label">
          <input
            onChange={handleChange}
            multiple={false}
            type="file"
            accept="image/*"
          />
          <div
            className="placeholder___img"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${placeholderImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              opacity: "0.3"
            }}
          />
          <span className="text___pick_newImg">
            {image ? "" : "click to pick a new image..."}
          </span>
        </label>
      )}
    </>
  );
};
