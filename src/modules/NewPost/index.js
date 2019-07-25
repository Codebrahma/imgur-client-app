import React, { Component } from 'react';
import './newPost.scss';
import Media from '../../components/Media';
import Button from '../../components/Button';
import { deleteUploadedFile } from '../../api';

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
    };
  }

  handleDeletePost = () => {
    const { deletehash } = this.props.location.state.data;
    deleteUploadedFile(deletehash).then((res) => {
      if (res.data.status === 200) {
        this.props.history.push('/');
      }
    }).catch(err => console.log(err));
  }
 
  render() {
    console.log(this.state);
    const { data } = this.props.location.state;
    return (
      <div className="newPost">
        <div>
          <textarea
            className="newPost--textArea"
            placeholder="Give your post a title."
            onChange={e => this.setState({ title: e.target.value })}
          />
          <div>
            <Media content={data} />
          </div>
          <textarea
            className="newPost--textArea"
            placeholder="Add a description."
            onChange={e => this.setState({ description: e.target.value })}
          />
        </div>
        <div>
          <Button handleClick={this.handleDeletePost} className="newPost--deleteButton" color="red" width="100%">
            Delete Post
          </Button>
        </div>
      </div>
    );
  }
}

export default NewPost;
