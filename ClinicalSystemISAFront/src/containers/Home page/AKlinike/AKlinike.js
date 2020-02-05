import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import IzmenaPodataka from '../IzmenaPodatakaKorisnika/IzmeniPodatke';
import KarticaZahteva from './KarticaZahteva';
import ListaZahteva from './ListaZahteva';
import Spinner from '../Spinner';
import Odgovor from './Odgovor';

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
    po: '',
    zapamcenid: null,
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
        this.props.vratiKorisnika();
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


    obradiZahtev = (id, str) => {
        console.log(id);
        console.log(str);
        if(str==='ODB'){
            this.setState({po: 'FORMA', zapamcenid: id});
        }else{
            this.props.slanjePotvrdnogMaila(this.props.prijavljenKorisnik.username,'Prihvati',id);
            this.props.brisiZahtev('', '', id, '', '');
            this.props.sviZahtevi();
            this.setState({po: 'OSVEZI'});
        }
    }

    renderZahteva(){
        if(this.props.zahtevi!=null){
            return <ListaZahteva  obrada={this.obradiZahtev} podaci={this.props.zahtevi} />;
        }
    }

    renderOdgovora = (tekst) => {
        console.log(tekst);
        console.log(this.state.zapamcenid);
        this.props.slanjePotvrdnogMaila(this.props.prijavljenKorisnik.username,tekst,this.state.zapamcenid);
        this.props.brisiZahtev('', '', this.state.zapamcenid, '', '');
        this.props.sviZahtevi();
        this.setState({po: 'OSVEZI'});
    }

    renderPac(){
        if(this.state.po==='ZAHTEV'){
            return <div>{this.renderZahteva()}</div>
        }

        if(this.state.po==='OSVEZI' && this.props.odgovor2==201){
            return <div>{this.renderZahteva()}</div>
        }

        if(this.state.po==='OSVEZI' && this.props.odgovor2!=201){
            return <Spinner poruka="Slanje odgovora"/>
        }

        if(this.state.po==='TIPOVI'){
            return <Redirect to='/tipoviPregleda' />;
        }

        if(this.state.po==='NOVI'){
            return <Redirect to='/unosPregleda' />;
        }

        if(this.state.po==='FORMA'){
            return <Odgovor vrati={this.renderOdgovora}/>
        }

        if(this.state.po==='IZMENA'){
            this.setState({
                openModal: true,
            });
        }



    }

    renderComponent(){
        if(this.props.prijavljenKorisnik!=null){
            return (
                <div>
                    <div style={{ float: "left"}}>
                        <div className="ui secondary  menu">
                            <a className="item" onClick={(e)=>{ this.setState({po: 'NOVI'});}}> Unesi Novi pregled</a>
                            <a className="item" > Sale za pregled i operacije</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'TIPOVI'});}}>Tipovi pregleda</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'ZAHTEV'});}}> Zahtevi</a>
                            <a className="item" onClick={(e)=>{this.handleClick(e); this.props.vratiKorisnika(e);}}> Izmeni podatke</a>
                        </div>
                    </div>
                    <div style={{ float: "right"}}> 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="ui blue image label" onClick={(e) => { this.setState({po: 'SESTRA'});}}>
                                    <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg"/>{this.props.prijavljenKorisnik.username}
                                        <div className="detail">{this.props.prijavljenKorisnik.role}</div> 
                                </a> 
                                
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {this.renderPac()}
                    </div>    
                </div>
            );     
        }
        return <Spinner poruka="Ucitavanje"/>
    }



  render() {
      return (
        <div>

            {this.renderComponent()}
                
            <IzmenaPodataka prijavljenKorisnik={this.props.prijavljenKorisnik} openModal={this.state.openModal} closeModal={this.closeModal} /> 
          {/*
         

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

            <button className="Izmeni_svoje_podatke" onClick = { (e) => { this.handleClick(e); this.props.izmeni_priavljenog_korisnika(e); }}>Izmeni</button> 
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
        zahtevi: state.auth.sviZahtevi,
        odgovor2: state.auth.odgovor2

    }
}

const mapDispatchToProps = dispatch => {
    return {
        prikazi_sale: () => dispatch(actions.sale()),
        prikazi_doktore: () => dispatch(actions.doktori()),
        prikazi_tipove_pregleda: () => dispatch(actions.tipoviPregleda()),

        prikazi_preglede: () => dispatch(actions.pregledi()),
        vratiKorisnika: () => dispatch(actions.prijavljenKorisnik()),
        sviZahtevi: () => dispatch(actions.vratiZahteve()),
        brisiZahtev: (tip, datum, doktorId, adminId, posiljalacId) => dispatch(actions.brisiZahtev(tip, datum, doktorId, adminId, posiljalacId)),
        slanjePotvrdnogMaila: (mailFrom, mailTo, dodatak) => dispatch(actions.slanjePotvrdnogMaila(mailFrom, mailTo, dodatak))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AKlinike);