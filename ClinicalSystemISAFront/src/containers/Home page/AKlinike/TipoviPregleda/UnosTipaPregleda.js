import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {updateObject} from '../../../../shared/utility';




class UnosTipaPregleda extends React.Component {

    state = {
        auth: {
            naziv: '',
            

            sale: null,
            doktori: null,
            tipoviPregleda: null
            
        }
    }

    pregledHandler = (event) => {
        event.preventDefault();

        console.log(this.state.auth.naziv);

        this.props.unesiTipPregleda(this.state.auth.naziv);
    };

    inputChangeHandler = (event, type) => {
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
               
                <button class="ui button" type="submit" onClick={(event) => this.pregledHandler(event)}>Dodaj</button>
            </form>
            </div>
           
        );
    }
}

const mapStateToProps = state => {

    return {
        sale: state.auth.sale,
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unesiTipPregleda: (naziv) => dispatch(actions.unosTipaPregleda(naziv))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UnosTipaPregleda);