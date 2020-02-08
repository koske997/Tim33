import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Login.css';
import * as actions from '../../store/actions/index';
import {updateObject} from '../../shared/utility';
import {Redirect} from 'react-router-dom';
import { Button, Header, Image, Modal } from 'semantic-ui-react';




class Login extends Component {

    state = {
        auth: {
            email: '',
            password: ''
        },
    }

    componentDidMount(){
        sessionStorage.clear();
    }

    loginHandler = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.auth.email, this.state.auth.password);
        this.props.prijavljen_korisnik();

        this.props.history.push("");
    }

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    render() {
        return (

            <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="ui form">
                <h2>Logovanje</h2>
                <div className="field">
                    <label>Email</label>
                    <input type="email" className="ui input"
                    onChange={(event) => this.inputChangeHandler(event, 'email')} />
                </div>

                <div className="field">
                    <label>Password</label>
                    <input type="password" className="ui input" 
                    onChange={(event) => this.inputChangeHandler(event, 'password')} />            
                </div>

                <Button className="ui button" 
                    onClick={(event) => {this.loginHandler(event)}}
                >Log in</Button>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        token: state.token,
        userId: state.userId
    }}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        prijavljen_korisnik: () => dispatch(actions.prijavljenKorisnik()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);