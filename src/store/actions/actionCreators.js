import * as actionTypes from './actionTypes';
import axios from '../../axios-blog';

export function postsInit() {
  return (dispatch) => {
    dispatch({type: actionTypes.SET_LOADING});
    axios.get('/posts')
        .then(({data}) => {
          dispatch({
            type: actionTypes.SET_POSTS,
            payload: data,
          });
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.ERROR,
            error: err.message,
          });
        });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    dispatch({type: actionTypes.FETCH_POST});
    axios.get(`/posts/${id}?_embed=comments`)
        .then(({data}) => {
          dispatch({
            type: actionTypes.SET_POST,
            post: data,
          });
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.POST_ERROR,
            error: err,
          });
        });
  };
}

export function clearPost() {
  return {
    type: actionTypes.POST_CLEAR,
  };
}

export function pushComment(comment) {
  return (dispatch) => {
    axios.post('/comments', {
      postId: comment.postId,
      body: comment.body,
    }).then(({data}) => {
      dispatch({
        type: actionTypes.PUSH_COMMENT,
        data,
      });
    }).catch((err) => {
      dispatch({
        type: actionTypes.POST_ERROR,
        error: err.message,
      });
    });
  };
}

export function updatePost(post) {
  return (dispatch) => {
    dispatch({type: actionTypes.SET_LOADING});
    dispatch({type: actionTypes.SHOULD_UPDATE});
    axios.put(`/posts/${post.id}`, {
      title: post.title,
      body: post.body,
    }).then(({data}) => {
      dispatch({
        type: actionTypes.ACCEPT_UPDATE,
        post: data,
      });
    }).catch((err) => {
      dispatch({
        type: actionTypes.ERROR,
        error: err,
      });
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    dispatch({type: actionTypes.SET_LOADING});
    axios.delete(`/posts/${id}`).then(() => {
      dispatch({type: actionTypes.DELETE_POST, id: id});
    }).catch((err) => {
      dispatch({type: actionTypes.ERROR, error: err});
    });
  };
}

export function sendPost(title, body) {
  return (dispatch) => {
    axios.post('/posts', {title, body}).then(({data}) => {
      dispatch({type: actionTypes.SET_LOADING});
      dispatch({
        type: actionTypes.CREATE_POST,
        post: data,
      });
    });
  };
}

export function updated() {
  return {
    type: actionTypes.UPDATED,
  };
}


