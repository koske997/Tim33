import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {updateObject} from '../../../shared/utility';




class UnosSale extends React.Component {

    state = {
        auth: {
            broj: '',
            slobodna: 'Slobodna',  
        }
    }


    salaHandler = (event) => {
        event.preventDefault();

        console.log(this.state.auth.broj, this.state.auth.slobodna);

        this.props.unesiSalu(this.state.auth.broj, this.state.auth.slobodna) };

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    selectChangeHandler = (event) => {
        let updatedObject = updateObject(this.state.auth, {
            slobodna: event.target.value
        });

        this.setState({auth: updatedObject});
    }


    render() {
        return (
            <div>
                <input type="number" placeholder="Broj sale"
                    onChange={(event) => this.inputChangeHandler(event, 'broj')} />
               
               <select onChange={(event) => this.selectChangeHandler(event)}>
                    <option> Slobodna </option>
                    <option> Zauzeta </option>
                </select>
              

                <button onClick={(event) => this.salaHandler(event)}>Dodaj</button>
            </div>
        );
    }
}



const mapDispatchToProps = dispatch => {
    return {
        unesiSalu: (broj, slobodna) => 
            dispatch(actions.unosSale(broj, slobodna))
    }
};

export default connect(null, mapDispatchToProps)(UnosSale);