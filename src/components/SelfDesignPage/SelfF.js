import "./selfStyles.css";
import * as fabric from "fabric";
import React, { useRef, useEffect, useState, useContext } from "react";
import { Canvas, Image, Text } from "fabric";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import MainNav from "../Navs/MainNav";
import { SelfProductTypeContext } from "../../Contexts/SelfProductTypeContext";

export default function SelfF() {
  const canvasElementRef = useRef(null);
  const [canvas1, setCanvas1] = useState(null);
  const { selfProductType } = useContext(SelfProductTypeContext);

  useEffect(() => {
    if (canvasElementRef.current) {
      const initcanvas = new Canvas(canvasElementRef.current, {
        width: 800,
        height: 650,
      });

      initcanvas.backgroundColor = "";
      initcanvas.renderAll();
      console.log("Canvas initialized:", initcanvas);
      setCanvas1(initcanvas);

      return () => {
        initcanvas.dispose();
        setCanvas1(null);
      };
    }
  }, []);

  const handleAddImage = (e) => {
    if (canvas1) {
      let imgObj = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(imgObj);
      reader.onload = (e) => {
        let imageUrl = e.target.result;
        let imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.onload = function () {
          let image = new fabric.Image(imageElement);
          image.set({
            left: 100,
            top: 100,
            selectable: true, // Make it selectable
            hasControls: true, // Show resize/rotate controls
            lockScalingFlip: true, // Prevent image flipping during scaling
          });

          canvas1.add(image);
          canvas1.centerObject(image); // Centers the image on the canvas
          canvas1.setActiveObject(image); // Make the image the active object
          canvas1.renderAll();
        };
      };
    }
  };

  const addText = () => {
    const newText = new fabric.Textbox("New Text", {
      left: 200,
      top: 200,
      fontFamily: "Arial",
      fontSize: 30,
      fill: "black",
      selectable: true, // Allow text selection for modification
      width: 200, // Set width to make it more convenient for editing
    });
    canvas1.add(newText);
    canvas1.setActiveObject(newText); // Set the text object as the active object
    canvas1.renderAll();

    // Automatically make the text editable upon creation
    newText.enterEditing();
    canvas1.renderAll();
  };

  const handleSave = () => {
    if (canvas1) {
      // Convert canvas to image (data URL)
      const dataUrl = canvas1.toDataURL({
        format: "png", // You can change this to 'jpeg' or other formats
        quality: 1.0, // Set quality (only relevant for JPEG)
      });

      canvas1.renderAll();
      console.log("the URL", dataUrl);

      //   Create a temporary link element to download the image
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "canvas_image.png"; // The file name for the downloaded image
      link.click(); // Trigger the download
    }
  };

  const handleDelete = () => {
    if (canvas1) {
      const activeObject = canvas1.getActiveObject();
      if (activeObject) {
        canvas1.remove(activeObject); // Remove selected object
        canvas1.renderAll();
      }
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <MainNav isDarkMode={true} />
      <div className="Fcontainer">
        <div className="button-container">
          <input
            className="custom-file-input"
            type="file"
            accept="image/*"
            label="Add Image"
            onChange={handleAddImage}
          />
          <Button variant="contained" onClick={addText}>
            Add Text
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Link to={"/SubmitSelfDesignPage"}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ padding: "10px" }}
            >
              Submit
            </Button>
          </Link>
        </div>
        <div className="canvas-container">
          <canvas ref={canvasElementRef} />
        </div>
      </div>
    </>
  );
}
