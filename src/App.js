import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const App = () => {
  const [image, setImage] = useState(null);
  const [brightness, setBrightness] = useState(100); // 100% (normal brightness)

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleBrightnessChange = (e) => {
    setBrightness(e.target.value);
  };

  const imgStyle = {
    filter: `brightness(${brightness}%)`,
    height: "auto",
    width: "100%",
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Specify the accepted file types, e.g., images
  });

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Image Upload and Brightness Adjustment
      </h1>

      <div style={{ textAlign: "center" }}>
        <div>
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={handleBrightnessChange}
          />
        </div>
        <div className="dropzone-container">
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        </div>
        {image && <img src={image} alt="Uploaded" style={imgStyle} />}
      </div>
    </>
  );
};

export default App;
