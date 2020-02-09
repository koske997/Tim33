
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-objects';
import {updateObject} from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Layout extends Component {

    state = {
        object: {
            name: '',
            title: '',
            prijavljenKorisnik: null,
            moze: false
        }
    }
    componentDidMount(){
        this.props.prijavljen_korisnik();

        this.setState({moze: true})
    }


    
    

    redirectMoze(){
        if (this.state.moze)
        {
            return <Redirect to="/" />
        }
    }

    render() {
        return (
        <div>
            {this.redirectMoze()}
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        prijavljenKorisnik: state.auth.prijavljenKorisnik,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        prijavljen_korisnik: () => dispatch(actions.prijavljenKorisnik())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout, axios);