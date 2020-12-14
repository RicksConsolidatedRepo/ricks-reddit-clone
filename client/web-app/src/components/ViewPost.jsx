import React, { Component } from "react";
import axios from "axios";
import PostComments from "./PostComments";

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      newDescription: "",
      post: "",
      editing: false,
      comment: "",
      numOfComments: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.loadSelectedPost = this.loadSelectedPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.addCommentToPost = this.addCommentToPost.bind(this);
  }

  handleChange(event) {
    this.setState({
      newDescription: event.target.value
    });
  }
  handleCommentChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  handleClick() {
    const instance = axios.create({
      baseURL: "http://localhost:8080/"
    });
    const { comment } = this.state;
    instance
      .put("comment/" + this.props.postId, comment)
      .then(result => {
        //handle success
        console.log("Success it posted " + result);
      })
      .catch(result => {
        //handle error
        console.log("The error is " + result);
      });
  }

  getNumOfComments() {
    axios
      .get(
        "http://localhost:8080/post/num_of_comments_on_post/" +
          this.state.post._id
      )
      .then(res => {
        console.log(res);
        this.setState({ numOfComments: res.data > 0 ? res.data : 0 });
      })
      .catch(res => {
        console.log(res);
      });
  }

  dropdownToggle(event) {
    var dropdown = document.querySelector(".dropdown");
    event.stopPropagation();
    dropdown.classList.toggle("is-active");
  }

  componentWillMount() {
    this.loadSelectedPost();
  }

  loadSelectedPost() {
    axios
      .get("http://localhost:8080/post/" + this.props.postId)
      .then(res => {
        this.setState({ post: res.data });
        this.setState({ description: this.state.post.description });
      })
      .then(res => {
        this.getNumOfComments();
      });
  }

  editPost() {
    this.setState({ editing: !this.state.editing });
  }

  deletePost() {
    axios
      .delete("http://localhost:8080/post/" + this.state.post._id, {
        id: this.state.post._id
      })
      .then(res => {
        console.log(res);
      });
  }

  saveChanges() {
    axios
      .put(
        "http://localhost:8080/post/" + this.props.postId,
        this.state.newDescription
      )
      .then(res => {
        console.log(res);
        this.setState({
          editing: !this.state.editing,
          description: this.state.newDescription
        });
      });
  }

  addCommentToPost(event) {
    event.preventDefault();
    axios
      .put(
        "http://localhost:8080/comment/" + this.props.postId + "/comment",
        this.state.comment
      )
      .then(res => {
        console.log(res);
        this.setState({ post: res.data, comment: "" });
        this.getNumOfComments();
      })
      .catch(error => {
        console.log(error);
      });
  }

  viewDecider() {
    let view = !this.state.editing ? (
      <div>
        <p>
          {this.state.description}
          <span className="tag is-primary"> Traveling</span>
        </p>
        <span>
          <i className="fas fa-comment-alt" /> {this.state.numOfComments}{" "}
          comment -
        </span>

        <span>
          <i className="fas fa-share" />
          Share
        </span>
        <div className="dropdown">
          <div className="dropdown-trigger">
            <button
              className="button is-text is-small"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={this.dropdownToggle}
            >
              <span>...</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a onClick={this.editPost} className="dropdown-item" href="#">
                Edit Post
              </a>
              <a
                className="dropdown-item"
                onClick={this.deletePost}
                href="http://localhost:3000/r"
              >
                Delete
              </a>
            </div>
          </div>
        </div>
        <p>comment as dmamprop</p>
        <textarea
          onChange={this.handleCommentChange}
          className="textarea"
          value={this.state.comment}
          placeholder="Text (optional)"
        />
        <div className="field is-grouped">
          <p className="control">
            <a onClick={this.addCommentToPost} className="button is-link">
              Comment
            </a>
          </p>
        </div>
      </div>
    ) : (
      <div>
        <div className="control">
          <textarea
            value={this.state.newDescription}
            className="textarea is-focused"
            type="text"
            onChange={this.handleChange}
            placeholder={this.state.post.description}
          />
          <div className="field is-grouped">
            <p className="control">
              <a className="button is-link" onClick={this.saveChanges}>
                Save changes
              </a>
            </p>
            <p className="control">
              <a href="/r" className="button" onClick={this.editPost}>
                Cancel
              </a>
            </p>
          </div>
        </div>
      </div>
    );

    return <div>{view}</div>;
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          <h1>{this.state.post.title}</h1>
          {this.viewDecider()}
          <PostComments postProp={this.state.post.comments} />
        </div>
      </div>
    );
  }
}

export default ViewPost;
