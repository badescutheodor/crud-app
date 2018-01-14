import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Post from './Post';
import Admin from './Admin';

class App extends Component {
  render() {
    return (
        <HashRouter>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            <Route path="/:id" component={Post} />
            <Route exact path="/" component={Home} />
          </Switch>
        </HashRouter>
    );
  }
}

export default App;
