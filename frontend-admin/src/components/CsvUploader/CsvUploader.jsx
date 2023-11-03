import React from "react";

import { CSVReader } from "react-papaparse";

const buttonRef = React.createRef();

const CsvUploader = ({ setAllocators, handleFile }) => {
  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data) => {
    data = data.slice(1, data.length - 1);
    data = data.map((d) => Object.assign({}, d.data));
    console.log(data);
    handleFile && handleFile(data);
    setAllocators && setAllocators(data);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
    console.log(buttonRef);
  };

  return (
    <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      onError={handleOnError}
      noClick
      noDrag
      onRemoveFile={handleRemoveFile}
      addRemoveButton
    >
      {({ file }) => (
        <aside
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <button
            type='button'
            onClick={handleOpenDialog}
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              width: "40%",
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            Browse file
          </button>
          <div
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#ccc",
              height: 45,
              lineHeight: 2.5,
              marginTop: 5,
              marginBottom: 5,
              paddingLeft: 13,
              paddingTop: 3,
              width: "60%",
            }}
          >
            {file && file.name}
          </div>
          {/* <button
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            Remove
          </button> */}
        </aside>
      )}
    </CSVReader>
  );
};

export default CsvUploader;
