import React from "react";
import { CardBody, CardHeader, Button } from "reactstrap";

const FileUpload = props => {
  const handlePost = () => {
    props.uploadFile(props.currentFile, props.currentValues);
  };

  const loading = e => {
    props.loadFile(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={loading} />
      <span>
        <Button
          color="primary"
          size="sm"
          className=" float-right"
          onClick={handlePost}
        >
          Upload
        </Button>
      </span>
     
    </div>
  );
};

export default FileUpload;
