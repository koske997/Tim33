import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaPacijenata from './ListaPacijenata';
import { Redirect } from 'react-router-dom';
import IzmenaPodataka from '../IzmenaPodatakaKorisnika/IzmeniPodatke';





const initialState = {
  pacijenti: null
}


class Doktori extends React.Component {

    state = {
        redirect: false,
        prijavljenKorisnik: null,
        openModal: false,

        redirectNaPretragu: false,
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
        redirectNaPretragu: true
      })
    }

    renderRedirect = () => {
        if (this.state.redirect) 
        {
          return <Redirect to='/pregled' />
        }
        else if (this.state.redirectNaPretragu)
        {
          return <Redirect to='/pretragaPacijenata' />
        }
    }


  render() {
    console.log(this.props.pacijenti);
    console.log(this.props.token);
    return (

      <div>

        <IzmenaPodataka prijavljenKorisnik={this.props.prijavljenKorisnik} openModal={this.state.openModal} closeModal={this.closeModal} /> 
     
      <div className="ui segment">
        <h2>Lista svih pacijenata </h2>

        <div>         
          <ListaPacijenata  pacijenti={this.props.pacijenti}/>
        </div>

        <button className="ui button" onClick={this.props.prikazi_pacijente} >Prikazi pacijente</button>
        <button className="ui button" onClick={ (e) => {this.setRedirect2(e); this.props.prikazi_pacijente(e);}} > Pretrazi i filtriraj pacijente </button>
        <hr/>

        <button class="ui labeled icon button">
            <i class="left arrow icon"></i>
                Istorija pregleda
        </button>

        {this.renderRedirect()}

        <button class="ui right labeled icon button" onClick={this.setRedirect}>
            <i class="right arrow icon"></i>
                Zapocni pregled
        </button>

      </div>

      <div className="ui segment">
            <h2>Izmeni svoje podatke</h2>      
            <button className="Promeni_podatke" onClick={ (e) => { this.handleClick(e); this.props.prikazi_prijavljenog_korisnika(e) }} >Promeni</button>
      </div>
     
      </div>
     
    );
  }
}

const mapStateToProps = state => {
  console.log(state.auth);
  return {
      pacijenti: state.auth.pacijenti,
      prijavljenKorisnik: state.auth.prijavljenKorisnik,
  }
}

const mapDispatchToProps = dispatch => {
  return {
     prikazi_pacijente: () => dispatch(actions.pacijenti()),
     prikazi_prijavljenog_korisnika: () => dispatch(actions.prijavljenKorisnik()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doktori);