import React, { Component } from "react";
import Auth from "../../../../store/actions/auth"
import * as actions from '../../../../store/actions/index'
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import ListaPacijenata from '../ListaPacijenata';class ListaPacijenata_Pretraga extends React.Component {

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

        return this.props.pacijenti.map((pacijent) => {
            //const slobodna = sala.free ? 'Slobodna' : 'Zauzeta';
    
            return (
                <div className="ui link cards">
                <div className="card" key={pacijent.id} id={pacijent.id} onClick={(e) => {this.handleClick(pacijent.id)}}>
                    <div className="image">
                        <img alt="da" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
                    </div>
                <div className="content">
                    <div className="header">{pacijent.firstName} {pacijent.lastName}</div>
                    <div className="meta">
                        <a>{pacijent.role}</a>
                    </div>
                    <div className="description">
                        {pacijent.address}, {pacijent.city}, {pacijent.country} 
                    </div>
                </div>
                <div className="extra content">
                    <span className="right floated">
                    {pacijent.phoneNumber}
                    </span>
                    <span>
                        <i className="user icon"></i>
                        {pacijent.username}
                    </span>
                </div>
                </div>
            </div>
                  
            );
            
        });
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

export default connect(null, mapDispatchToProps)(ListaPacijenata_Pretraga);