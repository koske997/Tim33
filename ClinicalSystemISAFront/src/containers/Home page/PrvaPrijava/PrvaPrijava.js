import React, { useState } from "react";
import { Button, Card, Image } from 'semantic-ui-react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';


class PrvaPrijava extends React.Component {


    state = {
        password1: null,
        password2: null,

        prijavljenKorisnik: null,

        red: false,
    }



    componentDidMount() {
        this.props.prijavljen_korisnik();
    }

    handlePassword = (e) => {
        this.setState({
            password1: e.target.value,
        });
    };    

    handlePassword2 = (e) => {
        this.setState({
            password2: e.target.value,
        });


    };

    pripremiIzmenu(e) {
        e.preventDefault();

        if (this.props.prijavljenKorisnik !== null && this.props.prijavljenKorisnik !== undefined)
        {
            if (this.state.password1 !== this.state.password2)
            {
                alert('Lozinke se ne poklapaju!');
            }
            else if (this.state.password1.length < 6)
            {
                alert('Sifra ne sme biti manja od 6 karaktera.')
            }
            else
            {
                let podaci = {
                    id: this.props.prijavljenKorisnik.id,
                    lozinka: this.state.password1
                }
                this.setState({red: true});
                this.props.promeni_lozinku(podaci);

                this.props.history.push("/login");

            }
        }
    }



  render() {
    return (
        <div>
        <h2>Izmenite svoju lozinku </h2>
        <form className="ui form">
            <div className="field">
                <label>Password</label>
                <input type="password" placeholder="password"
                value={this.state.password1} onChange={this.handlePassword} />
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password"  placeholder="password"
               value={this.state.password2} onChange={this.handlePassword2} />
            </div>
        
            <Button class="ui button" type="submit" onClick={ (e) => {this.pripremiIzmenu(e); }}>Zavrsi</Button>
        </form>
        </div>
    );
  }
}

const mapStateToProps = state => {
    console.log(state.auth);
    return {
        prijavljenKorisnik: state.auth.prijavljenKorisnik,
    }}
  
  const mapDispatchToProps = dispatch => {
    return {
        prijavljen_korisnik: () => dispatch(actions.prijavljenKorisnik()),
        promeni_lozinku: (podaci) => dispatch(actions.promeniLozinku(podaci))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PrvaPrijava);