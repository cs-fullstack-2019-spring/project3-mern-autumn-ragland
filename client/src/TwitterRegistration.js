import React, {Component} from 'react';

class TwitterRegistration extends Component {

    //unused message variable to display verification
    constructor(props) {
        super(props);
        this.state = {
            message:''
        }
    }
    //form submission event handler
    formSubmit = (e) => {
        e.preventDefault();
        fetch('/users/register', {
            method:'POST',
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username:e.target.username.value,
                password:e.target.password.value,
                profileImage:e.target.profileImage.value,
                backgroundImage:e.target.backgroundImage.value,
            })
        })
    };

    render() {
        return (
            //user registration form
            <div className="App">
                <h1>User Registration</h1>
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
                        <label htmlFor={'profileImage'}>Profile Image URL: </label>
                        <input type="text" id={'profileImage'} name={'profileImage'}/>
                    </div>
                    <div className={'formStyle'}>
                        <label htmlFor={'backgroundImage'}>Background Image URL: </label>
                        <input type="text" id={'backgroundImage'} name={'backgroundImage'}/>
                    </div>
                    <div className={'formStyle'}>
                        <input type="submit" value={'register'}/>
                    </div>
                </form>
                {this.state.message}
            </div>
        );
    }
}

export default TwitterRegistration;