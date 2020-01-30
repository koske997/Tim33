import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {updateObject} from '../../../shared/utility';
import ListaSala from './ListaSala';
import ListaDoktora from './ListaDoktora';
import ListaTipovaPregleda from './ListaTipovaPregleda';



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

    pregledHandler = (event) => {
        event.preventDefault();

        console.log(this.state.auth.naziv, this.state.auth.opis, this.state.auth.tip, 
            this.state.auth.sala, this.state.auth.lekar, this.state.auth.cena, this.state.auth.datumVreme, this.state.auth.trajanje);

        this.props.unesiPregled(this.state.auth.naziv, this.state.auth.opis, this.state.auth.tip, 
            this.state.auth.sala, this.state.auth.lekar, this.state.auth.cena, this.state.auth.datumVreme, this.state.auth.trajanje);
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
                    <input type="number" placeholder="Datum i vreme"
                    onChange={(event) => this.inputChangeHandler(event, 'datumVreme')} />
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
    for (const d in state.auth.doktori)
        {
            console.log(state.auth.doktori[d].firstName);
            //console.log(this.state.auth.lekar);

            //if(state.auth.doktori[d].)
        }
    return {
        sale: state.auth.sale,
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unesiPregled: (naziv, opis, tip, sala, lekar, cena, datumVreme, trajanje) => 
            dispatch(actions.unosPregleda(naziv, opis, tip, sala, lekar, cena, datumVreme, trajanje))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UnosPregleda);