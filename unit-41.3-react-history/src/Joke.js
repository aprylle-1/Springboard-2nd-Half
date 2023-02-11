import React from "react";
import "./Joke.css";

class Joke extends React.Component {
  constructor (props) {
    super(props)
  }

  upvote () {
    this.props.vote(this.props.id, +1)
  }

  downvote () {
    this.props.vote(this.props.id, -1)
  }

  render() {
    const bindedUpvote = this.upvote.bind(this)
    const bindedDownvote = this.downvote.bind(this)
    return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={bindedUpvote}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={bindedDownvote}>
          <i className="fas fa-thumbs-down" />
        </button>

        {this.props.votes}
      </div>

      <div className="Joke-text">{this.props.text}</div>
    </div>
    )
  }
}

export default Joke;
