import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaKlinika from "../Klinike/ListaKlinika";
import { Button, Header, Image, Modal } from 'semantic-ui-react';



 
class Klinike extends Component {

  state = {
    sveKlinike: null,
  }

  

  render() {
    // sessionStorage.getItem('role');  Dobijam role trenutno ulogovanog korisnika
    return (
      <div>
        <h2>Spisak svih klinika: </h2>
        <p>Ovde mozete da vidite osnovne podatke o svim klinikama  koje postoje u nasoj evidenciji.</p>

        <div>
         <hr />
              <ListaKlinika klinike={this.props.sveKlinike} />
         <hr />      
          <Button onClick = { (e) => {this.props.prikazi_klinike(e); }}>Prikazi klinike</Button>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.auth);
  return {
      sveKlinike: state.auth.klinike,

  }
}

const mapDispatchToProps = dispatch => {
  return {
      prikazi_klinike: () => dispatch(actions.klinike()),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Klinike);