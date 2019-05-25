import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import TwitterHome from "./TwitterHome";
import TwitterRegistration from "./TwitterRegistration";
import TwitterProfile from "./TwitterProfile";
import EditTweet from "./EditTweet";
import TwitterSearch from "./TwitterSearch";
import '../node_modules/bootstrap/dist/css/bootstrap.css';

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
  };

  render() {
      if(this.state.username){
          return (
              <Router>
                  <div className='nav-fill'>
                      <div className="nav-item">
                          <h2>Mock Twitter</h2>
                          <Link className={'linkStyle'} to={'/'}>Home</Link>
                          <Link className={'linkStyle'} to={'/searchTweets'}>Search</Link>
                          <Link className={'linkStyle'} to={'/profile'}>Profile</Link>
                          <Link className={'linkStyle'} to={'/'} onClick={this.userLogout}>Logout</Link>
                      </div>
                  </div>

                  <Route path={'/'} exact component={()=> <TwitterHome username={this.state.username} isLoggedIn={this.state.isLoggedIn} userInfo={this.userInfo}/>} />
                  <Route path={'/profile'} component={() => <TwitterProfile username={this.state.username} isLoggedIn={this.state.isLoggedIn}/>} />
                  <Route path={'/searchTweets'} component={()=> <TwitterSearch/>} />
                  <Route path={'/editTweet/:id/:tweetId'} component={()=> <EditTweet/>} />
              </Router>
          );
      }
      else{
          return (
              <Router>
                  <div className='nav-fill'>
                      <div className="nav-item">
                          <h2>Mock Twitter</h2>
                          <Link className={'linkStyle'} to={'/'}>Home</Link>
                          <Link className={'linkStyle'} to={'/searchTweets'}>Search</Link>
                          <Link className={'linkStyle'} to={'/register'}>Register</Link>
                      </div>
                  </div>

                  <Route path={'/'} exact component={()=> <TwitterHome username={this.state.username} isLoggedIn={this.state.isLoggedIn} userInfo={this.userInfo}/>} />
                  <Route path={'/register'} component={() => <TwitterRegistration userInfo={this.userInfo} />} />
                  <Route path={'/searchTweets'} component={()=> <TwitterSearch/>} />
              </Router>
          );
      }

  }
}

export default App;
