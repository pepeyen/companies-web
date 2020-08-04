import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Views
import SignIn from './views/SingIn'
import Home from './views/Home'
import Enterprise from './views/Enterprise'


//Styles
import './App.scss';


function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/home" component={Home} />
        <Route path="/empresa/:empresaId" component={Enterprise} />
      </Switch>
    </main>
  );
}

export default App;
