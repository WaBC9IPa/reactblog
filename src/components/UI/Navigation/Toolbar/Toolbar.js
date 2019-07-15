import React from 'react';

import {NavLink} from 'react-router-dom';

import classes from './Toolbar.css';

function toolbar(props) {
  return (
    <nav>
      <ul className={classes.nav}>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/posts'>Posts</NavLink></li>
        <li><NavLink to='/posts/create'>Create Post</NavLink></li>
      </ul>
    </nav>
  );
}

export default toolbar;
