import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Register.css';
import * as actions from '../../store/actions/index';
import {updateObject} from '../../shared/utility';

class Register extends Component {

    state = {
        auth: {
            email: '',
            password: '',
            repeatPassword: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            country: '',
            phoneNumber: null,
            userId: null,
            role: ''
        }
    }

    registerHandler = (event) => {
        event.preventDefault();
        if( (this.state.auth.address !== null && this.state.auth.address !== undefined && this.state.auth.address !== ''
        || this.state.auth.password !== null && this.state.auth.password !== undefined && this.state.auth.password !== ''
        || this.state.auth.firstName !== null && this.state.auth.firstName !== undefined && this.state.auth.firstName !== ''
        || this.state.auth.lastName !== null && this.state.auth.lastName !== undefined && this.state.auth.lastName !== ''
        || this.state.auth.city !== null && this.state.auth.city !== undefined && this.state.auth.city !== ''
        || this.state.auth.country !== null && this.state.auth.country !== undefined && this.state.auth.country !== ''
        || this.state.auth.phoneNumber !== null && this.state.auth.phoneNumber !== undefined && this.state.auth.phoneNumber !== ''
        || this.state.auth.role !== null && this.state.auth.role !== undefined && this.state.auth.role !== '') && 
        (this.state.auth.password === this.state.auth.repeatPassword))
        {
            this.props.onRegister(this.state.auth.email, this.state.auth.password, this.state.auth.repeatPassword, 
                this.state.auth.firstName, this.state.auth.lastName, this.state.auth.address, this.state.auth.city, 
                this.state.auth.country, this.state.auth.phoneNumber, this.state.auth.userId, this.state.auth.role);
            
            this.props.history.push("/login");
        }
        else
            alert('Neispravno uneti podaci.')
    };

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    selectChangeHandler = (event) => {
        let updatedObject = updateObject(this.state.auth, {
            role: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            <form className="ui form">
                <h2>Registracija </h2>
                
                <div className="field">
                    <label>Email</label>
                    <input type="email"  placeholder="Email"
                    onChange={(event) => this.inputChangeHandler(event, 'email')} />
                </div>

                <div className="field">
                    <label>Password</label>
                    <input type="password"  placeholder="Password"
                    onChange={(event) => this.inputChangeHandler(event, 'password')} />               
                </div>

                <div className="field">
                    <label>Password</label>
                    <input type="password" placeholder="Repeat Password"
                    onChange={(event) => this.inputChangeHandler(event, 'repeatPassword')} />
                </div>

                <div className="field">
                    <label>First name</label>
                    <input type="text"  placeholder="First Name"
                    onChange={(event) => this.inputChangeHandler(event, 'firstName')} />
                </div>

                <div className="field">
                    <label>Last name</label>
                    <input type="text"  placeholder="Last Name"
                    onChange={(event) => this.inputChangeHandler(event, 'lastName')} />
                </div>

                <div className="field">
                    <label>Address</label>
                    <input type="text"  placeholder="Address"
                    onChange={(event) => this.inputChangeHandler(event, 'address')} />
                </div>

                <div className="field">
                    <label>City</label>
                    <input type="text"  placeholder="City"
                    onChange={(event) => this.inputChangeHandler(event, 'city')} />
                </div>

                <div className="field">
                    <label>Country</label>
                    <input type="text"  placeholder="Country"
                    onChange={(event) => this.inputChangeHandler(event, 'country')} />
                </div>

                <div className="field">
                    <label>Phone number</label>
                    <input type="number"  placeholder="Phone Number"
                    onChange={(event) => this.inputChangeHandler(event, 'phoneNumber')} />
                </div>

                <div>
                    <select className={classes.Input} onChange={(event) => this.selectChangeHandler(event)}>
                        <option> Doctor </option>
                        <option> Patient </option>
                        <option> Nurse </option>
                    </select>
                </div>

                <button class="ui button" type="submit" onClick={ (e) => { this.registerHandler(e); }}>Unesi</button>
            </form>
            </div>
            
        );
    }
}

const mapStateToProps = dispetch => {
    return {
        a: console.log(dispetch)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (email, password, repeatPassword, firstName, lastName, address, city, country, phoneNumber, userId, role) => 
            dispatch(actions.register(email, password, repeatPassword, firstName, lastName, address, city, country, phoneNumber, userId, role))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);