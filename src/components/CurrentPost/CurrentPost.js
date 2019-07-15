import React, {Component} from 'react';
import Loader from '../UI/Loader/Loader';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/actions';

import classes from './CurrentPost.css';

class CurrentPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      redirect: false,
    };

    this.deletePostHandler = this.deletePostHandler.bind(this);
    this.updatePostHandler = this.updatePostHandler.bind(this);
    this.submitCommentHandler = this.submitCommentHandler.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
  }

  componentDidMount() {
    const id = Number(this.props.match.params.id);
    if (id === this.props.currentId && !this.props.shouldUpdate) return;
    else {
      if (this.props.shouldUpdate) this.props.onUpdated();
      this.props.onClearPost();
      this.props.onFetchPost(id);
    }
  }

  deletePostHandler(id) {
    this.props.onDeletePost(id);
    this.setState({redirect: true});
  }

  submitCommentHandler() {
    if (this.state.comment.length < 3) {
      this.setState({
        error: 'Your comment should be at least 3 characters long',
        comment: '',
      });
      return;
    }

    this.props.onPushComment({
      body: this.state.comment,
      postId: this.props.currentId,
    });
  }

  onChangeComment(e) {
    this.setState({comment: e.target.value});
  }

  updatePostHandler(id) {
    this.props.history.push(`/posts/update/${id}`);
  }

  render() {
    let post;

    if (this.props.loading) post = <Loader />;

    if (this.props.currentPost) {
      post = (
        <section className={classes.content}>
          <h2>
            {this.props.currentPost.title }
            <span style={{float: 'right'}}>
              <button
                onClick={() => {
                  this.deletePostHandler(this.props.currentPost.id);
                }}
                className={`${classes.button} ${classes.danger}`}>
                Delete
              </button>
              <button
                onClick={() => {
                  this.updatePostHandler(this.props.currentId);
                }}
                className={`${classes.button} ${classes.warning}`}>
                Update
              </button>
            </span>
          </h2>

          <p>{this.props.currentPost.body}</p>

          <section className={classes.comments}>

            <section className={classes.addComment} >
              <textarea
                onChange={this.onChangeComment}
                value={this.state.comment}
                placeholder='Enter your comment...' />
              {this.state.error
                ? <p className={classes.red}>{this.state.error}</p>
                : null}
              <button onClick={this.submitCommentHandler}>Add comment</button>
            </section>

            <hr />

            {this.props.currentPost.comments.map((comment) => {
              return (
                <div className={classes.comment} key={comment.id}>
                  <div className={classes.number}>Comment №{comment.id}</div>
                  {comment.body}
                </div>
              );
            })}
          </section>
        </section>
      );
    }

    if (this.props.error) post = <div>{this.props.error.message}</div>;

    if (this.state.redirect) post = <Redirect to="/posts" />;

    return (
      <article className={classes.currentPost}>
        {post}
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: state.current.post,
    currentId: state.current.id,
    loading: state.current.loading,
    error: state.current.error,
    shouldUpdate: state.current.shouldUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPost: (id) => {
      dispatch(actions.fetchPost(id));
    },
    onClearPost: () => dispatch(actions.clearPost()),
    onPushComment: (comment) => dispatch(actions.pushComment(comment)),
    onDeletePost: (id) => dispatch(actions.deletePost(id)),
    onUpdated: () => dispatch(actions.updated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPost);
