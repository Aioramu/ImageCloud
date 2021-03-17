import './App.css';
import * as fs from 'fs'
import  React, { Component } from  'react';

const API_URL = 'http://localhost:8000';
const axios = require('axios').default;

class Upload extends Component{
  //DOWNLOAD IMG
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      file:null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this)
this.onChange = this.onChange.bind(this)
this.Upload = this.Upload.bind(this)
  }
  Upload(file) {
    console.log(file)
const formData = new FormData();
formData.append('image',this.state.file)
//console.log(formData)
     return (axios.post(API_URL+"/api/upload/",formData,{headers:{"Authorization":'Token '+localStorage.getItem("token"),
     'Content-Type': 'multipart/form-data'
   }}))


    /* axios({
  method: 'post',
  url: API_URL+"/api/upload/",
  responseType: 'stream',
  headers:{"Authorization":'Token '+localStorage.getItem("token"),
  'Content-Type': 'multipart/form-data'
},
  data:formData
})*/
}

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.Upload(this.state.file).then((response)=>{
      console.log("sada",response.data);
    })
  }
onChange(event) {
  this.setState({
    file: event.target.files[0]
  })
}
  render() {
    return(

      <div>
      {console.log(this.state.file)}<form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
      <p></p></div>)}
}



export default Upload;
