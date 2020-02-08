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


const initialState = {
  pacijenti: null,
  klinike: null,
  karton: null
}

class Pacijenti extends React.Component {

  state = {
    redirect: false,
    redirectPretrazi: false,
    odabir: '',
    prijavljenKorisnik2: null,
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


    componentDidMount(){
      this.props.prikazi_prijavljenKorisnik();
      this.props.prikazi_klinike();  
      this.props.tipovi_pregleda();
      this.props.svi_pregledi();      

      this.props.sacuvaj_pacijenta(this.props.prijavljenKorisnik);
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

  
    renderMeni(){
      if(this.state.odabir==='PROFIL'){
        this.props.sacuvaj_pacijenta(this.props.prijavljenKorisnik);
        return <Redirect to="profilPacijenta" />
      }

      if(this.state.odabir==='KLINIKE'){
        return <ListaKlinika klinike={this.props.klinike} />;
      }

      if(this.state.odabir==='PRETRAGA'){
        return <Redirect to='/pretragaKlinika' /> 
      }

      if(this.state.odabir==='IZLOGUJ'){
        sessionStorage.clear();
        return <Redirect to='/login'/>
    }
      
  }


renderPrijavljenogPacijenta = () => {
      return (
          <div>
            <div style={{ float: "left"}}>
                        <div className="ui secondary  menu">
                            <a className="item"> Pocetna</a>
                            <a className="item" onClick={(e) => {this.setState({odabir: 'KLINIKE'});}}> Klinike</a>
                            <a className="item" onClick={(e) => {this.setState({ odabir: 'PROFIL'});}}>Profil</a>
                            <a className="item" onClick={(e) => {this.setState({odabir: 'PRETRAGA'});}}> Pretrazi klinike</a>
                            <a className="item" onClick={(e) => {this.setState({odabir: 'IZLOGUJ'});}}>Izloguj se</a>
                        </div>
                    </div>
              {this.renderKorisnika()}
                <br/>
                <br/>
                <br/>
                <br/>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {this.renderMeni()}
              </div>
              {this.renderRedirect()}
      </div>
      );
  }



  render(){
        return (
          <div>
              {this.renderPrijavljenogPacijenta()}
          </div>
      );
    }   
  
}

const mapStateToProps = state => {
  console.log(state.auth.klinike);
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

     sacuvaj_pacijenta: (pacijent) => dispatch(actions.sacuvajObelezenogPacijenta(pacijent)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pacijenti);