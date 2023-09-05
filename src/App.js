import './App.css';
import React, {Component} from 'react';

class RandomQuoteMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
            author: ''
        };
        this.fetchQuote = this.fetchQuote.bind(this);
    }

    componentDidMount() {
        this.fetchQuote();
    }

    fetchQuote() {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    quote: data.content,
                    author: data.author
                });
            })
            .catch(error => console.error('Error fetching quote:', error));
    }

    render() {
        const {quote, author} = this.state;
        const tweetUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;

        return (
            <div className="quote-box" id="quote-box">
                <div className="quote-text">
                    <i className="fa fa-quote-left"></i>
                    <span id="text">{quote}</span>
                </div>
                <div className="quote-author">
                    -
                    <span id="author"> {author}</span>
                </div>
                <div className="buttons">
                    <a
                        className="button"
                        id="tweet-quote"
                        href={tweetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fa fa-twitter"></i>
                    </a>
                    <button className="button" id="new-quote" onClick={this.fetchQuote}>New Quote</button>
                </div>
            </div>
        );
    }
}

export default RandomQuoteMachine;