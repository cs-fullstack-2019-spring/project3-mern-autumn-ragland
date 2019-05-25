import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";

class TwitterHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userObject: [],
            tweetArray:[],
            anotherMap:[],

            theFinalPublicMap:[],
            theFinalLoggedInMap:[],
        };
        this.tweetFetch()
    }

    //sign in form submission event handler
    formSubmit = (e) => {
        e.preventDefault();
        fetch('/users/login', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            })
        })
            .then((data) => data.text())
            .then((data) => {
                if (data) {
                    this.props.userInfo(data, true)
                } else {
                    this.props.userInfo(null, false);
                }
            })
    };

    //grab user objects
    tweetFetch = () => {
        fetch('/users/grabTweets')
            .then(data => data.json())
            .then(returnedData => this.setState({userObject: returnedData}))
            .then(() => this.mapUsersData())

    };

    //map tweets from user object
    mapUsersData = () => {
        let mappedUsers = this.state.userObject.map((eachUser) => {
            return (
                eachUser.tweets
            )
        });
        for(let i=mappedUsers.length-1; i>0; i--){
            let mappedTweets = mappedUsers[i].map((eachTweet)=>{
                return(this.state.anotherMap.push(eachTweet))
            });
            this.setState({tweetArray:mappedTweets})
        }
        this.mapAllTweets()
    };

    mapAllTweets = () => {
        let finalPublicMap = this.state.anotherMap.map((eachTweet)=>{
            if(eachTweet.tweetPublic === true){
                if(eachTweet.tweetImage){
                    return(
                        <div className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-md-4" style={{height: 25 + '%'}}>
                                    <img src={eachTweet.tweetImage} className="card-img" alt="Tweet Image"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{eachTweet.tweetMessage}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                else{
                    return(
                        <div className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <div className="card-body">
                                        <h5 className="card-title">{eachTweet.tweetMessage}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            else{
                return ('')
            }
        });
        let finalLoggedInMap = this.state.anotherMap.map((eachTweet)=>{
            if(eachTweet.tweetImage){
                return(
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-md-4" style={{height: 25 + '%'}}>
                                <img src={eachTweet.tweetImage} className="card-img" alt="Tweet Image"/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{eachTweet.tweetMessage}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <div className="card-body">
                                    <h5 className="card-title">{eachTweet.tweetMessage}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        });
        this.setState({theFinalPublicMap:finalPublicMap});
        this.setState({theFinalLoggedInMap:finalLoggedInMap})
    };

    render() {
        //logged in user display
        if (this.props.isLoggedIn === true) {
            return (
                <div className="App">
                    <div className="tweetCardHome">
                        <h3>All Tweets: </h3>
                        <hr/>
                        {this.state.theFinalLoggedInMap.slice(0,5)}
                    </div>
                </div>

            );
        }
        //not logged in user display
        else {
            return (
                <div className="App">
                    <h3>Sign In</h3>
                    <form onSubmit={this.formSubmit}>
                        <div className={'formStyle'}>
                            <label htmlFor={'username'}>Username: </label>
                            <input type="text" id={'username'} name={'username'}/>
                        </div>
                        <div className={'formStyle'}>
                            <label htmlFor={'password'}>Password: </label>
                            <input type="password" id={'password'} name={'password'}/>
                        </div>
                        <div className={'formStyle'}>
                            <input type="submit" value={'sign in'}/>
                        </div>
                    </form>
                    <div className='tweetCardHome'>
                        <h3>Public Tweets: </h3>
                        <hr/>
                        {/*{this.state.theFinalPublicMap.slice(0,5)}*/}
                        {this.state.theFinalPublicMap}
                    </div>

                </div>
            );
        }
    }
}

export default TwitterHome;