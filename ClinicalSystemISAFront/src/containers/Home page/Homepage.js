import React, { Component } from "react";
import {Route,NavLink,HashRouter} from "react-router-dom";
import Pocetna from "./Pocetna/Pocetna";
import Zaposleni from "./Zaposleni/Zaposleni";
import Kontakt from "./Kontakt/Kontakt";
import Klinike from "./Klinike/Klinike";
import Pacijenti from "./Pacijenti/Pacijenti";
import PodaciKlinike from "./Klinike/PodaciKlinike";
import PretragaDoktora from "./Klinike/PretragaDoktora"

class Homepage extends React.Component {
  render() {
    return (
        <HashRouter>
            <div>

              <div class="ui primary pointing menu">
                  <a class="active item">
                    <li><NavLink exact to="/">Pocetna stranica</NavLink></li>
                  </a>

                  <a class="item">
                    <li><NavLink exact to="/zaposleni">Zaposleni</NavLink></li>
                  </a>

                  <a class="item">
                    <li><NavLink exact to="/klinike">Klinike</NavLink></li>
                  </a>

                  <a class="ui item">
                      <li><NavLink exact to="/kontakt">Kontakt</NavLink></li>
                  </a>
              </div>

            <div className="content">
                <Route path="/" component={Pocetna}/>
                <Route path="/zaposleni" component={Zaposleni}/>
                <Route path="/klinike" component={Klinike} />
                <Route path="/kontakt" component={Kontakt}/>
                <Route path="/podaciKlinike" component={PodaciKlinike} />
                <Route path="/pretragaDoktora" component={PretragaDoktora} />

            </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Homepage;