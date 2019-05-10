import React, {Component} from 'react';

class EditTweet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm:true
        }
    }

    //fixme INCOMPLETE does not auto populate tweet public
    //edit tweet form submission event handler
    formSubmit = (e) => {
        e.preventDefault();
        fetch('/users/editTweet/' + this.props.userID +  '/' + this.props.tweetID, {
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
            .then(()=>this.setState({showForm:false}))
    };

    render() {
        if(this.state.showForm === true){
            return (
                <div>
                    <h2>Edit Tweet</h2>
                    <form onSubmit={this.formSubmit}>
                        <div className={'formStyle'}>
                            <label htmlFor={'tweetMessage'}>Tweet Message: </label>
                            <input className={'textBox'} type="text" id={'tweetMessage'} defaultValue={this.props.tweetMessage} name={'tweetMessage'}/>
                        </div>
                        <div className={'formStyle'}>
                            <label htmlFor={'tweetImage'}>Tweet Image URL: </label>
                            <input type="text" id={'tweetImage'} defaultValue={this.props.tweetImage} name={'tweetImage'}/>
                        </div>
                        <div className={'formStyle'}>
                            <label htmlFor={'tweetPublic'}>Public Tweet: </label>
                            <input type="checkbox" name={'tweetPublic'} defaultChecked={this.props.tweetPublic}/>
                        </div>
                        <div className={'formStyle'}>
                            <input type="submit" value={'edit tweet'}/>
                        </div>
                    </form>
                </div>
            );
        }
        else{
            return (
                <div>
                    <h3>Tweet Updated</h3>
                </div>
            )
        }

    }
}
export default EditTweet