import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './components/UI/Header/Header';
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import CurrentPost from './components/CurrentPost/CurrentPost';
import CreatePost from './components/CreatePost/CreatePost';
import UpdatePost from './components/UpdatePost/UpdatePost';

function App(props) {
  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/posts' exact component={Posts} />
          <Route path='/posts/create' exact component={CreatePost} />
          <Route path='/posts/update/:id' exact component={UpdatePost} />
          <Route path='/posts/:id' exact component={CurrentPost} />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
