import React, { Component } from "react";
import axios from "axios";
import SubredditPosts from "./SubredditPosts";
import { NavLink } from "react-router-dom";

const widthOfCards = {
  width: "60%",
  margin: "0 auto"
};

const fStyle = {
  marginBottom: "40px"
};
const heavy = {
  fontWeight: "bolder"
};

class SubredditList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subreddits: [],
      selected: {
        id: null,
        rev: null,
        name: null
      },
      post: {
        image: null,
        title: null,
        description: null,
        subredditId: null,
        createdAt: null,
        updatedAt: null
      }
    };

    this.loadSubreddits = this.loadSubreddits.bind(this);
    this.subredditClick = this.subredditClick.bind(this);
    this.loadSubredditPost = this.loadSubredditPost.bind(this);
  }

  componentWillMount() {
    this.loadSubreddits();
  }

  // componentDidMount() {
  //   this.loadSubredditPost();
  // }

  loadSubreddits() {
    axios.get("http://localhost:8080/r").then(res => {
      this.setState({ subreddits: res.data });
      //console.log(this.state.subreddits);
    });
  }

  loadSubredditPost() {
    axios
      .get("http://localhost:8080/post/" + this.state.selected.id)
      .then(res => {
        this.setState({ post: res.data });
        console.log(res.data);
      });
  }

  subredditClick(e, data) {
    // console.log(data._id);
    // console.log(data._rev);
    this.setState({
      selected: { id: data._id, rev: data._rev, name: data.name },
      post: { subredditId: data._id }
    });
  }

  render() {
    if (this.state.selected.id == null)
      return <div className="columns">{this.SubredditList()}</div>;
    else if (this.state.selected.id != null)
      return (
        <div>
          <SubredditPosts selectSub={this.state.selected} />
        </div>
      );
    else return <div>loading</div>;
  }

  SubredditList() {
    return (
      <div className="column is-four-fifths">
        <h1 className="title is-1">Subreddits</h1>
        <div className="button__container">
          <div style={widthOfCards}>
            {this.state.subreddits.map(subreddit => (
              <div
                key={subreddit._id}
                onClick={e => this.subredditClick(e, subreddit)}
                style={fStyle}
                className="card is-centered"
              >
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img
                          src="https://bulma.io/images/placeholders/96x96.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="media-content">
                      <span key={subreddit._id} style={heavy}>
                        r/
                        {subreddit.name}
                      </span>
                      <p key={subreddit.description} className="subtitle is-6">
                        {subreddit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SubredditList;
