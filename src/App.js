import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Views
import Login from './views/Login'
import Home from './views/Home'
import SearchResult from './views/SearchResult'


//Styles
import './App.scss';


function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route path="/empresa/:empresaId" component={SearchResult} />
      </Switch>
    </main>
  );
}

export default App;
