import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaPacijenata from './ListaPacijenata';
import { Redirect } from 'react-router-dom';
import IzmenaPodataka from '../IzmenaPodatakaKorisnika/IzmeniPodatke';
import FormaMejla from '../MedicinskaSestra/FormaMejla';
import Spinner from '../Spinner';




const initialState = {
  pacijenti: null,
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


    funZaMail = (podaci) => {
      this.props.slanjeMaila(this.props.prijavljenKorisnik.username, podaci.tip, podaci.tekst);
      this.props.slanjeZahteva(podaci.tip, '', '', '', this.props.prijavljenKorisnik.id);
      this.setState({po: 'ODG'});
    }

        renderPac(){
          if (this.state.po==='PROFIL'){
              return this.renderProfilDoktora();
          }

          if (this.state.po==='PRIKAZI PACIJENTE'){
              return this.renderPacijenti();
          }

          if (this.state.po==='FORMA'){
            return <FormaMejla vrati={this.funZaMail}/>
          }

          if(this.state.po==='ODG' && this.props.odgovor==null){
            return <Spinner poruka="Slanje zahteva"/>
        }

        if(this.state.po==='ODG' && this.props.odgovor==201){
            return <div className="ui success message"><div className="header">Zahtev poslat!</div><p>Vas zahtev je uspesno poslat administratoru klinike.</p></div>
        }

        if(this.state.po==='IZLOGUJ'){
            sessionStorage.clear();
            return <Redirect to='/login'/>
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
                  {this.props.prijavljenKorisnik.address} {this.props.prijavljenKorisnik.city} {this.props.prijavljenKorisnik.country} 
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ListaPacijenata  pacijenti={this.props.pacijenti}/>
      </div>
    );
  }

  prijavljenJeKo() {
    if (this.props.prijavljenKorisnik !== null && this.props.prijavljenKorisnik !== undefined)
    {
      if ( this.props.prijavljenKorisnik.role === 'ADMINC')
        return <Redirect to="/adminKlinike" />;

      if( this.props.prijavljenKorisnik.role === 'PATIENT')
        return <Redirect to="/pacijenti" />

      if( this.props.prijavljenKorisnik.role === 'NURSE')
        return <Redirect to="/medSestra" />
    }
}

  renderrr(){
    if(this.props.prijavljenKorisnik!=null){
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
                          <a className="item" onClick={ (e) => {this.setState({po: 'FORMA'});}}>Zahtev za godisnji/odsustvo</a>
                          <a className="item" onClick={ (e) => {this.setState({po: 'IZLOGUJ'});}}>Izloguj se</a>
                      </div>
                  </div>
                  <div style={{ float: "right"}}> 
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="ui blue image label" onClick={(e) => { this.setState({po: 'PROFIL'});}}>
                                        <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg"/>{this.props.prijavljenKorisnik.username}
                                            <div className="detail">{this.props.prijavljenKorisnik.role}</div> 
                                    </a> 
                                    
                    </div>
                  <br/>
                  <br/>
                  <br/>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    
                      {this.renderPac()}
                  </div>
            </div>
          </div>
        );
    }else return <Spinner poruka="Ucitavanje"/>;
  }


  render() {
    return (
      <div>
        {this.renderrr()}
        {this.prijavljenJeKo()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.auth);
  return {
      pacijenti: state.auth.pacijenti,
      prijavljenKorisnik: state.auth.prijavljenKorisnik,
      odgovor: state.auth.odgovor
  }
}

const mapDispatchToProps = dispatch => {
  return {
     prikazi_pacijente: () => dispatch(actions.pacijenti()),
     prikazi_prijavljenog_korisnika: () => dispatch(actions.prijavljenKorisnik()),
     slanjeMaila: (mailFrom, mailTo, dodatak) => dispatch(actions.slanjeMaila(mailFrom, mailTo, dodatak)),
     slanjeZahteva: (tip, datum, doktorId, adminId, posiljalacId) => dispatch(actions.slanjeZahteva(tip, datum, doktorId, adminId, posiljalacId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doktori);