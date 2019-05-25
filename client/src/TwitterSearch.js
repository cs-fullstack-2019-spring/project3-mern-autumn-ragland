import React, {Component} from 'react';

class TwitterSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults:[],
            mappedResults:[],
        };
    }

    //search form submission handler
    searchFormSubmit = (e) =>{
        e.preventDefault();
        fetch('/users/searchTweets', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                searchBar: e.target.searchBar.value,
            })
        })
            .then((data) => data.json())
            .then((data) => {
                if (data) {
                    this.setState({searchResults:data});
                    this.mapResults()
                } else {
                    this.setState({searchResults:null});
                }
            })

    };

    //map search results
    mapResults = () => {
        let mappedResults = this.state.searchResults.map((eachTweet)=> {
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
        this.setState({mappedResults:mappedResults})
    };

    //clear the search results
    clearResults = () => {
        this.setState({mappedResults:null})
    };

    render() {
        //search results
            return (
                <div className="App">
                    <div>
                        <form className={'formStyle'} onSubmit={this.searchFormSubmit}>
                            <label htmlFor={'searchBar'}>Search: </label>
                            <input type="text" name={'searchBar'} placeholder={'search all tweets'}/>
                            <input type="submit" value={'search'}/>
                        </form>
                    </div>
                    <button onClick={this.clearResults}>Clear Results</button>
                    <br/>
                    <div className='tweetCardHome'>
                        {this.state.mappedResults}
                    </div>

                </div>
            );
    }
}

export default TwitterSearch;