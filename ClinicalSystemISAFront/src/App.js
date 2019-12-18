import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import Orders from './components/Orders/Orders';
import {Switch, Route} from 'react-router-dom';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Homepage from './containers/Home page/Homepage';
import Pacijenti from './containers/Home page/Pacijenti/Pacijenti';
import Doktori from './containers/Home page/Doktori/Doktori';
import Pregled from './containers/Home page/Doktori/Pregled';


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Layout} />
          <Route path="/orders" component={Orders} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/homepage" component={Homepage} />
          <Route path="/pacijenti" component={Pacijenti} />
          <Route path="/doktori" component={Doktori} />
          <Route path="/pregled" component={Pregled} />
        </Switch>
      </div>
    );
  }
}

export default App;
