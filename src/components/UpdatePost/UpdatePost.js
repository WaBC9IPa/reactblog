import React, {Component} from 'react';
import Loader from '../UI/Loader/Loader';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';

import classes from '../CreatePost/CreatePost.css';

class UpdatePost extends Component {
  constructor(props) {
    super(props);

    this.titleRef = React.createRef();
    this.bodyRef = React.createRef();
    this.state = {
      redirect: false,
    };

    this.onFormSubmitted = this.onFormSubmitted.bind(this);
  }

  componentDidMount() {
    const id = Number(this.props.match.params.id);
    if (id === this.props.currentId) return;
    else {
      this.props.onClearPost();
      this.props.onFetchPost(id);
    }
  }

  onFormSubmitted(e) {
    e.preventDefault();

    if (this.titleRef.current.value.length < 5) {
      this.setState({error: 'Title must be at least 5 characters long'});
      return;
    }

    if (this.bodyRef.current.value.length < 10) {
      this.setState({error: 'Body must be at least 10 characters long'});
      return;
    }


    this.props.onUpdatePost({
      id: this.props.currentId,
      title: this.titleRef.current.value,
      body: this.bodyRef.current.value,
    });

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
    let form = <div></div>;

    if (this.props.currentPost) {
      form = (
        <section>
          <h2 className={classes.heading}>
            Change the fields as you need and submit the form
          </h2>
          <form onSubmit={this.onFormSubmitted} method='POST' name='createPost'>

            <div className={classes.formGroup}>
              <label htmlFor='title'>Title of the post</label>
              <input
                id='title'
                ref={this.titleRef}
                defaultValue={this.props.currentPost.title}
                placeholder='Title...' />
            </div>


            <div className={classes.formGroup}>
              <label htmlFor='content'>Content of your post</label>
              <textarea
                id='content'
                ref={this.bodyRef}
                defaultValue={this.props.currentPost.body}
                placeholder='Content...'/>
            </div>


            <div className={classes.formGroup}>
              {this.state.error
              ? <div className={classes.red}>{this.state.error}</div>
              : null}
              <button type='Submit'>Submit</button>
            </div>

          </form>
        </section>
      );
    }

    if (this.props.loading) form = <Loader />;

    if (this.state.redirect) form = <Loader />;

    return form;
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: state.current.post,
    currentId: state.current.id,
    error: state.current.error,
    loading: state.current.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPost: (id) => {
      dispatch(actions.fetchPost(id));
    },
    onClearPost: () => dispatch(actions.clearPost()),
    onUpdatePost: (post) => dispatch(actions.updatePost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePost);
