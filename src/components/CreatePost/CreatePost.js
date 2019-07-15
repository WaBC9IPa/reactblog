import React, {Component} from 'react';
import Loader from '../UI/Loader/Loader';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';
import classes from './CreatePost.css';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      error: null,
      redirect: false,
    };

    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onBodyChanged = this.onBodyChanged.bind(this);
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
  }

  onTitleChanged(e) {
    this.setState({title: e.target.value});
  }

  onBodyChanged(e) {
    this.setState({body: e.target.value});
  }

  onFormSubmitted(e) {
    e.preventDefault();

    if (this.state.title.length < 5) {
      this.setState({error: 'Title must be at least 5 characters long'});
      return;
    }

    if (this.state.body.length < 10) {
      this.setState({error: 'Body must be at least 10 characters long'});
      return;
    }

    this.props.onSendPost(this.state.title, this.state.body);
    this.redirect();
  }

  redirect() {
    const historyPush = this.props.history.push.bind(this);
    this.setState({redirect: true});
    setTimeout(() => {
      historyPush('/posts');
    }, 1000);
  }


  render() {
    let form = (
      <section>
        <h2 className={classes.heading}>
            Fill in all fields and submit the form
        </h2>
        <form onSubmit={this.onFormSubmitted} method='POST' name='createPost'>

          <div className={classes.formGroup}>
            <label htmlFor='title'>Title of the post</label>
            <input id='title'
              value={this.state.title}
              onChange={this.onTitleChanged}
              placeholder='Title...' />
          </div>

          <div className={classes.formGroup}>
            <label htmlFor='content'>Content of your post</label>
            <textarea id='content'
              value={this.state.body}
              onChange={this.onBodyChanged}
              placeholder='Content...'/>
          </div>

          <div className={classes.formGroup}>
            {
              this.state.error
              ? <div className={classes.red}>{this.state.error}</div>
              : null
            }
            <button type='Submit'>Submit</button>
          </div>

        </form>
      </section>
    );

    if (this.state.redirect) form = <Loader />;

    return form;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSendPost: (title, body) => dispatch(actions.sendPost(title, body)),
  };
};

export default connect(null, mapDispatchToProps)(CreatePost);
