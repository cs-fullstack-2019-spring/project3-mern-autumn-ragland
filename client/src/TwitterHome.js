import React, {Component} from 'react';

class TwitterHome extends Component {


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
                }
                else{
                    this.props.userInfo(null,false)
                }
            })
    };

    render() {
        //logged in user display
        if (this.props.isLoggedIn === true) {
            console.log('Client Check: Logged in');
            return (
                <div className="App">
                    <h1>Mock Twitter</h1>
                    <h3>Five Latest Tweets</h3>
                </div>
            );
        }
        //not logged in user display
        else {
            console.log('Client Check: Not logged in');
            return (
                <div className="App">
                    <h1>Mock Twitter Sign In</h1>
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
                </div>
            );
        }


    }
}

export default TwitterHome;