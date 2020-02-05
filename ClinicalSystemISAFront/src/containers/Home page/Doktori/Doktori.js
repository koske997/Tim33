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

    componentDidMount() {
      this.props.prikazi_pacijente();
      this.props.prikazi_prijavljenog_korisnika();
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


    setRedirect2 = () => {
      this.setState({
        redirectNaPretragu: true
      })
    }

    renderRedirect = () => {
        if (this.state.redirectNaPretragu)
        {
          return <Redirect to='/pretragaPacijenata' />
        }
    }

  renderPac(){
    if (this.state.po==='PROFIL'){
        return this.renderProfilDoktora();
    }

    if (this.state.po==='PRIKAZI PACIJENTE'){
        return this.renderPacijenti();
    }
  }

  renderProfilDoktora() {
    if (this.props.prijavljenKorisnik !== null && this.props.prijavljenKorisnik !== undefined)
    {
    return (
      <div className="ui link cards">
          <div className="card">
              <div className="image">
                  <img alt="da" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
              </div>
          <div className="content">
              <div className="header">{this.props.prijavljenKorisnik.firstName} {this.props.prijavljenKorisnik.lastName}</div>
              <div className="meta">
                  <a>{this.props.prijavljenKorisnik.role}</a>
              </div>
              <div className="description">
                  {this.props.prijavljenKorisnik.address}, {this.props.prijavljenKorisnik.city}, {this.props.prijavljenKorisnik.country} 
              </div>
          </div>
          <div className="extra content">
              <span className="right floated">
              {this.props.prijavljenKorisnik.phoneNumber}
              </span>
              <span>
                  <i className="user icon"></i>
                  {this.props.prijavljenKorisnik.username}
              </span>
          </div>
          </div>
      </div>
    );
    }
  }

  renderPacijenti() {
    return (
      <div>
        <ListaPacijenata  pacijenti={this.props.pacijenti}/>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <IzmenaPodataka prijavljenKorisnik={this.props.prijavljenKorisnik} openModal={this.state.openModal} closeModal={this.closeModal} /> 
          <div>
              <div style={{ float: "center"}}>
                  <div className="ui secondary  menu">
                      <a className="item" onClick={(e)=>{ this.setState({po: 'PROFIL'});}}>Profil</a>
                      <a className="item" onClick={ (e) => {this.setRedirect2(e); this.props.prikazi_pacijente(e);}}> Pretrazi i filtriraj pacijente</a>
                      <a className="item" onClick={(e)=>{ this.setState({po: 'PRIKAZI PACIJENTE'});}}>Prikazi sve pacijente</a>
                      <a className="item" onClick={ (e) => { this.handleClick(e); this.props.prikazi_prijavljenog_korisnika(e) }}>Izmeni svoje podatke</a>

                  </div>
              </div>
              <div>
                  <br /> < br/>
                  {this.renderPac()}
              </div>
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