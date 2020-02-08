import React, { Component } from "react";
import * as actions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import get from 'lodash/get';


class ModalLekara extends React.Component{

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

        sviPregledi: [],
        //u mapStateToPRops u ovo stanje kupim stalno novog korisnika prijavljenog
    };
  

    componentDidMount() {
        this.props.pregledi();
    }

    componentDidUpdate(prevProps) {
  
       console.log(this.props);

  
        const novoIme = get(this.props, 'lekar.firstName', '');
        const novoPrezime = get(this.props, 'lekar.lastName', '');
        const noviEmail = get(this.props, 'lekar.email', '');
        const novaSifra = get(this.props, 'lekar.password', '');
        const novaAdresa = get(this.props, 'lekar.address', '');
        const noviGrad = get(this.props, 'lekar.city', '');
        const novaDrzava = get(this.props, 'lekar.country', '');
        const noviBroj = get(this.props, 'lekar.phoneNumber', '');
      
        //Ako se desi da smo promenili korisnika, onda ispisemo nove podatke, inace stalno ostaju isti
        if(this.props.lekar != prevProps.lekar) {
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
            id: this.props.lekar.id,


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
  
    handleBrisanje() {
        let pom = 0;
        if (this.props.sviPregledi !== null && this.props.sviPregledi !== undefined &&
            this.props.lekar !== null && this.props.lekar !== undefined)
        {
            for (let i=0; i<this.props.sviPregledi.length; i++)
            {
                if (this.props.lekar.id === this.props.sviPregledi[i].idLekara && this.props.sviPregledi[i].unapred === true)
                {
                    alert('Lekar ima zakazan pregled i ne moze biti obrisan.');
                    pom = 1;
                }
            }
        }
        if (pom == 0)
        {
            this.props.admin_brise_lekara(this.props.lekar.id);
        }
    }

  
    render() {
        const { openModal, closeModal } = this.props;
        return (
            <Modal open={openModal} onClose={() => closeModal()}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
              <Modal.Description>
                <Header>Modifikacija i brisanje lekara</Header>
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
              <Button onClick={() => this.handleBrisanje()} >Obrisi</Button>
              <Button onClick={() => closeModal()} >Izadji</Button>
  
            </Modal.Content>
      </Modal>
        );
      
    }
  }
  
  const mapStateToProps = state => {
    console.log(state.auth);
    return {
        sviPregledi: state.auth.sviPregledi,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
       izmeni_prijavljenog_korisnika: (izmena) => dispatch(actions.izmeniPrijavljenogKorisnika(izmena)),
       pregledi: () => dispatch(actions.pregledi()),

       admin_brise_lekara: (id) => dispatch(actions.adminBriseLekara(id)),

    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalLekara);