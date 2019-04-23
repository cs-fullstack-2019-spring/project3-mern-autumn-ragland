import React, {Component} from 'react';

class EditTweet extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    //fixme INCOMPLETE
    //edit tweet form submission event handler
    formSubmit = (e) => {
        e.preventDefault();
        fetch('/users/editTweet/:id', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tweetMessage: e.target.tweetMessage.value,
                tweetImage: e.target.tweetImage.value,
                tweetPublic:e.target.tweetPublic.checked,
            })
        })
            .then(() => console.log('Tweet Updated'))
    };

    render() {
        return (
            <div>
                <h2>Edit Tweet</h2>
                <form onSubmit={this.formSubmit}>
                    <div className={'formStyle'}>
                        <label htmlFor={'tweetMessage'}>Tweet Message: </label>
                        <input type="text" id={'tweetMessage'} value={this.props.tweetMessage} name={'tweetMessage'}/>
                    </div>
                    <div className={'formStyle'}>
                        <label htmlFor={'tweetImage'}>Tweet Image URL: </label>
                        <input type="text" id={'tweetImage'} value={this.props.tweetImage} name={'tweetImage'}/>
                    </div>
                    <div className={'formStyle'}>
                        <label htmlFor={'tweetPublic'}>Public Tweet: </label>
                        <input type="checkbox" name={'tweetPublic'}/>
                    </div>
                    <div className={'formStyle'}>
                        <input type="submit" value={'edit tweet'}/>
                    </div>
                </form>
            </div>
        );
    }
}
export default EditTweet