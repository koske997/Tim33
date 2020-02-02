import React from 'react';
import * as actions from '../../../../store/actions/index';
import get from 'lodash/get';
import {connect} from 'react-redux';
import PretragaKlinika from './PretragaKlinika';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import ListaOpisaModala from './ListaOpisaModala';



class Popup extends React.Component{

    state = {
        number: '',
        free: false,

        imeKlinike: '',
        imePregleda: '',

        doktoriTeKlinike: [],

        usaoJednom: true,
    };

    componentDidUpdate(prevProps)
    {
        const doktori1= get(prevProps, 'doktorii');
        const doktori2 = get(this.props, 'doktorii');

        if (doktori1 !== doktori2)
        {
            this.setState({
                usaoJednom: true
            })
        }
        
    }

    renderPromenuStanja = () => {

        if (this.props.openModal)
        {
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA');
            if(this.state.usaoJednom)
            {
                console.log('BBBBBBBBBBBBBBBBBBBBBB');

                console.log(this.props);

                this.setState({
                    usaoJednom: false
                })

                let noviDoktori = [];

                if(this.props.openModal)
                {

                    for (let i=0; i<this.props.doktorii.length; i++)
                    {
                            for (let k=0; k<this.props.klinikee.user.length; k++)
                            {
                                console.log('A ovde??');
                                if( this.props.doktorii[i].id === this.props.klinikee.user[k].id)
                                {
                                    noviDoktori.push(this.props.doktorii[i]);
                                    console.log('Usao sam ja bate moj');
                                }
                            }
                    }
                }
                console.log(this.state.doktoriTeKlinike);
                this.setState({
                    doktoriTeKlinike: noviDoktori
                })
            }
        }
    }

    renderModala = () => {
        const { openModal, closeModal } = this.props;

       
        if (this.props.openModal)
        {
        return (
            <Modal open={openModal} onClose={() => closeModal()}>
            <Modal.Header>{this.props.klinikee.name} -> pregled : {this.props.pregledd.type}</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
              
                <hr />
              <ListaOpisaModala doktori={this.state.doktoriTeKlinike} />
                <hr />
              <Button onClick={() => closeModal()} >Izadji</Button>

            </Modal.Content>
            </Modal>
        );
        }
    }

    render() {
        return (
            <div>
                {this.renderModala()}
                {this.renderPromenuStanja()}
            </div>
        );
    }
}




class ListaKlinika_Pretraga extends React.Component {

    state ={
        selectedKlinika: [],
        openModal: false,

        pregled: null,
        doktori: [],
    };

    handleClick = id => {
        const klinike = this.props.klinike;
        const klinika = klinike.find(value => id === value.id);
        if(this.props.pretraziTip)
        {
            this.setState({
                selectedKlinika: klinika,
                openModal: true,
                doktori: this.props.doktori,
                pregled: this.props.pregled
            });
        }
    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

   
    
    renderKlinike = () => {
        
        const klinike = this.props.klinike ?  this.props.klinike : [];
        console.log(this.props);

        if(klinike.length === undefined)
        {
            return (
                <div key={klinike.id} id={klinike.id} class="ui link cards">
                    <div class="card">
                        <div class="content"  onClick={(e) => {this.handleClick(klinike.id); }}>
                            <div class="header"> {klinike.name}</div>
                        <div class="description">
                            {klinike.city}
                        </div>
                        </div>
                    </div>
                 </div>
        );
        }

        if (klinike.length >= 1)
        {
        return klinike.map((klinika) => {    
            return (
                    <div key={klinika.id} id={klinika.id} class="ui link cards">
                        <div class="card">
                            <div class="content"  onClick={(e) => {this.handleClick(klinika.id); }}>
                                <div class="header"> {klinika.name}</div>
                            <div class="description">
                                {klinika.city}
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
                <Popup klinikee={this.state.selectedKlinika} doktorii={this.state.doktori} pregledd={this.state.pregled} openModal={this.state.openModal} closeModal={this.closeModal} /> 
                {this.renderKlinike()}
            </div>
        );
    }

}

export default ListaKlinika_Pretraga;