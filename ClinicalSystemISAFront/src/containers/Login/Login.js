import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Login.css';
import * as actions from '../../store/actions/index';
import {updateObject} from '../../shared/utility';

class Login extends Component {

    state = {
        auth: {
            email: '',
            password: ''
        },
    }

    loginHandler = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.auth.email, this.state.auth.password);
        this.props.history.push("/");
    }

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    render() {
        return (
            <div>
                <label className="ui input">Email:</label>
                <br />
                <input type="email" className="ui input"
                    onChange={(event) => this.inputChangeHandler(event, 'email')} />
                    <br />
                <label className="ui input">Sifra:</label>
                <br />

                <input type="password" className="ui input" 
                    onChange={(event) => this.inputChangeHandler(event, 'password')} />
                                    <br />

                <button className="ui button" 
                    onClick={(event) => {this.loginHandler(event)}}
                >Log in</button>
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
        nesto: () => dispatch({type: "AGE_UP", value: 1}),
        onLogin: (email, password) => dispatch(actions.login(email, password)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);