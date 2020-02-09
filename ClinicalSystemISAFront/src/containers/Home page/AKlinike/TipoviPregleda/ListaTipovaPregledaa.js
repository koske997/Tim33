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

    handleImeTipa = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    handleIzmena = () => {
        console.log(this.props);
        const izmena = {
            id: this.props.tip.id,
            ime: this.state.name,
        };
        let pom = 0;

        if ( this.props.pregledi !== null && this.props.pregledi !== undefined)
        {
            for (let i=0; i<this.props.pregledi.length; i++)
            {
                if (this.props.pregledi[i].type === this.props.tip.name && this.props.pregledi[i].unapred === true)
                {
                    pom = 1;
                }
            }
        }
        if (pom === 1)
        {
            alert('Ne mozete izmeniti ovaj tip, postoji zakazan pregled.');
        }
        else
        {
            this.props.izmeniTipPregleda(izmena);
        }
    }

    handleBrisanje = () => {
        console.log(this.props);
        const brisanje = {
            id: this.props.tip.id,
        };
        let pom = 0;

        if ( this.props.pregledi !== null && this.props.pregledi !== undefined)
        {
            for (let i=0; i<this.props.pregledi.length; i++)
            {
                if (this.props.pregledi[i].type === this.props.tip.name && this.props.pregledi[i].unapred === true)
                {
                    pom = 1;
                }
            }
        }
        if (pom === 1)
        {
            alert('Ne mozete obrisati ovaj tip, postoji zakazan pregled.');
        }
        else
        {
            this.props.obrisi_tip(brisanje);
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
                <Header>Modifikacija i brisanje tipa pregleda</Header>
                <p> Naziv tipa: </p>
                <input type="text" value={this.state.name} onChange={this.handleImeTipa} ></input>
              </Modal.Description>
              <Button onClick={() => this.handleIzmena()} >Izmeni</Button>
              <Button onClick={() => this.handleBrisanje()} >Obrisi</Button>
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
        pregledi: null,

    };

    componentDidMount(){
        this.props.svi_pregledi();
    }

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
                <Popup obrisi_tip={this.props.obrisi_tip} pregledi={this.props.pregledi} tip={this.state.selectedTip} openModal={this.state.openModal} closeModal={this.closeModal} izmeniTipPregleda={this.props.izmeniTipPregleda} /> 
                {this.renderTipa()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.auth.tipoviPregleda);
    return {
        pregledi: state.auth.sviPregledii,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        prikazi_sale: () => dispatch(actions.sale()),
        izmeniTipPregleda: (izmena) => dispatch(actions.izmeniTipPregleda(izmena)),
        svi_pregledi: () => dispatch(actions.pregledi()),

        obrisi_tip: (podaci) => dispatch(actions.obrisiTipPregleda(podaci)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListaTipovaPregledaa);