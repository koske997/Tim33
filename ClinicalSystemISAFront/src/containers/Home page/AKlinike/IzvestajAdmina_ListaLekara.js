import React, { Component } from "react";
import * as actions from '../../../store/actions/index'
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

class IzvestajAdmina_ListaLekara extends React.Component {

    state ={
        selectedPacijent: undefined,
        openModal: false,
        redirectProfilPacijenta: false,
    };

    handleClick = (id) => {
        const pacijenti = this.props.pacijenti;
        // Pogledaj javascript find funkciju kod nizova
        //const pacijent = pacijenti.find(value => id === value.id);
        let pacijent = null;
        for (let i=0; i<pacijenti.length; i++)
        {
            console.log(pacijenti[i].id)
            console.log(id)

            if (parseInt(pacijenti[i].id) === parseInt(id))
                pacijent = pacijenti[i];
        }
        console.log(pacijent);
        this.setState({
            selectedPacijent: pacijent,
        });
        this.setRedirect();
        
        this.props.sacuvaj_pacijenta(pacijent);
    }

    setRedirect = () => {
        this.setState({
          redirectProfilPacijenta: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirectProfilPacijenta) 
        {
          return <Redirect to='/profilPacijenta' />
        }
        
    }

    

     renderPacijenta = () => {
        if (this.props.doktori !== null)
        {
        return this.props.doktori.map((doktor) => {
    
            return (
                <div className="ui link cards">
                    <div className="card">
                        <div className="image">
                            <img alt="da" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
                        </div>
                    <div className="content">
                        <div className="header">{doktor.firstName} {doktor.lastName}</div>
                        <br/> 
                        <div className="header">Prosecna ocena: {doktor.ocena}</div>
                        <br />
                        <div className="meta">
                            <a>{doktor.role}</a>
                        </div>
                        <div className="description">
                            {doktor.address}, {doktor.city}, {doktor.country} 
                        </div>
                    </div>
                    <div className="extra content">
                        <span className="right floated">
                        {doktor.phoneNumber}
                        </span>
                        <span>
                            <i className="user icon"></i>
                            {doktor.username}
                        </span>
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
                {this.renderPacijenta()}
                {this.renderRedirect()}
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        prikazi_sale: () => dispatch(actions.sale()),
        izmeniSalu: (izmena) => dispatch(actions.izmeniSalu(izmena)),
        izbrisiSalu: (izmena) => dispatch(actions.izbrisiSalu(izmena)),

        sacuvaj_pacijenta: (pacijent) => dispatch(actions.sacuvajObelezenogPacijenta(pacijent)),

    }
};

export default connect(null, mapDispatchToProps)(IzvestajAdmina_ListaLekara);