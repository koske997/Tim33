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
                <div class="ui three column grid">
                    <div className="column">
                        <div className="ui fluid card" key={pacijent.id} id={pacijent.id} onClick={(e) => {this.handleClick(pacijent.id)}}> 
                            <div className="image">
                                <Image
                                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                            </div>
                            <div className="content">
                                <a className="header">{pacijent.firstName} {pacijent.lastName}</a>
                            </div>
                            <div class="meta">
                                <span class="date">{pacijent.role}</span>
                            </div>
                            <div class="extra content">
                                <a>
                                <i class="user icon"></i>
                                ID Patient : {parseInt(pacijent.id)}
                                </a>
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