import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import IzmenaPodataka from '../IzmenaPodatakaKorisnika/IzmeniPodatke';
import KarticaZahteva from './KarticaZahteva';
import ListaZahteva from './ListaZahteva';

const initialState = {
    sale: null,
    doktori: null,
    tipoviPregleda: null
}

class AKlinike extends React.Component {

state = {
    redirectPregled: false,
    redirectSala: false,
    redirectTipoviPregleda: false, 

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

  
setRedirect = (e) => {
    this.setState({
      redirectPregled: true
    })
}

  
setRedirect_1 = (e) => {
    this.setState({
      redirectSala: true
    })
}

setRedirect_2 = (e) => {
    this.setState({
      redirectTipoviPregleda: true
    })
}

    componentDidMount(){
        this.props.sviZahtevi();
    }

renderRedirect = () => {
    if (this.state.redirectPregled) {
      return <Redirect to='/unosPregleda' />
    }
    else if(this.state.redirectSala)
    {
        return <Redirect to='/saleZaPregled' />
    }
    else if ( this.state.redirectTipoviPregleda)
    {
        return <Redirect to='/tipoviPregleda' />
    }
}

    renderZahteva(){
        if(this.props.zahtevi!=null){
            return <ListaZahteva podaci={this.props.zahtevi}/>;
        }
    }


  render() {
      return (
        <div>
                {this.renderZahteva()}
          {/*
         <IzmenaPodataka prijavljenKorisnik={this.props.prijavljenKorisnik} openModal={this.state.openModal} closeModal={this.closeModal} /> 

            <h2>Administrator klinike </h2>

        <div className="ui segment">
            <h3>Pregled</h3>
            {this.renderRedirect()}

            <button className="Unesi_pregled" onClick={ (e) => {this.setRedirect(e); this.props.prikazi_sale(e); this.props.prikazi_doktore(e); this.props.prikazi_tipove_pregleda(e)}} >Unesi novi pregled</button>
            <hr/>
        </div>

        <div className="ui segment">
            <h3>Sale za pregled i operacije</h3>

            {this.renderRedirect()}

            <button className="Sale_za_pregled" onClick = { (e) => {this.setRedirect_1(e); this.props.prikazi_sale(e);}}>Sale za pregled i operacije</button> 
            <hr/>
        </div>

        <div className="ui segment">
            <h3>Tipovi pregleda</h3>

            {this.renderRedirect()}

            <button className="Tipovi_pregleda" onClick = { (e) => {this.setRedirect_2(e); this.props.prikazi_preglede(e)}}>Tipovi pregleda</button> 
            <hr/>
        </div>

        <div className="ui segment">
            <h3>Izmeni svoje podatke</h3>

            <button className="Izmeni_svoje_podatke" onClick = { (e) => { this.handleClick(e); this.props.izmeni_priavljenog_korisnika(e);}}>Izmeni</button> 
            <hr/>
        </div>
          */}
   </div>
    );
  }
}



const mapStateToProps = state => {
    console.log(state.auth.doktori);
    console.log(state.auth.sviZahtevi);
    return {
        sale: state.auth.sale,
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda,

        prijavljenKorisnik: state.auth.prijavljenKorisnik,
        zahtevi: state.auth.sviZahtevi

    }
}

const mapDispatchToProps = dispatch => {
    return {
        prikazi_sale: () => dispatch(actions.sale()),
        prikazi_doktore: () => dispatch(actions.doktori()),
        prikazi_tipove_pregleda: () => dispatch(actions.tipoviPregleda()),

        prikazi_preglede: () => dispatch(actions.pregledi()),
        izmeni_priavljenog_korisnika: () => dispatch(actions.prijavljenKorisnik()),
        sviZahtevi: () => dispatch(actions.vratiZahteve())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AKlinike);