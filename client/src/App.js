import logo from './logo.svg';
import './App.css';
import * as fs from 'fs'
import  React, { Component } from  'react';
import Personal from './Personal';
import Upload from './Upload';

const API_URL = 'http://localhost:8000';
const axios = require('axios').default;

class Popup extends React.Component {
  //REGISTRATION
constructor(props) {
  super(props);
  this.state = {
    name:'',
    email:'',
    pas:''
  };
  //this.handleClick = this.handleClick.bind(this);
  this.register = this.register.bind(this);
  this.nameChange = this.nameChange.bind(this);

  this.emailChange = this.emailChange.bind(this);
  this.pasChange = this.pasChange.bind(this);
}
nameChange(event) {    this.setState({name: event.target.value});  }
emailChange(event) {    this.setState({email: event.target.value});  }
pasChange(event) {    this.setState({pas: event.target.value});  }
register(event){
  axios.post(API_URL+'/usercase/api/reg/',{
"username":this.state.name,
"password":this.state.pas,
"email":this.state.email
}).then(res => {
       alert("hello",res.data)
})}

 render() {
  return(<div><form onSubmit={this.register}>
     Никнейм:<input type="text" value={this.state.name} onChange={this.nameChange} />
     Почта:<input type="email" value={this.state.email} onChange={this.emailChange} />
     Пароль:<input type="password" value={this.state.pas} onChange={this.pasChange} />
     <input type="submit" value="Отправить" />
     </form></div>);  }

}
var fae=''
//console.log(coord[0]['default']['features'][50])
//console.log(coord[0]['default']['features'][51])



class App extends Component{
  //LOGIN/OUT AND COMPONENT SHOWS
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      showPopup: false,
      showImage:false,
      showAll:true,
      token:'',
      login:'',
      password:'',
      password2:'',
      email:'',
    };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.emailChange = this.emailChange.bind(this);

    this.nameChange = this.nameChange.bind(this);
    this.pasChange = this.pasChange.bind(this);
    this.pasChange2 = this.pasChange2.bind(this);
  }
emailChange(event) {    this.setState({email: event.target.value});  }
  register(event){
    if (this.state.password == this.state.password2) {
          axios.post(API_URL+'/api/registration/',{
        "username":this.state.login,
        "password":this.state.password,
        "email":this.state.email
        }).then(res => {
                //this.setState({login: event.target.value,password: event.target.value});
                console.log(this.state.login,this.state.password,this.state.email)
                this.login()
               alert("Cпасибо,что вы с нами",res.data)
        })}
    else {
    alert("Пароли не совпадают")
    }
}
  componentDidMount() {
    axios.get(this.state.value,).then(res => {
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
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      showLogin:false,
    });
  }
  toggleImage() {
    this.setState({
      showAll:false,
      showImage: true,
    });
  }

  login(event) {
  var data={"username":this.state.login,"password":this.state.password}
  console.log("data",data)
  axios.post(API_URL+'/api/auth/token/login/',data).then(res => {

      localStorage.setItem("token",res.data.auth_token)
        this.setState({
          isLoaded: true,
          token: res.data.auth_token
        });
      },
      //window.location.reload(),
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
    //event.preventDefault()
  }
  logout(){
    axios({
  method: 'post',
  url: API_URL+"/api/auth/token/logout/",
  responseType: 'stream',
  headers:{"Authorization":'Token '+localStorage.getItem("token")
  }
});

localStorage.setItem("token",'')
window.location.reload()

}
  toggleAuth() {
    this.setState({
      showLogin:!this.state.showLogin,
      showPopup:false,
    });
  }
  toggleAll() {
    this.setState({
      showAll:true,
      showImage: false,
    });
  }
  nameChange(event) {    this.setState({login: event.target.value});  }
  pasChange(event) {    this.setState({password: event.target.value});  }
  pasChange2(event) {    this.setState({password2: event.target.value});  }
render() {
  const { error, isLoaded, items } = this.state;
  console.log(localStorage.getItem("token"))
  var coord=items.data
  if (localStorage.getItem("token") ==''){
    return(<center><a href="#" onClick={this.togglePopup.bind(this)}>Зарегистрироваться</a>

        <a href="#" onClick={this.toggleAuth.bind(this)}> Войти</a>
        {this.state.showPopup ?
        <form onSubmit={this.register}>
           Никнейм:<input type="text" value={this.state.login} onChange={this.nameChange} />
           Почта:<input type="email" value={this.state.email} onChange={this.emailChange} />
           Пароль:<input type="password" value={this.state.password} onChange={this.pasChange} />
           Пароль Повторно:<input type="password" value={this.state.password2} onChange={this.pasChange2} />
           <input type="submit" value="Отправить" />
           </form> :null}
        {this.state.showLogin ?
          <div><form onSubmit={this.login}>
             Никнейм:<input type="text" value={this.state.login} onChange={this.nameChange} />
             Пароль:<input type="password" value={this.state.password} onChange={this.pasChange} />
             <input type="submit" value="Отправить" />
             </form></div> :null}</center>)
  }
  else {
  return(

  <div class="map">
  <div id="entry">

    <center>
    <a href="#" onClick={this.logout}>Выйти</a>
    &nbsp;
    &nbsp;
    &nbsp;

    <a href="#" onClick={this.toggleAll.bind(this)}> Личный кабинет</a>
    <a href="#" onClick={this.toggleImage.bind(this)}> Загрузить картинку</a>
    </center>
  </div>
  {this.state.showAll ?
  <Personal/> :null
}
{this.state.showImage ?
<Upload/> :null
}

</div>
);
}
}
}
export default App;
