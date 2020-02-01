import React from 'react';
import get from 'lodash/get';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom';
import PodaciKlinike from './PodaciKlinike';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



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


class ListaKlinika extends React.Component {

    state ={
        selectedKlinika: undefined,
        redirectKlinika: false,
    };

    renderRedirect = () => {
        if (this.state.redirectKlinika) {
            
          return <Redirect to='/podaciKlinike'/>
        }
        
    }
    

    handleClick = id => {
        const klinike = this.props.klinike;

        const klinika = klinike.find(value => id === value.id);
        this.setState({
            selectedKlinika: klinika,
            redirectKlinika: true,
        });

        this.props.sacuvaj_obelezenu_kliniku(klinika);

    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

     renderSale = () => {
        const klinike = this.props.klinike;


        if (klinike !== undefined && klinike !== null)
        {
            return klinike.map((klinika) => {
        
                return (
                        <div key={klinika.id} id={klinika.id} class="ui link cards">
                            <div class="card">
                            <Image
                              floated='right'
                              src={klinika.picture}
                            />
                                <div class="content"  onClick={(e) => {this.handleClick(klinika.id); }}>
                                    <div class="header">Sala (Soba) {klinika.name}</div>
                                <div class="description">
                                    Sala za pregled i operacije.
                                </div>
                                </div>
                            </div>
                        </div>
                );
            });
        }
     }

    render() {
        return (
            <div>
                {this.renderSale()}
                {this.renderRedirect()}
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        sacuvaj_obelezenu_kliniku: (klinika) => dispatch(actions.sacuvajObelezenuKliniku(klinika)),
    }
};

export default connect(null, mapDispatchToProps)(ListaKlinika);