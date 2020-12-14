import React, { Component } from "react";
import axios from "axios";
import App from "../App";
import ViewPost from "./ViewPost";

const widthOfCards = {
  width: "60%",
  margin: "0 auto"
};

const fStyle = {
  marginBottom: "40px"
};

class SubredditPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditPostsList: [],
      postId: null
    };

    this.loadSubredditPosts = this.loadSubredditPosts.bind(this);
  }

  componentWillMount() {
    this.loadSubredditPosts();
  }

  loadSubredditPosts() {
    axios
      .get(
        "http://localhost:8080/post/by_subredditId/" + this.props.selectSub.id
      )
      .then(res => {
        this.setState({ subredditPostsList: res.data });
        console.log(this.state.subredditPostsList);
      });
  }

  postClick(e, data) {
    this.setState({
      postId: data._id
    });
  }

  render() {
    if (this.state.postId == null) return this.ViewPostList();
    else if (this.state.postId != null)
      return (
        <div>
          <ViewPost postId={this.state.postId} />
          {console.log(this.state.postId)}
        </div>
      );
    else return <div>loading</div>;
  }

  ViewPostList() {
    return (
      <div>
        <h1 className="title is-1">{this.props.selectSub.name}</h1>
        <div style={widthOfCards}>
          {this.state.subredditPostsList.map(post => (
            <div
              onClick={e => this.postClick(e, post)}
              style={fStyle}
              className="card is-centered"
              key={post._id}
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
                    <span key={post._id}>Posted by Darren 12 hours ago</span>
                    <p key={post.title}>{post.title}</p>
                    <div key={post.description} className="content">
                      {post.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SubredditPosts;
