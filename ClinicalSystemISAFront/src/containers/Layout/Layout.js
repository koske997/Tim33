import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import axios from '../../axios-objects';
import {updateObject} from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    

    state = {
        object: {
            name: '',
            title: '',
            prijavljenKorisnik: null,
            pomocnaPromenjiva: ''
        }
    }

    componentDidMount(){
        this.props.prijavljen_korisnik();
    }
    
      prvaPrijava(){
        console.log('???????');
        if (this.props.prijavljenKorisnik !== null && this.props.prijavljenKorisnik !== undefined)
        {
            if (this.props.prijavljenKorisnik.prvaPrijava === true)
            {
                return <Redirect to="/prvaPrijava" />
            }
        }
       
      }

    objectHandler = (event) => {
        event.preventDefault();

        const data = {
            ...this.state.object
        }
        
        this.props.onAddObject(data);
    }

    inputChangehandler = (event, type) => {
        let updatedObject = updateObject(this.state.object, {
            [type]: event.target.value});

        this.setState({object: updatedObject});
    }

    registerHandler = () => {
        this.props.history.push("/register");
    }

    loginHandler = () => {
        this.props.history.push("/login");
    }

    homepage = () => {
        this.props.history.push("/homepage");
    }

    pacijenti = () => {
        this.props.history.push("/pacijenti");
    }

    doktori = () => {
        this.props.history.push("/doktor");
    }

    adminKlinike = () => {
        this.props.history.push("/adminKlinike");
    }

    medSestra = () => {
        this.props.history.push("/medSestra");
    }

    

    


    proveriRedirect(){

        if(this.props.prijavljenKorisnik  !== null && this.props.prijavljenKorisnik !== undefined){
            console.log('LOGOVAN JEEE');
            console.log(this.props.prijavljenKorisnik.role);

            if(this.props.prijavljenKorisnik.prvaPrijava === true){
                return <Redirect to='/prvaPrijava'/>;
            }

            if(this.props.prijavljenKorisnik.role==='ADMINCC'){
                return <Redirect to='/adminKlinike' />;

            }

            if(this.props.prijavljenKorisnik.role==='DOCTOR'){
                return <Redirect to='/doktor' />;
            }

            if(this.props.prijavljenKorisnik.role==='PATIENT'){
                return <Redirect to='/pacijenti' />;
            }
            
            if(this.props.prijavljenKorisnik.role==='NURSE'){
                return <Redirect to='/medSestra' />;
            }
        }
    }

    render() { 
        return (         
                <div className='ui three item menu'>
                    {this.proveriRedirect()}
                    <button className="ui primary button" onClick={this.registerHandler}>Register</button>

                    <button className="ui primary button" onClick={this.loginHandler}>Login</button>
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