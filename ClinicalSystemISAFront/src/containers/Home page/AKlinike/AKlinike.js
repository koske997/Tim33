import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import IzmenaPodataka from '../IzmenaPodatakaKorisnika/IzmeniPodatke';
import KarticaZahteva from './KarticaZahteva';
import ListaZahteva from './ListaZahteva';
import Spinner from '../Spinner';
import Odgovor from './Odgovor';
import Sala from './Sala';
import ModalKlinike from "./ModalKlinike";


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
    zapamcenitip: null,
    zapamcenid: null,
    zapamcenidatum: null,
    prijavljenKorisnik: null,
    openModal: false,
    openModal2: false,


    klinike: null,
    klinikaAdmina: null,
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
        this.props.prikazi_sale();
        this.props.sve_klinike();
        this.pronadjiKlinikuAdmina();
    }



    obradiZahtev = (id, str, tip, datum) => {
        console.log(id);
        console.log(str);
        console.log(tip);
        console.log('DATUM PRVO VAMOOOO!!!!!!!!!!!!!!!');
        console.log(datum);
        if(str==='ODB'){
            this.setState({po: 'FORMA', zapamcenid: id});
        }else{
            if(tip==='odsustvo' || tip==='godisnji'){
                this.props.slanjePotvrdnogMaila(this.props.prijavljenKorisnik.username,'Prihvati',id);
                this.props.brisiZahtev('', '', id, '', '');
                this.props.sviZahtevi();
                this.setState({po: 'OSVEZI'});
            }else{
                this.setState({po: 'FORMA2', zapamcenid: id, zapamcenitip: tip, zapamcenidatum: datum});
            }
            {/* 
            this.props.slanjePotvrdnogMaila(this.props.prijavljenKorisnik.username,'Prihvati',id);
            this.props.brisiZahtev('', '', id, '', '');
            this.props.sviZahtevi();
            this.setState({po: 'OSVEZI'});*/}
            
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

    renderSala = (idSale) => {
            this.props.slanjePotvrdnogMaila(this.props.prijavljenKorisnik.username,'Prihvati',this.state.zapamcenid);
            this.props.unesiPregled(`${this.state.zapamcenitip} pregled`, '', this.state.zapamcenitip, idSale, this.state.zapamcenid, '', '', '');
            this.props.rezervisi(this.state.zapamcenid,idSale,'');  
            this.props.brisiZahtev('', '', this.state.zapamcenid, '', '');
            this.props.sviZahtevi();
            this.setState({po: 'OSVEZI'});
    }

    pronadjiKlinikuAdmina(){
        if (this.props.prijavljenKorisnik !== null && this.props.prijavljenKorisnik !== undefined &&
            this.props.klinike !== null && this.props.klinike !== undefined)
            {
                for (let i=0; i<this.props.klinike.length; i++)
                {
                    for (let j=0; j<this.props.klinike[i].user.length; j++)
                    {
                        if (this.props.prijavljenKorisnik.id === this.props.klinike[i].user[j].id)
                        {
                            this.setState({klinikaAdmina: this.props.klinike[i]})
                        }
                    }
                }
            }
    }

    handleClick2 = id => {
 
        this.setState({
            openModal2: true,
        });
      }
      
    closeModal2 = () => {
        this.setState({
            openModal2: false,
        });
      }
    
    renderKlinikeAdmina() {
        if (this.state.klinikaAdmina !== null && this.state.klinikaAdmina !== undefined)
        {
        return (          
            <div className="ui link cards">
                <div className="card" onClick={(e) => {this.handleClick2(e)}}>
                    <div className="image">
                        <img alt="da" src={this.state.klinikaAdmina.picture}/>
                    </div>
                <div className="content">
                    <div className="header">{this.state.klinikaAdmina.name}</div>
                    <br/> <br />
                    <div className="meta">
                        <a>Likes: {this.state.klinikaAdmina.likes}</a>
                    </div>
                    <div className="description">
                        {this.state.klinikaAdmina.city}
                        {this.state.klinikaAdmina.address}

                    </div>
                </div>
                <div className="extra content">
                    <span className="right floated">
                    Prosecna ocena: {this.state.klinikaAdmina.ocena}
                    </span>
                    <span>
                        <i className="user icon"></i>
                        {this.state.klinikaAdmina.user.length}
                    </span>
                </div>
                </div>
            </div>
        ); 
        }
    }

    renderPac(){
        if(this.state.po==='ZAHTEV'){
            return <div>{this.renderZahteva()}</div>
        }

        if(this.state.po==='OSVEZI' && this.props.odgovor2==201){
            return <div className="ui success message"><div className="header">Odgovor poslat!</div><p>Vas odgovor je uspesno poslat na odrediste.</p></div>
        }

        if(this.state.po==='OSVEZI' && this.props.odgovor2!=201){
            return <Spinner poruka="Slanje odgovora"/>
        }

        if(this.state.po==='TIPOVI'){
            return <Redirect to='/tipoviPregleda' />;
        }

        if(this.state.po === 'SALE'){
            return <Redirect to='/saleZaPregled' />
        }

        if(this.state.po === 'IZVESTAJ'){
            return <Redirect to='/izvestajAdmina' />
        }

        if(this.state.po === 'LEKARI')
        {
            return <Redirect to='/lekari' />
        }

        if(this.state.po === 'KLINIKA')
        {
            return this.renderKlinikeAdmina();
        }

        if(this.state.po==='NOVI'){
            return <Redirect to='/unosPregleda' />;
        }

        if(this.state.po==='FORMA'){
            return <Odgovor vrati={this.renderOdgovora}/>;
        }

        if(this.state.po==='FORMA2'){
            return <Sala vraceno={this.renderSala} sale={this.props.sale} datum={this.state.zapamcenidatum}/>;
        }

        if(this.state.po==='IZLOGUJ'){
            sessionStorage.clear();
            return <Redirect to='/login'/>
        }

        if(this.state.po==='IZMENA'){
            this.setState({
                openModal: true,
            });
        }
    }

    prijavljenJeKo() {
        if (this.props.prijavljenKorisnik !== null && this.props.prijavljenKorisnik !== undefined)
        {
          console.log('AAAAAAAAAAAAAAA')
          if ( this.props.prijavljenKorisnik.role === 'DOCTOR')
            return <Redirect to="/doktor" />;
  
          if( this.props.prijavljenKorisnik.role === 'PATIENT')
            return <Redirect to="/pacijenti" />
  
          if( this.props.prijavljenKorisnik.role === 'NURSE')
            return <Redirect to="/medSestra" />
        }
    }

    renderComponent(){
        if(this.props.prijavljenKorisnik!=null){
            return (
                <div>
                    <div style={{ float: "left"}}>
                        <div className="ui secondary  menu">
                            <a className="item" onClick={(e)=>{ this.setState({po: 'NOVI'});}}> Unesi Novi pregled</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'SALE'})}}> Sale za pregled i operacije</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'TIPOVI'});}}>Tipovi pregleda</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'ZAHTEV'});}}> Zahtevi</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'IZVESTAJ'});}}> Izvestaj o poslovanju klinike</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'LEKARI'});}}> Lekari</a>
                            <a className="item" onClick={(e)=>{this.pronadjiKlinikuAdmina(e); this.setState({po: 'KLINIKA'});}}> Klinika</a>
                            <a className="item" onClick={(e)=>{this.handleClick(e); this.props.vratiKorisnika(e);}}> Izmeni svoje podatke</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'IZLOGUJ'});}}> Izloguj se</a>
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
            {this.prijavljenJeKo()}
            <ModalKlinike poslataKlinika={this.state.klinikaAdmina} openModal={this.state.openModal2} closeModal={this.closeModal2} />
            <IzmenaPodataka prijavljenKorisnik={this.props.prijavljenKorisnik} openModal={this.state.openModal} closeModal={this.closeModal} /> 
          
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
        odgovor2: state.auth.odgovor2,

        klinike: state.auth.klinike,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        prikazi_sale: () => dispatch(actions.sale()),
        prikazi_doktore: () => dispatch(actions.doktori()),
        prikazi_tipove_pregleda: () => dispatch(actions.tipoviPregleda()),
        unesiPregled: (naziv, opis, tip, sala, lekar, cena, datumVreme, trajanje) => dispatch(actions.zakaziPregled(naziv, opis, tip, sala, lekar, cena, datumVreme, trajanje)),

        rezervisi: (id, idSale, datum) => dispatch(actions.rezervisiSalu(id, idSale, datum)),
        prikazi_preglede: () => dispatch(actions.pregledi()),
        vratiKorisnika: () => dispatch(actions.prijavljenKorisnik()),
        sviZahtevi: () => dispatch(actions.vratiZahteve()),
        brisiZahtev: (tip, datum, doktorId, adminId, posiljalacId) => dispatch(actions.brisiZahtev(tip, datum, doktorId, adminId, posiljalacId)),
        slanjePotvrdnogMaila: (mailFrom, mailTo, dodatak) => dispatch(actions.slanjePotvrdnogMaila(mailFrom, mailTo, dodatak)),
   
        sve_klinike: () => dispatch(actions.klinike())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AKlinike);