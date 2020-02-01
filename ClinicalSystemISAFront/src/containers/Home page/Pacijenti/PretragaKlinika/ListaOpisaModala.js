import React from 'react';
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';



class ListaOpisaModala extends React.Component {

    state ={
        selectedKlinika: [],
        openModal: false,
    };

    handleClick = id => {
        const { klinike = [] } = this.props;
        const klinika = klinike.find(value => id === value.id);
        this.setState({
            selectedKlinika: klinika,
            openModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

   
    
    renderOpisModala = () => {
        
        const doktorii = this.props.doktori ?  this.props.doktori : [];

        console.log(this.props);

        console.log(doktorii);
        console.log(doktorii.length);

        return doktorii.map((doktor) => {    
            return (
                <div>
                    <Modal.Description>
                        <Header>doc.med.spec. {doktor.firstName} {doktor.lastName}</Header>
                        <Button >Zakazi pregled</Button>
                    </Modal.Description>
                    <hl />
                </div>
            );
        });
         
     }

    render() {
        return (
            <div>
                {this.renderOpisModala()}
            </div>
        );
    }

}

export default ListaOpisaModala;