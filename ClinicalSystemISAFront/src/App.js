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
import MedicinskaSestra from './containers/Home page/MedicinskaSestra/MedicinskaSestra';
import PretragaKlinika from './containers/Home page/Pacijenti/PretragaKlinika/PretragaKlinika';
import ZakazivanjePregleda from './containers/Home page/Pacijenti/ZakazivanjePregleda';
import IzvestajAdmina from './containers/Home page/AKlinike/IzvestajAdmina';
import PrvaPrijava from './containers/Home page/PrvaPrijava/PrvaPrijava';
import ProfilKlinike from './containers/Home page/Pacijenti/ProfilKlinike';
import GoogleMap from './containers/Home page/Pacijenti/GoogleMap';
import Lekari from './containers/Home page/AKlinike/DodavanjeBrisanjeLekara/Lekari';
import PretragaPacijenata from './containers/Home page/Doktori/PretragaPacijenata/PretragaPacijenata';
import ProfilPacijenta from './containers/Home page/Doktori/PretragaPacijenata/ProfilPacijenta';
import DetaljiPregleda from './containers/Home page/Doktori/PretragaPacijenata/DetaljiPregleda';
import PretragaLekaraKlinike from './containers/Home page/Pacijenti/PretragaLekaraKlinike';
import './App.css';




class App extends Component {
  render() {
    return (
      <div className="slika">
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
          <Route path="/medSestra" component={MedicinskaSestra} />
          <Route path="/pretragaKlinika" component={PretragaKlinika} />
          <Route path="/zakazi" component={ZakazivanjePregleda}/>
          <Route path="/pretragaPacijenata" component={PretragaPacijenata} />
          <Route path="/profilPacijenta" component={ProfilPacijenta} />
          <Route path="/detaljiPregleda" component={DetaljiPregleda} />
          <Route path="/izvestajAdmina" component={IzvestajAdmina} />
          <Route path="/prvaPrijava" component={PrvaPrijava} />
          <Route path="/profilKlinike" component={ProfilKlinike} />
          <Route path="/pretragaLekaraKlinike" component={PretragaLekaraKlinike} />
          <Route path="/googleMap" component={GoogleMap} />
          <Route path="/lekari" component={Lekari} />

          










        </Switch>
      </div>
    );
  }
}

export default App;
