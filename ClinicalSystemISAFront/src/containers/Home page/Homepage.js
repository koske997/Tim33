import React, { Component } from "react";
import {Route,NavLink,HashRouter} from "react-router-dom";
import Pocetna from "./Pocetna/Pocetna";
import Zaposleni from "./Zaposleni/Zaposleni";
import Kontakt from "./Kontakt/Kontakt";
import Klinike from "./Klinike/Klinike";
import Pacijenti from "./Pacijenti/Pacijenti";

class Homepage extends Component {
  render() {
    return (
        <HashRouter>
            <div>
            <h1>Klinicki centar - KC</h1>
            <ul className="header">
                <li><NavLink exact to="/">Pocetna stranica</NavLink></li>
                <li><NavLink exact to="/zaposleni">Zaposleni</NavLink></li>
                <li><NavLink exact to="/klinike">Klinike</NavLink></li>
                <li><NavLink exact to="/kontakt">Kontakt</NavLink></li>
                

            </ul>
            <div className="content">
                <Route path="/" component={Pocetna}/>
                <Route path="/zaposleni" component={Zaposleni}/>
                <Route path="/klinike" component={Klinike} />
                <Route path="/kontakt" component={Kontakt}/>
            </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Homepage;