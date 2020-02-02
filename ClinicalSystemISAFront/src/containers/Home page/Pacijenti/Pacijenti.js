import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaPacijenata from './ListaPacijenata';
import ListaKlinika from './ListaKlinika';
import {Redirect} from 'react-router-dom';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import get from 'lodash/get';
import IzmenaPodataka from '../IzmenaPodatakaKorisnika/IzmeniPodatke';


const initialState = {
  pacijenti: null,
  klinike: null,
  karton: null
}

class Pacijenti extends React.Component {

  state = {
    redirect: false,
    redirectPretrazi: false,

    prijavljenKorisnik: null,
    openModal: false,
}

handleClick = id => {
 
  this.setState({
      openModal: true,
  });
}

closeModal = () => {
  this.setState({
      openModal: false,
  });
}


  
setRedirect = () => {
    this.setState({
      redirect: true
    })
}

setRedirect2 = () => {
  this.setState({
    redirectPretrazi: true
  })
}

renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/medicinskiKarton' />
    } 
    else if ( this.state.redirectPretrazi)
    {
      return <Redirect to='/pretragaKlinika' /> 
    }
}
  
renderPrijavljenogPacijenta = () => {
      return (
          <div>
  
          <div className="ui segment">
            <h2>Lista svih pacijenata </h2>
            <div>         
              <ListaPacijenata pacijenti={this.props.pacijenti}/>
            </div>
  
            <button className="Prikazi_pacijente" onClick={this.props.prikazi_pacijente} >Prikazi pacijente</button>
            <hr/>
          </div>
  
          <div className="ui segment">
            <h2>Lista svih klinika</h2>  
            
            <div>
              <ListaKlinika klinike={this.props.klinike} />
            </div>
              {this.renderRedirect()}

            <button className="Prikazi_klinike" onClick={this.props.prikazi_klinike} >Prikazi klinike</button>
            <button className="Filtriraj_klinike" onClick={(e) => { this.props.prikazi_klinike(e); this.setRedirect2(e); this.props.tipovi_pregleda(e); this.props.svi_pregledi(e);}} > Pretrazi klinike</button> 
          </div>
  
          <div className="ui segment">
            <h2>Medicinski karton</h2>      
  
               {this.renderRedirect()}
            <button className="Prikazi_karton" onClick={this.setRedirect} >Prikazi karton</button>
          </div>
  
          <div className="ui segment">
            <h2>Izmeni svoje podatke</h2>      
            <button className="Promeni_podatke" onClick={ (e) => { this.handleClick(e); this.props.prikazi_prijavljenKorisnik(e); }} >Promeni</button>
          </div>
  
      </div>
      );
  }



  render() {
    return (
      <div>
      <IzmenaPodataka prijavljenKorisnik={this.props.prijavljenKorisnik} openModal={this.state.openModal} closeModal={this.closeModal} /> 
          {this.renderPrijavljenogPacijenta()}
      </div>
  );
      
  }

}

const mapStateToProps = state => {
  console.log(state.auth);
  return {
      pacijenti: state.auth.pacijenti,
      klinike: state.auth.klinike,
      karton: state.auth.karton,

      prijavljenKorisnik: state.auth.prijavljenKorisnik,

  }
}

const mapDispatchToProps = dispatch => {
  return {
     prikazi_pacijente: () => dispatch(actions.pacijenti()),
     prikazi_klinike: () => dispatch(actions.klinike()),
     prikazi_karton: () => dispatch(actions.karton()),

     prikazi_prijavljenKorisnik: () => dispatch(actions.prijavljenKorisnik()),

     tipovi_pregleda: () => dispatch(actions.tipoviPregleda()),

     svi_pregledi: () => dispatch(actions.pregledi()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pacijenti);