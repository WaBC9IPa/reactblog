import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: null,
  loading: true,
  error: null,
};

function acceptUpdate(state, action) {
  if (!state.posts) return state;
  const posts = state.posts.map((post) => {
    if (post.id === action.post.id) return action.post;
    else return post;
  });
  return {
    ...state,
    posts,
    loading: false,
  };
}

function deletePost(state, action) {
  if (!state.posts) return state;
  const posts = state.posts.filter((post) => {
    return post.id !== action.id;
  });

  return {
    ...state,
    posts,
    loading: false,
  };
}

function createPost(state, action) {
  if (!state.posts) return state;
  const posts = state.posts.concat(action.post);
  return {
    ...state,
    posts,
    loading: false,
  };
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.SET_POSTS):
      return {...state, posts: [...action.payload], loading: false};
    case (actionTypes.SET_LOADING):
      return {...state, loading: true};
    case (actionTypes.ERROR):
      return {...state, error: action.error, loading: false};
    case (actionTypes.ACCEPT_UPDATE):
      return acceptUpdate(state, action);
    case (actionTypes.DELETE_POST):
      return deletePost(state, action);
    case (actionTypes.CREATE_POST):
      return createPost(state, action);
    default:
      return state;
  }
};
