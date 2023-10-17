import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #ffb6c1, #add8e6);
  border: 1px solid #ddd;
  border-radius: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
  font-size: 16px;
  width: 80%;
  height: 800px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 16px 32px;
  cursor: pointer;
  font-size: 26px;
  text-align: center;
  margin: 0 auto;
`;

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
    maxWidth: "50%",
    maxHeight: "50%",
    borderRadius: "14px",
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container>
      <Card>
        <h1 style={{ fontSize: "44px", fontFamily: "sans-serif" }}>
          Image Upload and Brightness/Contrast Adjustment
        </h1>
        <div>
          <div style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
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
            <label
              htmlFor="contrast"
              style={{ fontSize: "20px", fontFamily: "sans-serif" }}
            >
              Contrast:
            </label>
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
            <p style={{ fontSize: "28px", fontFamily: "cursive" }}>
              Drag & drop an image here, or click to select one
            </p>
          </div>
        </div>
        {image && (
          <div>
            <img src={image} alt="Uploaded" style={imgStyle} />
            <div style={{ textAlign: "center" }}>
              <Button onClick={handleDownloadClick}>Download Image</Button>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default App;
