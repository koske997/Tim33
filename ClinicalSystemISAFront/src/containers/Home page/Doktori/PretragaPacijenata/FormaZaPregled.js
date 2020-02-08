import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {updateObject} from '../../../../shared/utility';
import ListaTipovaPregleda from '../../AKlinike/ListaTipovaPregleda';
import ListaBolesti from './ListaBolesti';
import ListaLekova from './ListaLekova';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class FormaZaPregled extends React.Component {

    state = {
        naziv: '',
        opis: '',
        tip: '',
        bolest: '',
        lek: '',
        cena: null,

        lekovi: null,
        bolesti: null,

        sale: null,
        doktori: null,
        tipoviPregleda: null,

        sviPregledi: null,

        prijavljenKorisnik: null,            
            
        klinikee: null,
        pronadjeneKlinike: null,

        pronadjeniDoktori: null,
        pronadjenPregled: null,
        datum: null

    }

    componentDidMount() {
        this.props.lista_tipova_pregleda();
        this.props.bolestii();
        this.props.lekovii();
        this.props.prijavljen_korisnik();
        this.state.datum = new Date();
    }


    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    selectChangeHandler = (e) => {

        this.setState({
            tip: e.target.value,
        });
    }

    selectChangeHandler2 = (e) => {

        this.setState({
            bolest: e.target.value,
        });
    }

    selectChangeHandler3 = (e) => {

        this.setState({
            lek: e.target.value,
        });
    }


    handleNaziv = (e) => {
        this.setState({
            naziv: e.target.value,
        });
    };

    handleOpis = (e) => {
        this.setState({
            opis: e.target.value,
        });
    };

    handleCena= (e) => {
        this.setState({
            cena: e.target.value,
        });
    };

    promeni(date){
        const sada = new Date();
        if(moment(sada).isBefore(date)){
            this.setState({datum: date});
        }
    }

    pripremiZaUnos = (e) => {
        e.preventDefault();
        let dv = new Date();

        const pregled = {
            idPacijenta: this.props.obelezenPacijent.id,
            idLekara: this.props.prijavljenKorisnik.id,
            naziv: this.state.naziv,
            opis: this.state.opis,
            cena: this.state.cena,
            tip: this.state.tip,
            bolest: this.state.bolest,
            lek: this.state.lek,
            datumVreme: dv,
        };
        console.log(pregled);

        if (this.state.naziv === null || this.state.naziv === undefined || this.state.naziv === '' ||
            this.state.opis === null || this.state.opis === undefined || this.state.opis === '' ||
            this.state.cena === null || this.state.cena === undefined || this.state.naziv < 0 ||
            this.state.tip === null || this.state.tip === undefined || this.state.tip === '' ||
            this.state.bolest === null || this.state.bolest === undefined || this.state.bolest === '' ||
            this.state.lek === null || this.state.lek === undefined || this.state.lek === '')
                alert('Neispravno uneti podaci.');
        else
            this.props.unesiPregled(pregled);
    }

    srediPregled = () => {
        this.props.posalji(this.state.tip, this.state.datum, this.props.prijavljenKorisnik.id, '', this.props.obelezenPacijent.id);
        this.props.posaljiMail(this.props.prijavljenKorisnik.username, this.state.tip, this.state.datum);
    }

    render() {
        return (
            <div>
            <h2>Trenutni pregled </h2>
            <div>
            <form className="ui form">
                <div className="field">
                    <label>Naziv</label>
                    <input type="text" placeholder="Naziv"
                    value={this.state.naziv} onChange={this.handleNaziv} />
                </div>
                <div className="field">
                    <label>Misljenje lekara</label>
                    <input type="text"  placeholder="Opis"
                   value={this.state.opis} onChange={this.handleOpis} />
                </div>
                <div className="field">
                    <label>Troskovi pregleda</label>
                    <input type="number" placeholder="Cena"
                    value={this.state.cena} onChange={this.handleCena} />
                </div>
               
                <div className="field">
                    <label>Tip pregleda</label>
                    <div className="ui select">
                    <select value={this.state.tip} onChange={ this.selectChangeHandler}>
                        <ListaTipovaPregleda  tipoviPregleda={this.props.tipoviPregleda}/> 
                    </select>
                    </div>
                </div>

                <div className="field">
                    <label>Sifra bolesti</label>
                    <div className="ui select">
                    <select value={this.state.bolest} onChange={ this.selectChangeHandler2}>
                        <ListaBolesti bolesti={this.props.bolesti}/> 
                    </select>
                    </div>
                </div>

                <div className="field">
                    <label>Lekovi</label>
                    <div className="ui select">
                    <select value={this.state.lek} onChange={ this.selectChangeHandler3}>
                        <ListaLekova lekovi={this.props.lekovi}/> 
                    </select>
                    </div>
                </div>

                <Button class="ui button" type="submit" onClick={ (e) => {this.pripremiZaUnos(e); }}>Zavrsi</Button>
                <Button class="ui button" type="submit" onClick={ (e) => {this.props.prikazi_klinike(e); }}>Odbaci</Button>

            </form>
            </div>
            <br/>
            <br/>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <br/>
                <br/>
                <DatePicker 
                onChange={date => this.promeni(date)}
                selected={this.state.datum}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="ui button" type="submit" onClick={ (e) => {this.srediPregled(); }}>Zakazi novi pregled</Button>
            </div>


            </div>
           
        );
    }
}

const mapStateToProps = state => {
    console.log(state.auth);
    return {
        sale: state.auth.sale,
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda,
        odgovor: state.auth.odgovor3,
        klinikee: state.auth.klinike,

        sviPregledi: state.auth.sviPregledii,

        bolesti: state.auth.sveBolesti,
        lekovi: state.auth.sviLekovi,

        obelezenPacijent: state.auth.obelezenPacijent,

        prijavljenKorisnik: state.auth.prijavljenKorisnik,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unesiPregled: (pregled) => dispatch(actions.unosPregledaDoktora(pregled)),

         prikazi_klinike: () => dispatch(actions.klinike()),

         lista_tipova_pregleda: () => dispatch(actions.tipoviPregleda()),
         bolestii: () => dispatch(actions.bolesti()),
         lekovii: () => dispatch(actions.lekovi()),
         posaljiMail: (mailFrom, mailTo, dodatak) => dispatch(actions.slanjeDoktorovogMaila(mailFrom, mailTo, dodatak)),
        posalji: (tip, datum, doktorId, adminId, posiljalacId) => dispatch(actions.slanjeZahteva(tip, datum, doktorId, adminId, posiljalacId)),
        prijavljen_korisnik: () => dispatch(actions.prijavljenKorisnik())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormaZaPregled);