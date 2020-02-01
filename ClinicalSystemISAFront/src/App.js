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
import MedicinskiKarton from './containers/Home page/Pacijenti/MedicinskiKarton';
import AKlinike from './containers/Home page/AKlinike/AKlinike';
import UnosPregleda from './containers/Home page/AKlinike/UnosPregleda';
import SaleZaPregled from './containers/Home page/AKlinike/SaleZaPregled';
import UnosSale from './containers/Home page/AKlinike/UnosSale';
import TipoviPregleda from './containers/Home page/AKlinike/TipoviPregleda/TipoviPregleda';
import UnosTipaPregleda from './containers/Home page/AKlinike/TipoviPregleda/UnosTipaPregleda';
import PretragaKlinika from './containers/Home page/Pacijenti/PretragaKlinika/PretragaKlinika';







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
          <Route path="/doktor" component={Doktori} />
          <Route path="/pregled" component={Pregled} />
          <Route path="/medicinskiKarton" component={MedicinskiKarton} />
          <Route path="/adminKlinike" component={AKlinike} />
          <Route path="/unosPregleda" component={UnosPregleda} />
          <Route path="/saleZaPregled" component={SaleZaPregled} />
          <Route path="/unosSale" component={UnosSale} />
          <Route path="/tipoviPregleda" component={TipoviPregleda} />
          <Route path="/unosTipaPregleda" component={UnosTipaPregleda} />
          <Route path="/pretragaKlinika" component={PretragaKlinika} />






        </Switch>
      </div>
    );
  }
}

export default App;
