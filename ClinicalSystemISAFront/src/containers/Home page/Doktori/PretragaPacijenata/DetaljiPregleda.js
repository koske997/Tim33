import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {updateObject} from '../../../../shared/utility';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import IstorijaPregledaPacijenta from './IstorijaPregledaPacijenta';
import { Redirect } from 'react-router';
import IzmeniPregled from './IzmeniPregled';


class DetaljiPregleda extends React.Component {

    state = {
        openModal: false,

       obelezenPacijent: null,
       sviPregledi: null,
       redirectDetalji: false,

       pregledKarton: null,

       po: '',
       sviLekari: [],
       lekarPregleda: null,

       sveKlinike: [],
       klinikaPregleda: null,

       ocenaKlinike: null,
       ocenaLekara: null,

       sveBolesti: [],


    }

    componentDidMount() {
        /*this.props.lista_tipova_pregleda();
        this.props.bolestii();
        this.props.lekovii();
        this.props.prijavljen_korisnik();

        this.props.svi_pregledi();*/

        this.props.svi_doktori();
        this.props.sve_klinike();
        this.pronadjiLekaraPregleda();
        this.pronadjiKlinikuPregleda();

        console.log(this.props.pregledKarton)

        this.setState({
            pregledKarton: this.props.pregledKarton
        })
    }

    selectChangeHandler = (e) => {

        this.setState({
            ocenaKlinike: e.target.value,
        });
    }

    selectChangeHandler2 = (e) => {

        this.setState({
            ocenaLekara: e.target.value,
        });
    }

    pripremiZaOcenjivanjeKlinike() {
        if (this.state.ocenaKlinike !== null && this.state.ocenaKlinike !== undefined)
        {

            const podaci = {
                id: this.state.klinikaPregleda.id,
                idPregleda: this.props.pregledKarton.id,
                ocena: this.state.ocenaKlinike
            }
            if (this.props.pregledKarton.ocenjenaKlinika === true)
                alert('Ne mozete dva puta oceniti kliniku u sklopi jednog pregled.')
            else
                this.props.posalji_ocenu_klinike(podaci);
                this.props.sve_klinike();
                //window.location.reload();

        }
    }

    pripremiZaOcenjivanjeLekara() {
        if (this.state.ocenaLekara !== null && this.state.ocenaLekara !== undefined)
        {
            const podaci = {
                id: this.state.lekarPregleda.id,
                idPregleda: this.props.pregledKarton.id,
                ocena: this.state.ocenaLekara
            }
            if (this.props.pregledKarton.ocenjenLekar === true)
                alert('Ne mozete dva puta oceniti lekara u sklopi jednog pregled.')
            else
                this.props.posalji_ocenu_lekara(podaci);
                this.props.svi_doktori();
                //window.location.reload();

        }
    }
    

    pronadjiLekaraPregleda() {
        if (this.props.sviLekari !== null && this.props.sviLekari !== undefined)
        {
            for (let i=0; i<this.props.sviLekari.length; i++)
            {
                console.log(this.props.pregledKarton.idLekara);
                console.log(this.props.sviLekari[i].id);
                if (this.props.sviLekari[i].id === this.props.pregledKarton.idLekara)
                {
                    console.log('Udjes li?31');
                    this.setState({
                        lekarPregleda: this.props.sviLekari[i]
                    })
                }
            }
        }
    }

    pronadjiKlinikuPregleda() {
        if(this.props.sveKlinike != null && this.props.sveKlinike != undefined 
            && this.props.sviLekari !== null && this.props.sviLekari !== undefined)
        {
            for (let i=0; i<this.props.sviLekari.length; i++)
            {
                console.log(this.props.pregledKarton.idLekara);
                console.log(this.props.sviLekari[i].id);
                if (this.props.sviLekari[i].id === this.props.pregledKarton.idLekara)
                {

                    for (let j=0; j<this.props.sveKlinike.length; j++)
                    {
                        for (let k=0; k<this.props.sveKlinike[j].user.length; k++)
                        {
                            if (this.props.sviLekari[i].id === this.props.sveKlinike[j].user[k].id)
                            {
                                console.log('Udjes li?98');
                                console.log(this.props.sveKlinike[j]);
                                this.setState({
                                    lekarPregleda: this.props.sviLekari[i],
                                    klinikaPregleda: this.props.sveKlinike[j],
                                })
                            }
                        }
                    }
                }
            }
        }
    }

    renderPac(){
        if (this.state.po==='DETALJI PREGLEDA'){
            return this.renderDetaljiPregleda();
        }
        if (this.state.po==='OCENI KLINIKU'){
            return this.renderOceneKlinike();
        }
        if (this.state.po==='OCENI LEKARA'){
            return this.renderOceneLekara();
        }
    }

    renderDetaljiPregleda() {
        if (this.props.pregledKarton !== null && this.props.pregledKarton !== undefined)
        {
            return (          
                <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <form className="ui form">
                        <div className="field">
                            <b>{this.props.pregledKarton.name} {this.props.pregledKarton.type}</b>
                            <label>{this.props.pregledKarton.description} ID : {this.props.pregledKarton.id}</label>
                        </div>
                        <div className="field">
                            <label>Cena pregleda: {this.props.pregledKarton.price}</label>
                        </div>
                        <div className="field">
                            <label>Trajanje pregleda: {this.props.pregledKarton.duration}</label>
                        </div>
                        <div className="field">
                            <label>Ustanovljena bolest: {this.props.pregledKarton.sicks[0].name}</label>
                        </div>
                        <Button onClick={(e) => {this.handleClick(e); }}>Izmeni pregled</Button>
                    </form>
                </div>
            );
        }
    }

    renderOceneKlinike() {
        if (this.state.klinikaPregleda !== null && this.state.klinikaPregleda !==undefined)
        {
            return (          
                <div className="ui link cards">
                    <div className="card">
                        <div className="image">
                            <img alt="da" src={this.state.klinikaPregleda.picture}/>
                        </div>
                    <div className="content">
                        <div className="header">{this.state.klinikaPregleda.name}</div>
                        <br/> <br />
                        <div className="header">
                            <select value={this.state.ocenaKlinike} onChange={ this.selectChangeHandler}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                            <Button onClick={(e) => {this.pripremiZaOcenjivanjeKlinike(e)}}>Unesi</Button>
                        </div>
                        <br/> <br/>
                        <div className="meta">
                            <a>Likes: {this.state.klinikaPregleda.likes}</a>
                        </div>
                        <div className="description">
                            {this.state.klinikaPregleda.city}
                        </div>
                    </div>
                    <div className="extra content">
                        <span className="right floated">
                        Ocena: {this.state.klinikaPregleda.ocena}
                        </span>
                        <span>
                            <i className="user icon"></i>
                            {this.state.klinikaPregleda.user.length}
                        </span>
                    </div>
                    </div>
                </div>
            ); 
        }
    }

    renderOceneLekara() {
        if (this.state.lekarPregleda !== null && this.state.lekarPregleda !== undefined)
        {
            return (          
                <div className="ui link cards">
                    <div className="card">
                        <div className="image">
                            <img alt="da" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
                        </div>
                    <div className="content">
                        <div className="header">{this.state.lekarPregleda.firstName} {this.state.lekarPregleda.lastName}</div>
                        <br/> <br />
                        <div className="header">
                            <select value={this.state.ocenaLekara} onChange={ this.selectChangeHandler2}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                            <Button onClick={(e) => {this.pripremiZaOcenjivanjeLekara(e)}}>Unesi</Button>
                        </div>
                        <br/> <br/>
                        <div className="meta">
                            <a>{this.state.lekarPregleda.role}</a>
                        </div>
                        <div className="description">
                            {this.state.lekarPregleda.address}, {this.state.lekarPregleda.city}, {this.state.lekarPregleda.country} 
                        </div>
                    </div>
                    <div className="extra content">
                        <span className="right floated">
                        Ocena: {this.state.lekarPregleda.ocena} tel: {this.state.lekarPregleda.phoneNumber}
                        </span>
                        <span>
                            <i className="user icon"></i>
                            {this.state.lekarPregleda.username}
                        </span>
                    </div>
                    </div>
                </div>
            );
        }
    }


    handleClick(e) {
        e.preventDefault();

        this.setState({
            openModal: true,
        });
      }
      
      closeModal = () => {
        this.setState({
            openModal: false,
        });
      }
    


    render() {
        return (
            <div>
                <IzmeniPregled trenutniPregled={this.props.pregledKarton} openModal={this.state.openModal} closeModal={this.closeModal} /> 
                <div style={{ float: "center"}}>
                    <div className="ui secondary  menu">
                        <a className="item" onClick={(e)=>{ this.setState({po: 'DETALJI PREGLEDA'});}}>Detalji pregleda</a>
                        <a className="item" onClick={(e)=>{this.pronadjiKlinikuPregleda(e); this.props.sve_klinike(e); this.setState({po: 'OCENI KLINIKU'});}}> Oceni kliniku</a>
                        <a className="item" onClick={(e)=>{this.pronadjiLekaraPregleda(e); this.props.svi_doktori(e); this.setState({po: 'OCENI LEKARA'}); }}>Oceni lekara</a>
                    </div>
                </div>
                <div>
                    <br /> < br/>
                    {this.renderPac()}
                </div>
           </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.auth);
    return {
        /*sale: state.auth.sale,
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda,

        klinikee: state.auth.klinike,

        sviPregledi: state.auth.sviPregledii,

        bolesti: state.auth.sveBolesti,
        lekovi: state.auth.sviLekovi,

        prijavljenKorisnik: state.auth.prijavljenKorisnik,*/

        pregledKarton: state.auth.pregledKarton,
        sviLekari: state.auth.doktori,
        sveKlinike: state.auth.klinike,

        sveBolesti: state.auth.sveBolesti,
    }
}

const mapDispatchToProps = dispatch => {
    return {
         /*prikazi_klinike: () => dispatch(actions.klinike()),

         lista_tipova_pregleda: () => dispatch(actions.tipoviPregleda()),
         bolestii: () => dispatch(actions.bolesti()),
         lekovii: () => dispatch(actions.lekovi()),

        prijavljen_korisnik: () => dispatch(actions.prijavljenKorisnik()),
        svi_pregledi: () => dispatch(actions.pregledi())*/

        bolestii: () => dispatch(actions.bolesti()),

        svi_doktori: () => dispatch(actions.doktori()),
        sve_klinike: () => dispatch(actions.klinike()),

        posalji_ocenu_klinike: (podaci) => dispatch(actions.unosOceneKlinike(podaci)),
        posalji_ocenu_lekara: (podaci) => dispatch(actions.unosOceneLekara(podaci)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetaljiPregleda);