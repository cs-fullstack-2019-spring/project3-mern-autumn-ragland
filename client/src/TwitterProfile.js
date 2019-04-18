import React, {Component} from 'react';

class TwitterProfile extends Component {

    //BROKEN/INCOMPLETE
    formSubmit = (e) => {
        e.preventDefault();
        fetch('/users/addTweet', {
            method:'POST',
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username:this.props.username,
                tweetMessage:e.target.tweetMessage.value,
                tweetImage:e.target.tweetImage.value,
                tweetPublic:e.target.tweetPublic.value
            })
        })
    };

    render() {
        if(this.props.isLoggedIn === true){
            return (
                <div className="App">
                    <h1>Mock Twitter {this.props.username}'s Profile</h1>
                    <h2>Add Tweet</h2>
                    <form onSubmit={this.formSubmit}>
                        <div className={'formStyle'}>
                            <label htmlFor={'tweetMessage'}>Tweet Message: </label>
                            <input type="text" id={'tweetMessage'} name={'tweetMessage'}/>
                        </div>
                        <div className={'formStyle'}>
                            <label htmlFor={'tweetImage'}>Tweet Image URL: </label>
                            <input type="password" id={'tweetImage'} name={'tweetImage'}/>
                        </div>
                        <div className={'formStyle'}>
                            <label htmlFor={'tweetPublic'}>Public Tweet: </label>
                            <input type="checkbox" name={'tweetPublic'}/>
                        </div>
                        <div className={'formStyle'}>
                            <input type="submit" value={'add tweet'}/>
                        </div>
                    </form>
                    <h3>Your Tweets</h3>
                </div>
            );
        }
        else{
            return (
                <div className="App">
                    <h3>Please Log In to View Your Profile</h3>
                </div>
            )
        }

    }
}

export default TwitterProfile;