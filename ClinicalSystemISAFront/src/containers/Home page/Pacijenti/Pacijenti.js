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
        return <div className="ui link cards"><KarticaKorisnika slika={this.props.prijavljenKorisnik}/></div>;
      }

      if(this.state.odabir==='KLINIKE'){
        return <ListaKlinika klinike={this.props.klinike} />;
      }

      if(this.state.odabir==='PRETRAGA'){
        return <Redirect to='/pretragaKlinika' /> 
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
     {/*   <div className="ui segment">
            
            <h2>Lista svih pacijenata </h2>
                {this.renderKorisnika()}
              <ListaPacijenata pacijenti={this.props.pacijenti}/>
           
  
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
  */}
      </div>
      );
  }



  render(){
        return (
          <div>
          {/*
          <IzmenaPodataka prijavljenKorisnik={this.props.prijavljenKorisnik} openModal={this.state.openModal} closeModal={this.closeModal} />
          
          */} 
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pacijenti);