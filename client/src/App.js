import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import TwitterHome from "./TwitterHome";
import TwitterRegistration from "./TwitterRegistration";
import TwitterProfile from "./TwitterProfile";
import TwitterLogout from "./TwitterLogout";
import EditTweet from "./EditTweet";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username:null,
      isLoggedIn:false,
    }
  }

  userInfo = (username,isLoggedIn) =>{
    this.setState({username:username, isLoggedIn:isLoggedIn})
  };

  userLogout = () => {
    this.setState({username:null, isLoggedIn:false});
    console.log('user has been logged out')
  };

  render() {
    return (
        <Router>
          <div className="App">
            <h1>Mock Twitter</h1>
            <Link className={'linkStyle'} to={'/'}>Home</Link>
            <Link className={'linkStyle'} to={'/register'}>Register</Link>
            <Link className={'linkStyle'} to={'/profile'}>Profile</Link>
            <Link className={'linkStyle'} to={'/logout'} onClick={this.userLogout}>Logout</Link>
          </div>
          <Route path={'/'} exact component={()=> <TwitterHome username={this.state.username} isLoggedIn={this.state.isLoggedIn} userInfo={this.userInfo}/>} />
          <Route path={'/register'} component={() => <TwitterRegistration userInfo={this.userInfo} />} />
          <Route path={'/profile'} component={() => <TwitterProfile username={this.state.username} isLoggedIn={this.state.isLoggedIn}/>} />
          <Route path={'/logout'} component={()=> <TwitterLogout/>} />
          <Route path={'/edit'} component={()=> <EditTweet/>} />
        </Router>
    );
  }
}

export default App;
