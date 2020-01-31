import React from 'react';
import get from 'lodash/get';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import ReactDOM from 'react-dom'



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


class ListaSala_1 extends React.Component {

    state ={
        selectedSala: undefined,
        openModal: false,
    };

    handleClick = id => {
        const { sale = [] } = this.props;
        // Pogledaj javascript find funkciju kod nizova
        const sala = sale.find(value => id === value.id);
        this.setState({
            selectedSala: sala,
            openModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

     renderSale = () => {
        const sale = this.props.sale ?  this.props.sale : [];
        return sale.map((sala) => {
            const slobodna = sala.free ? 'Slobodna' : 'Zauzeta';
    
            return (
                    <div key={sala.id} id={sala.id} className="ui link cards">
                        <div className="card">
                            <div className="content"  onClick={(e) => {this.handleClick(sala.id); }}>
                                <div className="header">Sala (Soba) {sala.number}</div>
                                <div className="meta">{slobodna}</div>
                            <div className="description">
                                Sala za pregled i operacije.
                            </div>
                            </div>
                        </div>
                     </div>
            );
            
        });
     }

    render() {
        return (
            <div>
                <Popup sala={this.state.selectedSala} openModal={this.state.openModal} closeModal={this.closeModal} izmeniSalu={this.props.izmeniSalu} izbrisiSalu={this.props.izbrisiSalu}/> 
                {this.renderSale()}
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        prikazi_sale: () => dispatch(actions.sale()),
        izmeniSalu: (izmena) => dispatch(actions.izmeniSalu(izmena)),
        izbrisiSalu: (izmena) => dispatch(actions.izbrisiSalu(izmena)),

    }
};

export default connect(null, mapDispatchToProps)(ListaSala_1);