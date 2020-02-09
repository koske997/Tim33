import React, { Component } from "react";
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import get from 'lodash/get';


class ModalKlinike extends React.Component{

    state = {
        id: null,

        naziv: null,
        adresa: null,
        x: null,
        y: null,
       
    };
  
    componentDidUpdate(prevProps) {
  
       console.log(this.props);

  
        const noviNaziv = get(this.props, 'poslataKlinika.name', '');
        const novaAdresa = get(this.props, 'poslataKlinika.address', '');
        const novox = get(this.props, 'poslataKlinika.x', '');
        const novoy = get(this.props, 'poslataKlinika.y', '');

      
        if(this.props.poslataKlinika != prevProps.poslataKlinika) {
            this.setState({
              naziv: noviNaziv,
              adresa: novaAdresa,
              x: novox,
              y: novoy,
            });
        }
    }
  
    handleNaziv = (e) => {
      this.setState({
        naziv: e.target.value,
      })
    };
  
    handleAdresa = (e) => {
      this.setState({
        adresa: e.target.value,
      })
    };
    
    handleX = (e) => {
      this.setState({
        x: e.target.value,
      })
    }; 

    handleY = (e) => {
        this.setState({
          y: e.target.value,
        })
      }; 
    


  
    handleIzmena = () => {
        const izmena = {
            id: this.props.poslataKlinika.id,

            naziv: this.state.naziv,
            adresa: this.state.adresa,
            x: this.state.x,
            y: this.state.y,

        };
        this.props.izmeni_kliniku(izmena);        
    }
  

  
    render() {
        const { openModal, closeModal } = this.props;
        return (
            <Modal open={openModal} onClose={() => closeModal()}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
              <Modal.Description>
                <Header>Modifikacija klinike</Header>
                <p> Naziv: </p>
                <input type="text" value={this.state.naziv} onChange={this.handleNaziv} ></input>
  
                <p> Adresa: </p>
                <input type="text" value={this.state.adresa} onChange={this.handleAdresa} ></input>
  
                <p> Geografska sirina (X): </p>
                <input type="number" value={this.state.x} onChange={this.handleX} ></input>

                <p> Geografska duzina (Y): </p>
                <input type="number" value={this.state.y} onChange={this.handleY} ></input>

                
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
       izmeni_kliniku: (izmena) => dispatch(actions.izmeniKliniku(izmena)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalKlinike);