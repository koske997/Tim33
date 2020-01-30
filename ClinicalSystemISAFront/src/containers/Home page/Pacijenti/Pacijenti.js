import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaPacijenata from './ListaPacijenata';
import ListaKlinika from './ListaKlinika';
import {Redirect} from 'react-router-dom';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import get from 'lodash/get';







class Popup extends React.Component{

  state = {
      number: '',
      free: false,
  };

  componentDidUpdate(prevProps) {
      const oldSalaId = get(prevProps, 'sala.id');
      const newSalaId = get(this.props, 'sala.id');
      const newSalaFree = get(this.props, 'sala.free', false);
      const newSalaNumber = get(this.props, 'sala.number', '');
      if(oldSalaId !== newSalaId) {
          this.setState({
              number: newSalaNumber,
              free: newSalaFree,
          });
      }
  }

  /**
   * JSDOC kucaj na netu!
   * Handler za izmenu sobe!
   * @param {object} e - event object `triggered` when user input value.
   */
  handleBrojSobe = (e) => {
      this.setState({
          number: e.target.value,
      });
  };
  
  handleSlobodnaSoba = (e) => {
      this.setState({
          free: e.target.checked,
      });
  };

  handleIzmena = () => {
      const izmena = {
          id: this.props.sala.id,
          broj: this.state.number,
          slobodna: this.state.free,
      };
      if (izmena.slobodna === true)
          this.props.izmeniSalu(izmena);
      else
          alert('Zauzeta sala ne moze da se menja');
  }

  handleBrisanje = () => {
      const izmena = {
          id: this.props.sala.id,
          broj: this.state.number,
          slobodna: this.state.free,
      };
      if (izmena.slobodna === true)
          this.props.izbrisiSalu(izmena);
      else
          alert('Zauzeta sala ne moze da se brise');
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
              <p> Broj sobe: </p>
              <input type="text" value={this.state.number} onChange={this.handleBrojSobe} ></input>
              <p> Slobodna/zauzeta: </p>
              <input type="checkbox" checked={this.state.free} onChange={this.handleSlobodnaSoba} ></input>
            </Modal.Description>
            <Button onClick={() => this.handleIzmena()} >Izmeni</Button>
            <Button onClick={() => this.handleBrisanje()}>Obrisi</Button>
            <Button onClick={() => closeModal()} >Izadji</Button>

          </Modal.Content>
    </Modal>
      );
    
  }
}






const initialState = {
  pacijenti: null,
  klinike: null,
  karton: null
}

class Pacijenti extends React.Component {

  state = {
    redirect: false,
    prijavljenKorisnik: undefined,
    openModal: false,
}

handleClick = id => {
 
  this.setState({
      openModal: true,
  });
}

closeModal = () => {
  this.setState({
      openModal: false,
  });
}


  
setRedirect = () => {
    this.setState({
      redirect: true
    })
}

renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/medicinskiKarton' />
    }
}
  
  render() {
      return (
      <div>

        <div className="ui segment">
          <h2>Lista svih pacijenata </h2>

          <div>         
            <ListaPacijenata pacijenti={this.props.pacijenti}/>
          </div>

          <button className="Prikazi_pacijente" onClick={this.props.prikazi_pacijente} >Prikazi pacijente</button>
          <hr/>
        </div>

        <div className="ui segment">
          <h2>Lista svih klinika</h2>  
          
          <div>
            <ListaKlinika klinike={this.props.klinike} />
          </div>

          <button className="Prikazi_klinike" onClick={this.props.prikazi_klinike} >Prikazi klinike</button>
        </div>

        <div className="ui segment">
          <h2>Medicinski karton</h2>      

             {this.renderRedirect()}
          <button className="Prikazi_karton" onClick={this.setRedirect} >Prikazi karton</button>
        </div>

        <div className="ui segment">
          <h2>Izmeni svoje podatke</h2>      
          <Popup sala={this.state.prijavljenKorisnik} openModal={this.state.openModal} closeModal={this.closeModal} /> 

          <button className="Promeni_podatke" onClick={ (e) => { this.handleClick(e); this.props.prijavljenKorisnik(e) }} >Promeni</button>
        </div>

    </div>


    );
  }
}

const mapStateToProps = state => {
  console.log(state.auth);
  return {
      pacijenti: state.auth.pacijenti,
      klinike: state.auth.klinike,
      karton: state.auth.karton,

      prijavljenKorisnik: state.auth.prijavljenKorisnik,

  }
}

const mapDispatchToProps = dispatch => {
  return {
     prikazi_pacijente: () => dispatch(actions.pacijenti()),
     prikazi_klinike: () => dispatch(actions.klinike()),
     prikazi_karton: () => dispatch(actions.karton()),

     //izmeniPrijavljenogKorisnika: () => dispatch(actions.izmeniPrijavljenogKorisnika()),
     prijavljenKorisnik: () => dispatch(actions.prijavljenKorisnik()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pacijenti);