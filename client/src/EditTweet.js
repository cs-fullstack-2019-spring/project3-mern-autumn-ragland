import React, {Component} from 'react';

class EditTweet extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    //fixme INCOMPLETE
    //edit tweet form submission event handler
    formSubmit = (e) => {
        if (e.target.tweetPublic.value === 'on') {
            this.setState({checkbox: true})
        }
        e.preventDefault();
        fetch('/users/addTweet', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.props.username,
                tweetMessage: e.target.tweetMessage.value,
                tweetImage: e.target.tweetImage.value,
                tweetPublic: this.state.checkbox,
            })
        })
            .then(() => console.log('Tweet Added'))
    };

    render() {
        return (
            <div>
                <h2>Edit Tweet</h2>
                <form onSubmit={this.formSubmit}>
                    <div className={'formStyle'}>
                        <label htmlFor={'tweetMessage'}>Tweet Message: </label>
                        <input type="text" id={'tweetMessage'} name={'tweetMessage'}/>
                    </div>
                    <div className={'formStyle'}>
                        <label htmlFor={'tweetImage'}>Tweet Image URL: </label>
                        <input type="text" id={'tweetImage'} name={'tweetImage'}/>
                    </div>
                    <div className={'formStyle'}>
                        <label htmlFor={'tweetPublic'}>Public Tweet: </label>
                        <input type="checkbox" name={'tweetPublic'}/>
                    </div>
                    <div className={'formStyle'}>
                        <input type="submit" value={'add tweet'}/>
                    </div>
                </form>
            </div>
        );
    }
}
export default EditTweet