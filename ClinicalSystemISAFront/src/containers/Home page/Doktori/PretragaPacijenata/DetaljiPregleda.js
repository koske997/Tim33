import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {updateObject} from '../../../../shared/utility';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import IstorijaPregledaPacijenta from './IstorijaPregledaPacijenta';
import { Redirect } from 'react-router';


class DetaljiPregleda extends React.Component {

    state = {
       obelezenPacijent: null,
       sviPregledi: null,
       redirectDetalji: false,

       pregledKarton: null,
    }

    componentDidMount() {
        /*this.props.lista_tipova_pregleda();
        this.props.bolestii();
        this.props.lekovii();
        this.props.prijavljen_korisnik();

        this.props.svi_pregledi();*/
    }


    renderMedicinskiKarton() {
        if (this.props.pregledKarton !== null && this.props.pregledKarton !== undefined)
        {
            return (
                <div>
                <h2>{this.props.pregledKarton.name} {this.props.pregledKarton.type}</h2>
                <form className="ui form">
                    <div className="field">
                        <label>{this.props.pregledKarton.description} ID : {this.props.pregledKarton.id}</label>
                    </div>
                    <div className="field">
                        <label>Cena pregleda: {this.props.pregledKarton.price}</label>
                    </div>
                    <div className="field">
                        <label>Trajanje pregleda: {this.props.pregledKarton.duration}</label>
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

        obelezenPacijent: state.auth.obelezenPacijent,

        prijavljenKorisnik: state.auth.prijavljenKorisnik,*/

        pregledKarton: state.auth.pregledKarton,
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetaljiPregleda);