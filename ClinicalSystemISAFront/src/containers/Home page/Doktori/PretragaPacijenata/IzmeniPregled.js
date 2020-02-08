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
        prijavljenKorisnik: null,
    };

    componentDidMount()
    {
      this.props.prijavljen_korisnik();
    }
  
    componentDidUpdate(prevProps) {
  
       console.log(this.props);

  
        const novoIme = get(this.props, 'trenutniPregled.name', '');
        const noviOpis = get(this.props, 'trenutniPregled.description', '');
        const noviTip = get(this.props, 'trenutniPregled.type', '');
        const novoTrajanje = get(this.props, 'trenutniPregled.duration', '');
        const novaCena = get(this.props, 'trenutniPregled.price', '');

      
        if(this.props.trenutniPregled.name !== this.state.ime) {
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
    
    handleTrajanje = (e) => {
      this.setState({
        trajanje: e.target.value,
      })
    }; 

    handleCena = (e) => {
      this.setState({
        cena: e.target.value,
      })
    }; 

  
    handleIzmena = () => {
        const izmena = {
            id: this.props.trenutniPregled.id,

            ime: this.state.ime,
            opis: this.state.opis,
            tip: this.state.tip,
            trajanje: this.state.trajanje,
            cena: this.state.cena,
            
        };
        
        if (this.state.ime !== null && this.state.ime !== undefined && this.state.ime !== '' &&
        this.state.opis !== null && this.state.opis !== undefined && this.state.opis !== '' &&
        this.state.tip !== null && this.state.tip !== undefined && this.state.tip !== '' &&
        this.state.trajanje !== null && this.state.trajanje !== undefined && this.state.trajanje !== '' &&
        this.state.cena !== null && this.state.cena !== undefined && this.state.cena !== '')
        {
          if (this.props.prijavljenKorisnik.id === this.props.trenutniPregled.idLekara)
          {
            this.props.izmeni_pregled_doktora(izmena);
          }
          else
          {
            alert('Ovaj pregled niste vi radili pa da mozete menjati!!');
          }
        }
        else
          alert('Neispravno uneti podaci.');
        
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
                <input type="number" value={this.state.trajanje} onChange={this.handleTrajanje} ></input>

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

        prijavljenKorisnik: state.auth.prijavljenKorisnik,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
       izmeni_pregled_doktora: (izmena) => dispatch(actions.izmeniPregledDoktora(izmena)),
       prijavljen_korisnik: () => dispatch(actions.prijavljenKorisnik()),

    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(IzmeniPregled);