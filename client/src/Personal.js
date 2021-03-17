import './App.css';
import * as fs from 'fs'
import  React, { Component } from  'react';
//FORM FOR CHANGE IMG AND SHOW ALL IMG
const API_URL = 'http://localhost:8000';

const axios = require('axios').default;

class Personal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: "",
      edit:false,
      history:false,
      id:"",
      file:"",
    };
    this.onFormSubmit = this.onFormSubmit.bind(this)
this.onChange = this.onChange.bind(this)
this.Upload = this.Upload.bind(this)
  }
  componentDidMount() {
    axios({
  method: 'get',
  url: API_URL+"/api/lk/",
  responseType: 'stream',
  headers:{"Authorization":'Token '+localStorage.getItem("token")
  }
}).then(res => {
  //console.log(res)
          this.setState({
            isLoaded: true,
            items: res.data
          });
        },

        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          //console.log(this.state.items);
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  Upload(file) {
var formData = new FormData();
formData.append('id',Number(this.hiddenInput.value))
formData.append('image',this.state.file)
console.log(formData)
     return (axios.post(API_URL+"/api/lk/",formData,{headers:{"Authorization":'Token '+localStorage.getItem("token"),
     'Content-Type': 'multipart/form-data'
   }}))
   window.location.reload()
 }
  onFormSubmit(e){
     //e.preventDefault() // Stop form submit
     this.Upload(this.state.file).then((response)=>{
     })
   }
 onChange(event) {
   this.setState({
     file: event.target.files[0]
   })
 }
 toggleEdit(){
   this.setState({
     edit:!this.state.edit,
   })
 }
 toggleHis() {this.setState({
   hist:!this.state.history,
 })
}
  render() {
    const items = this.state.items.data
    if (this.state.items!=""){
    return( <div>        <ul>
      <button href="#" onClick={this.toggleEdit.bind(this)}>Изменить</button>
      <button href="#" onClick={this.toggleHis.bind(this)}>История</button>
          {this.state.items.data.map(item => (
            <li key={item.id}>
              {console.log(item.history)}
              Путь: /media/{item.path} Дата публикации: {item.pub_date}
              {this.state.hist ? <ul>{item.history.map(h=>(<li>{h.value} {h.date}</li>))}</ul> :null}

              {this.state.edit ?
              <form onSubmit={this.onFormSubmit}>
              <input type="hidden" name="hidename" value={item.id} ref={(input) => { this.hiddenInput = input }} />
                <input type="file" onChange={this.onChange} />
                <button type="submit">Отправить</button>
              </form> :null}
            </li>
          ))}
        </ul></div>)}
    else {
      return(<div></div>)
    }
}
}

export default Personal;
