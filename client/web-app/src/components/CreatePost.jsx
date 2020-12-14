import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import qs from "qs";
import callbackFromParent from "../App";
import { NavLink } from "react-router-dom";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      createdAt: "now",
      file: null,
      subreddits: [],
      selectedSubredditId: "null"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.loadSubreddits = this.loadSubreddits.bind(this);
    this.handleChangeSub = this.handleChangeSub.bind(this);
  }

  handleChange(event) {
    this.setState({
      description: event.target.value
    });
  }
  handleInputChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  componentWillMount() {
    this.loadSubreddits();
  }

  loadSubreddits() {
    axios.get("http://localhost:8080/r").then(res => {
      this.setState({ subreddits: res.data });
    });
  }

  handleSubmit(event) {
    alert("A Subreddit was submitted: " + this.state.title);
    event.preventDefault();
  }

  handleClick() {
    const instance = axios.create({
      baseURL: "http://localhost:8080/"
    });

    const { title, description, createdAt, selectedSubredditId } = this.state;
    const fd = new FormData();
    fd.append("file", this.state.file, this.state.file.name);
    console.log(fd);
    instance
      .post("post/", {
        description: description,
        title: title,
        createdAt: createdAt,
        subredditId: selectedSubredditId,
        userId: "8c12a2956b36a19fd310f4cc3e0550bc",
        file: fd
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

  fileSelectedHandler(event) {
    this.setState({ file: event.target.files[0] });
  }

  handleChangeSub(event) {
    const selected = event.target.value;
    const arr = this.state.subreddits;

    for (let sub in arr) {
      if (arr[sub].name === selected.substring(2)) {
        this.setState({ selectedSubredditId: arr[sub]._id });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <p className="title is-3 is-spaced">Create a post</p>
          <div className="field">
            <div className="control">
              <div className="select is-primary">
                <select onChange={this.handleChangeSub}>
                  <option>Choose a community</option>
                  {this.state.subreddits.map(subreddit => (
                    <option>
                      r/
                      {subreddit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="file has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="file"
                  onChange={this.fileSelectedHandler}
                />

                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload" />
                  </span>
                  <span className="file-label">Upload an Image</span>
                </span>
                <span className="file-name">{/* {this.state.file} */}</span>
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                value={this.state.title}
                className="input"
                type="text"
                onChange={this.handleInputChange}
                placeholder="Title"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              {this.imagesOver()}
              <textarea
                value={this.state.description}
                onChange={this.handleChange}
                className="textarea"
                placeholder="Text (optional)"
              />
            </div>
          </div>
          <div className="field is-grouped">
            <p className="control">
              <NavLink
                to="/r"
                onClick={this.handleClick}
                className="button is-link"
              >
                Post
              </NavLink>
            </p>
            <p className="control">
              <a className="button is-link is-inverted">Save Draft</a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  imagesOver() {
    return (
      <div className="tabs is-toggle is-toggle-rounded">
        <ul>
          <li className="is-active">
            <a>
              <span className="icon is-small">
                <i className="fas fa-image" />
              </span>
              <span>Pictures</span>
            </a>
          </li>
          <li>
            <a>
              <span className="icon is-small">
                <i className="fas fa-music" />
              </span>
              <span>Music</span>
            </a>
          </li>
          <li>
            <a>
              <span className="icon is-small">
                <i className="fas fa-film" />
              </span>
              <span>Videos</span>
            </a>
          </li>
          <li>
            <a>
              <span className="icon is-small">
                <i className="fas fa-file-alt" />
              </span>
              <span>Documents</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default CreatePost;
