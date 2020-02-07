import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {updateObject} from '../../../../shared/utility';
import ListaTipovaPregleda from '../../AKlinike/ListaTipovaPregleda';
import ListaKlinika_Pretraga from './ListaKlinika_Pretraga';


class PretragaKlinika extends React.Component {

    state = {
        naziv: '',
        grad: '',
        tip: '',
        brLajkova: '',
        pretraziTip: true,
           
        sale: null,
        doktori: null,
        tipoviPregleda: null,

        sviPregledi: null,

        staPretrazi: false,
            
            
        klinikee: null,
        pronadjeneKlinike: null,

        pronadjeniDoktori: null,
        pronadjenPregled: null,
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

    handleNazivKlinike = (e) => {
        this.setState({
            naziv: e.target.value,
        });
    };

    handleGradKlinike = (e) => {
        this.setState({
            grad: e.target.value,
        });
    };

    handleLajkoviKlinike = (e) => {
        this.setState({
            brLajkova: e.target.value,
        });
    };

    handlePretraziPoTipu = (e) => {
        this.setState({
            pretraziTip: e.target.checked,
        });
    };

   
    render() {
        return (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h2>Pretraga svih klinika </h2>
                    </div>    
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        
                        <div className="ui form">
                            <div className="field">
                                <label>Naziv</label>
                                <input type="text" placeholder="Naziv" value={this.state.naziv} onChange={(e) => {this.setState({naziv: e.target.value});}} />
                            </div>
                            <div className="field">
                                <label>Grad</label>
                                <input type="text"  placeholder="Grad" value={this.state.grad} onChange={(e) => {this.setState({grad: e.target.value});}} />
                            </div>
                            <div className="field">
                                <label>Broj lajkova</label>
                                <input type="number" placeholder="Lajkovi" value={this.state.brLajkova} onChange={(e) => {this.setState({brLajkova: e.target.value});}} />
                            </div>
                        
                            <div className="field">
                                <label>Tip pregleda</label>
                                <div className="ui select">
                                <select value={this.state.tip} onChange={(e) => {this.setState({tip: e.target.value});}}>
                                    <option></option>
                                    <ListaTipovaPregleda  tipoviPregleda={this.props.tipoviPregleda}/> 
                                </select>
                                </div>
                            </div>
                            <button className="ui button"  onClick={ (e) => {this.props.pretraga('', this.state.naziv, this.state.grad, this.state.brLajkova, this.state.tip);}}>Pretrazi</button>
                        </div>

                        </div>

                        <br/>
                        <br/>
                        <br/>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h3>Pronadjene klinike</h3>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <ListaKlinika_Pretraga  tip={this.state.tip} pretraziTip={this.state.pretraziTip} klinike={this.props.pretragaа} doktori={this.props.doktori} pregled={this.state.tip} />

                        </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.auth.pretraga);
    return {
        sale: state.auth.sale,
        tipoviPregleda: state.auth.tipoviPregleda,
        klinikee: state.auth.klinike,
        sviPregledi: state.auth.sviPregledii,
        pretragaа: state.auth.pretraga
    }
}

const mapDispatchToProps = dispatch => {
    return {
       // unesiPregled: (naziv, opis, tip, sala, lekar, cena, datumVreme, trajanje) => 
         //   dispatch(actions.unosPregleda(naziv, opis, tip, sala, lekar, cena, datumVreme, trajanje)),
        
         prikazi_klinike: () => dispatch(actions.klinike()),
         pretraga: (id, naziv, grad, lajkovi, tip) => dispatch(actions.pretraziKlinike(id, naziv, grad, lajkovi, tip))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PretragaKlinika);