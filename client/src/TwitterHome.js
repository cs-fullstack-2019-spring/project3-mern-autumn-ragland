import React, {Component} from 'react';

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

    //form submission event handler
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
        for(let i=0; i<mappedUsers.length; i++){
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
                return(
                    <div key={eachTweet._id} className={'tweetGrid'}>
                        <p className={'tweetMessage'}>{eachTweet.tweetMessage}</p>
                        <img className={'tweetImage'} src={eachTweet.tweetImage} alt=""/>
                    </div>
                )
            }
        });
        let finalLoggedInMap = this.state.anotherMap.map((eachTweet)=>{
                return(
                    <div key={eachTweet._id} className={'tweetGrid'}>
                        <p className={'tweetMessage'}>{eachTweet.tweetMessage}</p>
                        <img className={'tweetImage'} src={eachTweet.tweetImage} alt=""/>
                    </div>
                )
        });
        this.setState({theFinalPublicMap:finalPublicMap});
        this.setState({theFinalLoggedInMap:finalLoggedInMap})
    };

    render() {
        //logged in user display
        if (this.props.isLoggedIn === true) {
            return (
                <div className="App">
                    <div>
                        <form className={'formStyle'}>
                            <label htmlFor={'searchBar'}>Search: </label>
                            <input type="text" name={'searchBar'} placeholder={'search all tweets'}/>
                        </form>
                    </div>
                    <h3>All Tweets: </h3>
                    <hr/>
                    {this.state.theFinalLoggedInMap}
                </div>
            );
        }
        //not logged in user display
        else {
            return (
                <div className="App">
                    <div>
                        <form className={'formStyle'}>
                            <label htmlFor={'searchBar'}>Search: </label>
                            <input type="text" name={'searchBar'} placeholder={'search all tweets'}/>
                        </form>
                    </div>
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
                    <h3>Public Tweets: </h3>
                    <hr/>
                    {this.state.theFinalPublicMap}
                </div>
            );
        }
    }
}

export default TwitterHome;