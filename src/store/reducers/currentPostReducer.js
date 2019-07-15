import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  post: null,
  id: null,
  shouldUpdate: false,
};

function pushComment(state, action) {
  const post = {...state.post};
  const comments = state.post.comments.concat(action.data);
  post.comments = comments;
  return {
    ...state,
    post,
  };
}


export const currentPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POST:
      return {...state, loading: false, post: action.post, id: action.post.id};
    case actionTypes.FETCH_POST:
      return {...state, loading: true};
    case actionTypes.POST_ERROR:
      return {...state, loading: false, error: action.error};
    case actionTypes.POST_CLEAR:
      return initialState;
    case actionTypes.PUSH_COMMENT:
      return pushComment(state, action);
    case actionTypes.SHOULD_UPDATE:
      return {...state, shouldUpdate: true};
    case actionTypes.UPDATED:
      return {...state, shouldUpdate: false};
    default:
      return state;
  }
};

