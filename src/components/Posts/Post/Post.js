import React from 'react';

import {Link} from 'react-router-dom';

import classes from './Post.css';

function post(props) {
  return (
    <article className={classes.post}>
      <h2>{props.title}</h2>
      <div>
        <p>
          {props.content}...
          <Link to={`/posts/${props.id}`}>Read more..</Link>
        </p>
      </div>
    </article>
  );
}

export default post;
