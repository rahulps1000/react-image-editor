import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faImage, faSquareXmark} from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { forwardRef, useRef, useState, useImperativeHandle } from 'react';


const ImageHolder = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({
    Save() {
      SaveImage();
    },
  }));

    const [image_path,setImage] = useState(null);
    const inputFile = useRef(null);
    const imageRef = useRef(null);

    const onButtonClick = () => {
      if (inputFile.current) {
        inputFile.current.click();
      } 
    }

  const onSelectImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const closeImage = () => {
    setImage(null);
  }

  const SaveImage = () => {
    if(image_path == null) {
      return
    }
    const canvas = document.createElement("canvas");
    canvas.width = imageRef.current.naturalWidth
    canvas.height = imageRef.current.naturalHeight
    const previewImg = document.getElementById("preview");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");
    ctx.filter = previewImg.style.filter;
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    
    a.href = canvas.toDataURL();
    a.download = new Date().getTime();
    a.click();
  }


  return (
    <div className="ImageHolder" onClick={onButtonClick}>
        {
            image_path != null ?
                <img ref={imageRef} src={image_path} alt={""} style={props.style} id="preview" onClick={SaveImage}/>
                : 
            <div className="ImageHolder_placeholder">
                <input type='file' id='file' accept="image/*" ref={inputFile} onChange={onSelectImage}/>
                <FontAwesomeIcon icon={faImage} color="#ffffff3d" />
                Browse an image
            </div>
        }
        {
            image_path != null ? <FontAwesomeIcon onClick={closeImage} className='closeicon' icon={faSquareXmark} color="#ff0000" /> : null
        }
    </div>
  );
});

export default ImageHolder;