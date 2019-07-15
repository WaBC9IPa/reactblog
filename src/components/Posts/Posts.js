import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Post from './Post/Post';
import Loader from '../UI/Loader/Loader';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';

import classes from './Posts.css';

class Posts extends Component {
  componentDidMount() {
    if (!this.props.posts) {
      this.props.onPostsInit();
    }
  }

  render() {
    let posts = null;

    if (this.props.posts) {
      posts = this.props.posts.map((post) => {
        return (<Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.body.slice(0, 10)} />);
      });
    }

    if (this.props.loading) posts = <Loader />;

    if (this.props.error) {
      posts = (<div className={classes.red}>{this.props.error}</div>);
    }


    return (
      <Fragment>
        <div className={classes.header}>
          <div className={classes.info} >List of all posts</div>
          <button className={classes.button}>
            <Link to='/posts/create'>+ NEW</Link>
          </button>
        </div>
        <section className={classes.posts}>
          {posts}
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading,
    error: state.posts.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostsInit: () => dispatch(actions.postsInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

