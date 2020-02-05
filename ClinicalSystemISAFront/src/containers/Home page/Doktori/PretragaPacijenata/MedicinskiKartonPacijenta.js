import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {updateObject} from '../../../../shared/utility';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import IstorijaPregledaPacijenta from './IstorijaPregledaPacijenta';
import { Redirect } from 'react-router';


class MedicinskiKartonPacijenta extends React.Component {

    state = {
       obelezenPacijent: null,
       sviPregledi: null,
       redirectDetalji: false,

       preglediTogPacijenta: [],
    }

    componentDidMount() {
        this.props.lista_tipova_pregleda();
        this.props.bolestii();
        this.props.lekovii();
        this.props.prijavljen_korisnik();

        this.props.svi_pregledi();
        this.preglediSamoTogPacijenta();
    }

    setRedirect(){
        this.setState({
            redirectDetalji: true
        })
    }

    redirectDetaljiPregleda() {

        if (this.state.redirectDetalji)
            return <Redirect to='/detaljiPregleda'></Redirect>
    }

    preglediSamoTogPacijenta() {
        let noviPregledi = [];

        console.log(this.props.sviPregledi)

        if (this.props.sviPregledi !== null && this.props.sviPregledi !== undefined)
        {
            for (let i=0; i<this.props.sviPregledi.length; i++)
            {
                if (this.props.sviPregledi[i].idPacijenta === this.props.obelezenPacijent.id)
                {
                    console.log('Udjes li ovamo');
                    noviPregledi.push(this.props.sviPregledi[i]);
                }
            }
        }
        this.setState({
            preglediTogPacijenta: noviPregledi
        })
    }


    renderMedicinskiKarton() {
        if (this.props.obelezenPacijent !== null && this.props.obelezenPacijent !== undefined)
        {
            return (
                <div>
                <h2>Medicinski karton pacijenta: </h2>
                <h4>{this.props.obelezenPacijent.firstName} {this.props.obelezenPacijent.lastName}</h4>
                <form className="ui form">
                    <div className="field">
                        <label>{this.props.obelezenPacijent.email} JBP: {this.props.obelezenPacijent.id}</label>
                    </div>
                    <div className="field">
                        <label>{this.props.obelezenPacijent.country} {this.props.obelezenPacijent.city}</label>
                    </div>
                  
                    <div className="field">
                        <label>Istorija svih pregleda: </label>
                            <div className="ui select">
                                <IstorijaPregledaPacijenta  istorijaPregleda={this.state.preglediTogPacijenta}/> 
                        </div>
                    </div>
                    <Button onClick={(e) => {this.setRedirect(e);}}>Prikazi vise</Button>
                </form>

                </div>
            );
        }
    }
    


    render() {
        return (
            <div>
                {this.renderMedicinskiKarton()}
                {this.redirectDetaljiPregleda()}
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
         prikazi_klinike: () => dispatch(actions.klinike()),

         lista_tipova_pregleda: () => dispatch(actions.tipoviPregleda()),
         bolestii: () => dispatch(actions.bolesti()),
         lekovii: () => dispatch(actions.lekovi()),

        prijavljen_korisnik: () => dispatch(actions.prijavljenKorisnik()),
        svi_pregledi: () => dispatch(actions.pregledi())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicinskiKartonPacijenta);