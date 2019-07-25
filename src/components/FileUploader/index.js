import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import { fileUploadUrl } from '../../apiUrl';
import './fileUploader.scss';
import Button from '../Button';

class FileUploader extends Component {
  constructor() {
    super();
    this.state = {
      imageLoadedPercentage: 0,
      showPRogressBar: false,
    };
  }

  onDrop = (files) => {
    this.handleFileReader(files[0]);
  };
  handleFileSelector =(e) => {
    this.handleFileReader(e.target.files[0]);
  }
  handleFileReader = (file) => {
    this.setState({ showPRogressBar: true });
    const type = file.type.includes('image') ? 'image' : 'video';
    const fd = new FormData();
    fd.append(type, file, file.name);
    const config = {
      onUploadProgress: (progressEvent) => {
        const loadedDataPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        this.setState({ imageLoadedPercentage: loadedDataPercentage });
      },
      headers: {
        Authorization: `Client-ID ${process.env.CLIENT_ID}`,
      },
    };
    axios.post(fileUploadUrl(), fd, config).then((res) => {
      this.props.history.push(`/a/${res.data.data.id}`, { data: res.data.data, type });
    });
  }
  render() {
    console.log(this.state);
    const { imageLoadedPercentage, showPRogressBar } = this.state;
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
        {
        showPRogressBar && <Progress percent={imageLoadedPercentage} />

        }
      </div>
    );
  }
}

export default FileUploader;
