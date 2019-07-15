import React from 'react';

import classes from './Header.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';

function header(props) {
  return (
    <header className={classes.header}>
      <Toolbar />
      <div className={classes.logo}>React Blog App</div>
    </header>
  );
}

export default header;
