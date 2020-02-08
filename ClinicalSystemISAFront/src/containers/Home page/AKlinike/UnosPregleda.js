import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {updateObject} from '../../../shared/utility';
import ListaSala from './ListaSala';
import ListaDoktora from './ListaDoktora';
import ListaTipovaPregleda from './ListaTipovaPregleda';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class UnosPregleda extends React.Component {

    state = {
        auth: {
            naziv: '',
            opis: '',
            tip: '',
            sala: '',
            lekar: '',
            cena: null,
            datumVreme: null,
            trajanje: null,

            sale: null,
            doktori: null,
            tipoviPregleda: null
            
        }
    }

    componentDidMount(){
        this.setState({datumVreme: new Date()});
        this.props.svi_lekari();
        this.props.sve_sale();
        this.props.svi_tipovi_regleda();
    }

    pregledHandler = (event) => {
        event.preventDefault();

        console.log(this.state.auth.naziv, this.state.auth.opis, this.state.auth.tip, 
            this.state.auth.sala, this.state.auth.lekar, this.state.auth.cena, this.state.datumVreme, this.state.auth.trajanje);

        let podaci = {
            naziv: this.state.auth.naziv,
            opis: this.state.auth.opis,
            tip: this.state.auth.tip,
            sala: this.state.auth.sala,
            lekar: this.state.auth.lekar,
            cena: this.state.auth.cena,
            datumVreme: this.state.datumVreme,
            trajanje: this.state.auth.trajanje,
        }
        if (podaci.naziv === null || podaci.naziv === undefined || podaci.naziv === ''
        || podaci.opis === null || podaci.opis === undefined || podaci.opis === ''
        || podaci.tip === null || podaci.tip === undefined || podaci.tip === ''
        || podaci.sala === null ||podaci. sala === undefined || podaci.sala === ''
        || podaci.lekar === null || podaci.lekar === undefined || podaci.lekar === ''
        || podaci.cena === null || podaci.cena === undefined || podaci.cena === ''
        || podaci.datumVreme === null || podaci.datumVreme === undefined || podaci.datumVreme === ''
        || podaci.trajanje === null || podaci.trajanje === undefined || podaci.trajanje === '')
        {
            alert('Neispravno uneti podaci.');
        }
        else{
            this.props.unesiPregled(podaci);
            this.props.rezervisi('', podaci.sala, podaci.datumVreme);  
        }
            
    };

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    selectChangeHandler = (event, type) => {
        console.log(event.target.value);

        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    promeni(date){
        const sada = new Date();
        if(moment(sada).isBefore(date)){
            console.log(date);
            this.setState({datumVreme: date});

        }
    }

    render() {
        return (
            <div>
            <h2>Unos novog pregleda </h2>
            <form className="ui form">
                <div className="field">
                    <label>Naziv</label>
                    <input type="text" placeholder="Naziv"
                    onChange={(event) => this.inputChangeHandler(event, 'naziv')} />
                </div>
                <div className="field">
                    <label>Opis</label>
                    <input type="text"  placeholder="Opis"
                    onChange={(event) => this.inputChangeHandler(event, 'opis')} />
                </div>
                <div className="field">
                    <label>Cena (din)</label>
                    <input type="number" placeholder="Cena"
                    onChange={(event) => this.inputChangeHandler(event, 'cena')} />
                </div>
                <div className="field">
                    <label>Datum i vreme</label>
                    <DatePicker
                            onChange={date => this.promeni(date)}
                            selected={this.state.datumVreme}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
                <div className="field">
                    <label>Trajanje (h)</label>
                    <input type="number" placeholder="Duzina pregleda (h)"
                    onChange={(event) => this.inputChangeHandler(event, 'trajanje')} />  
                </div>
                <div className="field">
                    <label>Tip pregleda</label>
                    <div className="ui select">
                    <select onChange={(event) => this.selectChangeHandler(event, 'tip')}>
                        <ListaTipovaPregleda  tipoviPregleda={this.props.tipoviPregleda}/> 
                    </select>
                    </div>
                </div>
                <div className="field">
                    <label>Sala</label>
                    <div className="ui select">
                    <select onChange={(event) => this.selectChangeHandler(event, 'sala')}>
                        <ListaSala  sale={this.props.sale}/>  
                    </select>
                    </div>
                </div>
                <div className="field">
                    <label>Lekar</label>
                    <div className="ui select">
                    <select onChange={(event) => this.selectChangeHandler(event, 'lekar')}>
                        <ListaDoktora  doktori={this.props.doktori}/> 
                    </select>
                    </div>
                </div>
                <button class="ui button" type="submit" onClick={(event) => this.pregledHandler(event)}>Dodaj</button>
            </form>
            </div>
           
        );
    }
}

const mapStateToProps = state => {
    console.log(state.auth)
    return {
        sale: state.auth.sale,
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unesiPregled: (podaci) => 
            dispatch(actions.unosPregleda(podaci)),
        
        svi_lekari: () => dispatch(actions.doktori()),
        sve_sale: () => dispatch(actions.sale()),
        svi_tipovi_regleda: () => dispatch(actions.tipoviPregleda()),
        rezervisi: (id, idSale, datum) => dispatch(actions.rezervisiSalu2(id, idSale, datum)),


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UnosPregleda);