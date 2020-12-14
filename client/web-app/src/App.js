import React, {
  Component
} from 'react'
import './App.css'
import NavBar from './components/NavBar';
import CreateSubreddit from './components/CreatePost';
import ViewPost from './components/ViewPost';
import PostComment from './components/PostComments'
import SubredditPosts from './components/SubredditPosts';
import SubredditList from './components/SubredditList';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  faStroopwafel
} from '@fortawesome/free-solid-svg-icons';



import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditList: [],
      myCallback: (dataFromChild) => {
        console.log(dataFromChild);
        this.state.subredditList.push(dataFromChild);
      }
    };
    library.add(faStroopwafel);

    //this.myCallback = this.myCallback.bind(this);
    this.loadSubredditList = this.loadSubredditList.bind(this);
  }

  componentWillMount() {
    this.loadSubredditList();
  }

  loadSubredditList() {
    axios.get('http://localhost:8080/r')
      .then(res => {
        this.setState({
          subredditList: res.data
        });
        console.log(this.state.subredditList);
      });
  }

  render() {

    return ( <
      div > < SubredditList subredditList = {
        this.state.subredditList
      }
      / > < /
      div >
    );
  }
}

export default App