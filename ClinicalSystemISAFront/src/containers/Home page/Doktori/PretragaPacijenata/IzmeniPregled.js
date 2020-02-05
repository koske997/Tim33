import React, { Component } from "react";
import * as actions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import get from 'lodash/get';


class IzmeniPregled extends React.Component{

    state = {
        id: null,

        ime: null,
        opis: null,
        trajanje: null,
        cena: null,
        tip: null,


        //u mapStateToPRops u ovo stanje kupim stalno novog korisnika prijavljenog
        prijavljenKorisnikk: null,
    };
  
    componentDidUpdate(prevProps) {
  
       console.log(this.props);

  
        const novoIme = get(this.props, 'trenutniPregled.name', '');
        const noviOpis = get(this.props, 'trenutniPregled.description', '');
        const noviTip = get(this.props, 'trenutniPregled.type', '');
        const novoTrajanje = get(this.props, 'trenutniPregled.duration', '');
        const novaCena = get(this.props, 'trenutniPregled.price', '');

      
        if(this.props.trenutniPregled !== prevProps.trenutniPregled) {
            this.setState({
              ime: novoIme,
              opis: noviOpis,
              tip: noviTip,
              trajanje: novoTrajanje,
              cena: novaCena,
            });
        }
    }
  
    handleIme = (e) => {
      this.setState({
        ime: e.target.value,
      })
    };

    handleOpis = (e) => {
      this.setState({
        opis: e.target.value,
      })
    };
  
    handleTip = (e) => {
      this.setState({
        tip: e.target.value,
      })
    };
    
    handlTrajanje = (e) => {
      this.setState({
        email: e.target.value,
      })
    }; 

    handleCena = (e) => {
      this.setState({
        cena: e.target.value,
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
            <Modal.Header>Izmena pregleda</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
              <Modal.Description>
                <Header>Izmena pregleda</Header>
                <p> Ime: </p>
                <input type="text" value={this.state.ime} onChange={this.handleIme} ></input>
  
                <p> Opis: </p>
                <input type="text" value={this.state.opis} onChange={this.handleOpis} ></input>
  
                <p> Tip: </p>
                <input type="text" value={this.state.tip} onChange={this.handleTip} ></input>

                <p> Trajanje: </p>
                <input type="number" value={this.state.trajanje} onChange={this.handlTrajanje} ></input>

                <p> Cena: </p>
                <input type="number" value={this.state.cena} onChange={this.handleCena} ></input>

  
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(IzmeniPregled);