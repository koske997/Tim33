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
import Spinner from '../Spinner';
import KarticaKorisnika from '../MedicinskaSestra/KarticaKorisnika';
import ListaUnapredDefinisanihPregleda from './ListaUnapredDefinisanihPregleda';
import PretragaLekaraKlinike from './PretragaLekaraKlinike.js';
import GuglMap from './GoogleMap';


const initialState = {
  pacijenti: null,
  klinike: null,
  karton: null
}

class ProfilKlinike extends React.Component {

  state = {
    redirect: false,
    redirectPretrazi: false,
    odabir: '',
    prijavljenKorisnik2: null,
    openModal: false,

    klinikaProfila: null,

    sviPregledi: null,
    noviPreglediKlinike: null,

    mapRedirect: false,
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


    componentDidMount(){
      this.props.prikazi_prijavljenKorisnik();
      this.props.prikazi_klinike();  
      this.props.tipovi_pregleda();
      this.props.svi_pregledi();      

      this.props.sacuvaj_pacijenta(this.props.prijavljenKorisnik);
      this.pronadjiPregledeKlinike();
    }

    pronadjiPregledeKlinike() {
        let noviPregledi = [];

        if (this.props.klinikaProfila !== null && this.props.klinikaProfila !== undefined &&
            this.props.sviPregledi !== null && this.props.sviPregledi !== undefined)
            {
                for (let i=0; i<this.props.klinikaProfila.user.length; i++)
                {
                    for (let j=0; j<this.props.sviPregledi.length; j++)
                    {
                        if (this.props.sviPregledi[j].idLekara === this.props.klinikaProfila.user[i].id)
                        {
                            noviPregledi.push(this.props.sviPregledi[j]);
                        }
                    }
                }
            }
            this.setState({noviPreglediKlinike: noviPregledi})
    }

    renderKorisnika(){

      if(this.props.prijavljenKorisnik!=null){
        console.log(this.props.prijavljenKorisnik);
          return (<div style={{ float: "right"}}> 
                        <a className="ui blue image label"><img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg"/>
                        {this.props.prijavljenKorisnik.username}
                        <div className="detail">{this.props.prijavljenKorisnik.role}</div></a>
                    </div>
                  );
      }
      return <Spinner poruka="Ucitavanje"/> ;      
    }

    profilKlinike() {
        if (this.props.klinikaProfila !== null && this.props.klinikaProfila !== undefined)
        {
        return (          
            <div className="ui link cards">
                <div className="card" >
                    <div className="image">
                        <img alt="da" src={this.props.klinikaProfila.picture}/>
                    </div>
                <div className="content">
                    <div className="header">{this.props.klinikaProfila.name}</div>
                    <br/> <br />
                    <div className="meta">
                        <a>Likes: {this.props.klinikaProfila.likes}</a>
                    </div>
                    <div className="description">
                        {this.props.klinikaProfila.city}
                        {this.props.klinikaProfila.address}

                    </div>
                </div>
                <div className="extra content">
                    <span className="right floated">
                    Prosecna ocena: {this.props.klinikaProfila.ocena}
                    </span>
                    <span>
                        <i className="user icon"></i>
                        {this.props.klinikaProfila.user.length}
                    </span>
                </div>
                </div>
            </div>
        ); 
        }
    }

    lekariKlinike() {
        if (this.props.klinikaProfila !== null && this.props.klinikaProfila !== undefined)
        {

        return this.props.klinikaProfila.user.map((doktor) => {
            if (doktor.role === 'DOCTOR')
            {
            return (
                    <div className="card">
                        <div className="image">
                            <img alt="da" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
                        </div>
                    <div className="content">
                        <div className="header">{doktor.firstName} {doktor.lastName}</div>
                        <br/> 
                        <div className="header">Prosecna ocena: {doktor.ocena}</div>
                        <br />
                        <div className="meta">
                            <a>{doktor.role}</a>
                        </div>
                        <div className="description">
                            {doktor.address}, {doktor.city}, {doktor.country} 
                        </div>
                    </div>
                    <div className="extra content">
                        <span className="right floated">
                        {doktor.phoneNumber}
                        </span>
                        <span>
                            <i className="user icon"></i>
                            {doktor.username}
                        </span>
                    </div>
                    </div>
                );
            }
        });
        }
    }

  
    renderMeni(){
      if(this.state.odabir==='PROFIL'){
        return this.profilKlinike();
      }

      if(this.state.odabir==='LEKARI'){
        return <div className="ui link cards"> {this.lekariKlinike()} </div>;
      }

      if(this.state.odabir==='PREGLEDI'){
        return <ListaUnapredDefinisanihPregleda pregledi={this.state.noviPreglediKlinike} /> 
      }

      if(this.state.odabir === 'PRETRAGA LEKARA')
      {
        return <PretragaLekaraKlinike sviLekariKlinike={this.props.klinikaProfila.user} />
      }

      if(this.state.odabir === 'LOKACIJA')
      {
        if (this.props.klinikaProfila !== null && this.props.klinikaProfila !== undefined)
        {
          console.log('ne udjes?');
          return <GuglMap x={this.props.klinikaProfila.x} y={this.props.klinikaProfila.y} naziv={this.props.klinikaProfila.name}/>
        }
      }

      if(this.state.odabir === 'VRATI')
      {
        return this.props.history.push("/pacijenti");
      }
      
  }

  redirectLokacija() {
    if (this.state.mapRedirect)
    {
     return <Redirect to="/googleMap" />
    }
  }


renderProfilaKlinike = () => {
      return (
          <div>
            <div style={{ float: "left"}}>
                        <div className="ui secondary  menu">
                            <a className="item" onClick={(e) => {this.setState({ odabir: 'PROFIL'});}}>Profil</a>
                            <a className="item" onClick={(e) => {this.setState({odabir: 'LEKARI'});}}> Lekari klinike</a>
                            <a className="item" onClick={(e) => {this.setState({odabir: 'PREGLEDI'});}}> Pregledi klinike</a>
                            <a className="item" onClick={(e) => {this.setState({odabir: 'PRETRAGA LEKARA'});}}> Pretraga lekara</a>
                            <a className="item" onClick={(e) => {this.setState({odabir: 'LOKACIJA'});}}> Lokacija</a>
                            <a className="item" onClick={(e)=>{ this.setState({odabir: 'VRATI'})}}><b>NAZAD</b></a>

                        </div>
                    </div>
              {this.renderKorisnika()}
              {this.redirectLokacija()}
                <br/>
                <br/>
                <br/>
                <br/>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {this.renderMeni()}
              </div>
      </div>
      );
  }



  render(){
        return (
          <div>
              {this.renderProfilaKlinike()}
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

      klinikaProfila: state.auth.klinikaProfila,

      sviPregledi: state.auth.sviPregledii,

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

     sacuvaj_pacijenta: (pacijent) => dispatch(actions.sacuvajObelezenogPacijenta(pacijent)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilKlinike);