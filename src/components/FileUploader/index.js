import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { uploadFile } from '../../api';

import './fileUploader.scss';
import Button from '../Button';

class FileUploader extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  onDrop = (files) => {
    this.handleFileReader(files[0]);
  };
  handleFileSelector =(e) => {
    this.handleFileReader(e.target.files[0]);
  }
  handleFileReader = (file) => {
    const type = file.type.includes('image') ? 'image' : 'video';
    const fd = new FormData();
    fd.append(type, file, file.name);
    uploadFile(fd).then(res => console.log(res));
  }
  render() {
    return (
      <div className="fileUploader">
        <div className="fileUploader--dragBox" >
          <Dropzone onDrop={this.onDrop} className="fileUploader--dragBox" >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'dropzone fileUploader--dragBox--dropSection' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
        )}
          </Dropzone>
        </div>
        <div className="fileUploader--selector">
          <Button><input type="file" name="fileForUplaod" onChange={this.handleFileSelector} /></Button>

        </div>
      </div>
    );
  }
}

export default FileUploader;
