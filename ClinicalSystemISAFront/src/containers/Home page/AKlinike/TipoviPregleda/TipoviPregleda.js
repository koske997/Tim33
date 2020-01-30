import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import ListaSala_1 from '.././ListaSala_1';
import ListaTipovaPregleda from "../ListaTipovaPregleda";

import ListaTipovaPregledaa from "./ListaTipovaPregledaa";






const initialState = {
    sale: null,
    doktori: null,
    tipoviPregleda: null
}

class TipoviPregleda extends React.Component {

  state = {
    redirect: false,
}

  
setRedirect = (e) => {
    this.setState({
      redirect: true
    })
}


renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/unosTipaPregleda' />
    }
  
}


  
  render() {
      return (
      <div>
            <h3>Tipovi pregleda </h3>

        <div className="ui segment">
            <h4>Dodaj novi tip</h4>

            {this.renderRedirect()}

            <button className="Unesi_tipove" onClick={ (e) => {this.setRedirect(e);}} >Dodaj novi tip</button>
            <hr/>
        </div>

        <div className="ui segment">
          <h4>Lista svih tipova </h4>  
          
          <div>
            <ListaTipovaPregledaa tipoviPregleda={this.props.tipoviPregleda} />
          </div>
          <button className="Prikazi_tipove" onClick={ (e) => {this.props.prikazi_tipove_pregleda(e); this.props.prikazi_preglede(e)}} >Prikazi tipove</button>

        </div>

   </div>
    );
  }
}



const mapStateToProps = state => {
    console.log(state.auth.tipoviPregleda);
    return {
        sale: state.auth.sale,
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda
    }
}

const mapDispatchToProps = dispatch => {
    return {
        prikazi_tipove_pregleda: () => dispatch(actions.tipoviPregleda()),
                //Dole sam promenio umeso actions.pregledi u actions.tipoviPregleda
                //jer puca tu

        prikazi_preglede: () => dispatch(actions.tipoviPregleda())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TipoviPregleda);