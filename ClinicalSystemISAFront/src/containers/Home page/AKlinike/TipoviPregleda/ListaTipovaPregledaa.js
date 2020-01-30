import React from 'react';
import get from 'lodash/get';
import * as actions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import ReactDOM from 'react-dom'



class Popup extends React.Component{

    state = {
        name: '',
    };

    componentDidUpdate(prevProps) {
        const oldId = get(prevProps, 'tip.id');
        const newId = get(this.props, 'tip.id');
        const newTipName = get(this.props, 'tip.name', '');
        if(oldId !== newId) {
            this.setState({
                name: newTipName,
            });
        }
    }

    /**
     * JSDOC kucaj na netu!
     * Handler za izmenu sobe!
     * @param {object} e - event object `triggered` when user input value.
     */
    handleImeTipa = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    handleIzmena = () => {
        const izmena = {
            id: this.props.tip.id,
            ime: this.state.name,
        };

        this.props.izmeniTipPregleda(izmena);

       /* if (izmena.slobodna === true)
            this.props.izmeniSalu(izmena);
        else
            alert('Zauzeta sala ne moze da se menja');*/
    }

    render() {
        const { openModal, closeModal } = this.props;
        return (
            <Modal open={openModal} onClose={() => closeModal()}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
              <Modal.Description>
                <Header>Modifikacija i brisanje tipa pregleda</Header>
                <p> Naziv tipa: </p>
                <input type="text" value={this.state.name} onChange={this.handleImeTipa} ></input>
              </Modal.Description>
              <Button onClick={() => this.handleIzmena()} >Izmeni</Button>
              <Button >Obrisi</Button>
              <Button onClick={() => closeModal()} >Izadji</Button>

            </Modal.Content>
      </Modal>
        );
      
    }
}


class ListaTipovaPregledaa extends React.Component {

    state ={
        selectedTip: undefined,
        openModal: false,
    };

    handleClick = id => {
        const { tipoviPregleda = [] } = this.props;
        // Pogledaj javascript find funkciju kod nizova
        const tip = tipoviPregleda.find(value => id === value.id);
        this.setState({
            selectedTip: tip,
            openModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

     renderTipa = () => {
        const tipoviPregledaa = this.props.tipoviPregleda ?  this.props.tipoviPregleda : [];
        return tipoviPregledaa.map((tip) => {
            //const slobodna = sala.free ? 'Slobodna' : 'Zauzeta';
    
            return (
                <div key={tip.id} id={tip.id} class="ui link cards">
                    <div class="card">
                        <div class="content"  onClick={(e) => {this.handleClick(tip.id); }}>
                            <div class="header">Tip -> {tip.name}</div>
                        <div class="description">
                            Tip pregleda (...)
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
                <Popup tip={this.state.selectedTip} openModal={this.state.openModal} closeModal={this.closeModal} izmeniTipPregleda={this.props.izmeniTipPregleda} /> 
                {this.renderTipa()}
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        prikazi_sale: () => dispatch(actions.sale()),
        izmeniTipPregleda: (izmena) => dispatch(actions.izmeniTipPregleda(izmena)),
    }
};

export default connect(null, mapDispatchToProps)(ListaTipovaPregledaa);