import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";

import "../../assets/style/Card.css";

const ImageUpload = (props) => {
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);

  const fileTypes = ["image/png", "image/jpeg", "image/jpg"];

  useEffect(() => {
    if (!props.value) {
      setPreviewUrl(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(props.value);
  }, [props.value]);

  const clearImageHandler = () => {
    setPreviewUrl(null);
    setIsValid(false);
    props.fileHandler(null);
  };

  const pickedHandler = (event) => {
    let pickedFile, fileIsValid;
    if (
      event.target.files &&
      event.target.files.length === 1 &&
      fileTypes.indexOf(event.target.files[0].type) > -1
    ) {
      pickedFile = event.target.files[0];
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    if (fileIsValid) {
      setError(null);
      props.fileHandler(pickedFile);
    } else {
      setError("Please upload an image file (png, jpg or jpeg)");
    }
  };

  return (
    <React.Fragment>
      <div id="custom-file-container">
        <Form.File
          style={{ width: "60%" }}
          type="file"
          onChange={pickedHandler}
          accept=".jpg,.png,.jpeg"
          lang="en"
          custom
          isInvalid={!!error}
          feedback={error}
          label="Card Image"
          name="img-file"
        />
        <div>
          {props.value && previewUrl && isValid && (
            <div style={{ position: "relative", marginTop: "0.5rem" }}>
              <button id="card-img-clearButton" onClick={clearImageHandler}>
                x
              </button>
              <img
                src={props.value && previewUrl}
                style={{ width: "50%" }}
                alt="preview"
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImageUpload;
