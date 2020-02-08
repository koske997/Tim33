import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {updateObject} from '../../../../shared/utility';

class UnosLekara extends Component {

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

    componentDidMount() {
        this.setState({userId: this.props.klinika.id})
    }

    registerHandler = (event) => {
        event.preventDefault();
        this.props.unos_lekara(this.state.auth.email, this.state.auth.password, this.state.auth.repeatPassword, 
            this.state.auth.firstName, this.state.auth.lastName, this.state.auth.address, this.state.auth.city, 
            this.state.auth.country, this.state.auth.phoneNumber, this.props.klinika.id, this.state.auth.role);
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
            <div>
                
            <h2>Unos novog lekara </h2>
            <form className="ui form">
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

                <button class="ui button" type="submit" onClick={ (e) => { this.registerHandler(e); }}>Unesi</button>
            </form>

            </div>
        );
    }
}



const mapDispatchToProps = dispatch => {
    return {
        unos_lekara: (email, password, repeatPassword, firstName, lastName, address, city, country, phoneNumber, userId, role) => 
            dispatch(actions.unosLekara(email, password, repeatPassword, firstName, lastName, address, city, country, phoneNumber, userId, role))
    }
};

export default connect(null, mapDispatchToProps)(UnosLekara);