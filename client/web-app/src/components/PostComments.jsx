import React, { Component } from "react";
import axios from "axios";

const marginT = {
  marginTop: "10px"
};

class PostComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      comments: this.props.postProp,
      tAreaVis: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleClick() {
    const instance = axios.create({
      baseURL: "http://localhost:8080/",
      timeout: 1000
    });
    const { name, description } = this.state;
    instance
      .post("comment/", {
        name: name,
        description: description,
        createdAt: "now"
      })
      .then(result => {
        //handle success
        console.log("Success it posted " + result);
      })
      .catch(function(result) {
        //handle error
        console.log("The error is " + result);
      });
  }

  componentDidMount() {
    this.setState({ comments: this.props.postProp });
  }

  render() {
    return (
      <div>
        {this.props.postProp != null ? (
          this.props.postProp.map(comment => (
            <article key={comment.content} style={marginT} className="media">
              <div className="media-left">
                <span>
                  <i className="fas fa-angle-up" />
                </span>
                <br />
                <span>
                  <i className="fas fa-angle-down" />
                </span>
              </div>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>John Smith</strong> <small>@johnsmith</small>{" "}
                    <small>31m</small>
                    <br />
                    {comment.content}
                  </p>
                </div>
                <div>
                  <span
                    onClick={() =>
                      this.setState({ tAreaVis: !this.state.tAreaVis })
                    }
                  >
                    <a>
                      <span className="icon is-small">
                        <i className="fas fa-reply" />
                        {/* Reply */}
                      </span>
                    </a>
                  </span>
                  <span>
                    <a>
                      <span className="icon is-small">
                        <i className="fas fa-share-alt" />
                        {/* Share */}
                      </span>
                    </a>
                  </span>
                  {this.state.tAreaVis ? this.toggleTextArea() : <span />}
                  <PostComments postProp={comment.replies} />
                </div>
              </div>
            </article>
          ))
        ) : (
          <p />
        )}
      </div>
    );
  }

  toggleTextArea() {
    return (
      <p className="control">
        <textarea className="textarea" placeholder="What are your thoughts?" />
      </p>
    );
  }
}

export default PostComments;
