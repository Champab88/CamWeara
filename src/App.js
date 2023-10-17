import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const App = () => {
  const [image, setImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

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

  const handleContrastChange = (e) => {
    setContrast(e.target.value);
  };

  const handleDownloadClick = () => {
    if (image) {
      const img = new Image();
      img.src = image;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;
          a.download = "edited_image.png";
          a.style.display = "none";

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, "image/png");
      };
    }
  };

  const imgStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
    width: "100%",
    height: "auto",
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Image Upload and Brightness/Contrast Adjustment
      </h1>

      <div style={{ textAlign: "center" }}>
        <div>
          <div>
            <label htmlFor="brightness">Brightness:</label>
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={handleBrightnessChange}
            />
          </div>
          <div>
            <label htmlFor="contrast">Contrast:</label>
            <input
              type="range"
              min="0"
              max="200"
              value={contrast}
              onChange={handleContrastChange}
            />
          </div>
        </div>
        <div className="dropzone-container">
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        </div>
        {image && (
          <div>
            <img src={image} alt="Uploaded" style={imgStyle} />
            <button onClick={handleDownloadClick}>Download Image</button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
