import React, { Component } from "react";
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import get from 'lodash/get';


class IzmeniPodatke extends React.Component{

    state = {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        password2: null,
        adress: null,
        city: null,
        country: null,
        phoneNumber: null,

        //u mapStateToPRops u ovo stanje kupim stalno novog korisnika prijavljenog
        prijavljenKorisnikk: null,
    };
  
    componentDidUpdate(prevProps) {
  
       console.log(this.props);

  
        const novoIme = get(this.props, 'prijavljenKorisnik.firstName', '');
        const novoPrezime = get(this.props, 'prijavljenKorisnik.lastName', '');
        const noviEmail = get(this.props, 'prijavljenKorisnik.email', '');
        const novaSifra = get(this.props, 'prijavljenKorisnik.password', '');
        const novaAdresa = get(this.props, 'prijavljenKorisnik.address', '');
        const noviGrad = get(this.props, 'prijavljenKorisnik.city', '');
        const novaDrzava = get(this.props, 'prijavljenKorisnik.country', '');
        const noviBroj = get(this.props, 'prijavljenKorisnik.phoneNumber', '');
      
        //Ako se desi da smo promenili korisnika, onda ispisemo nove podatke, inace stalno ostaju isti
        if(this.props.prijavljenKorisnikk != prevProps.prijavljenKorisnikk) {
            this.setState({
              firstName: novoIme,
              lastName: novoPrezime,
              email: noviEmail,
              password: novaSifra,
              adress: novaAdresa,
              city: noviGrad,
              country: novaDrzava,
              phoneNumber: noviBroj,

            });
        }
    }
  
    handleIme = (e) => {
      this.setState({
        firstName: e.target.value,
      })
    };
  
    handlePrezime = (e) => {
      this.setState({
        lastName: e.target.value,
      })
    };
    
    handleEmail = (e) => {
      this.setState({
        email: e.target.value,
      })
    }; 

    handleSifru = (e) => {
      this.setState({
        password: e.target.value,
      })
    }; 

    handleSifru2 = (e) => {
      this.setState({
        password2: e.target.value,
      })
    }; 
    
    handleAdresa = (e) => {
      this.setState({
        adress: e.target.value,
      })
    };
  
    handleGrad = (e) => {
      this.setState({
        city: e.target.value,
      })
    };
  
    handleDrzava = (e) => {
      this.setState({
        country: e.target.value,
      })
    };
  
    handleTelefon = (e) => {
      this.setState({
        phoneNumber: e.target.value,
      })
    };
  
    handleIzmena = () => {
        const izmena = {
            id: this.props.prijavljenKorisnik.id,


            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            adress: this.state.adress,
            city: this.state.city,
            country: this.state.country,
            phoneNumber: this.state.phoneNumber,
        };
        
        if (this.state.password === this.state.password2)
          this.props.izmeni_prijavljenog_korisnika(izmena);
        else
          alert('Sifre se ne poklapaju.');
        
    }
  

  
    render() {
        const { openModal, closeModal } = this.props;
        return (
            <Modal open={openModal} onClose={() => closeModal()}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
              <Modal.Description>
                <Header>Modifikacija i brisanje sale za pregled i operaciju</Header>
                <p> Ime: </p>
                <input type="text" value={this.state.firstName} onChange={this.handleIme} ></input>
  
                <p> Prezime: </p>
                <input type="text" value={this.state.lastName} onChange={this.handlePrezime} ></input>
  
                <p> Email: </p>
                <input type="email" readOnly value={this.state.email} onChange={this.handleEmail} ></input>

                <p> Sifra: </p>
                <input type="text" value={this.state.password} onChange={this.handleSifru} ></input>

                <p> Sifra2: </p>
                <input type="text" value={this.state.password2} onChange={this.handleSifru2} ></input>
  
                <p> Adresa: </p>
                <input type="text" value={this.state.adress} onChange={this.handleAdresa} ></input>
  
                <p> Grad: </p>
                <input type="text" value={this.state.city} onChange={this.handleGrad} ></input>
  
                <p> Drzava: </p>
                <input type="text" value={this.state.country} onChange={this.handleDrzava} ></input>
  
                <p> Broj telefona: </p>
                <input type="number" value={this.state.phoneNumber} onChange={this.handleTelefon} ></input>
  
              </Modal.Description>
              <Button onClick={() => this.handleIzmena()} >Izmeni</Button>
              <Button onClick={() => closeModal()} >Izadji</Button>
  
            </Modal.Content>
      </Modal>
        );
      
    }
  }
  
  const mapStateToProps = state => {
    console.log(state.auth);
    return {

        prijavljenKorisnikk: state.auth.prijavljenKorisnik,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
       izmeni_prijavljenog_korisnika: (izmena) => dispatch(actions.izmeniPrijavljenogKorisnika(izmena)),

    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(IzmeniPodatke);