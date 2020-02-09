import React, { Component } from "react";
import Auth from "../../../../store/actions/auth"
import * as actions from '../../../../store/actions/index'
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import ListaPacijenata from '../ListaPacijenata';
import ListaPacijenata_Pretraga from "./ListaPacijenata_Pretraga";
import ProfilPacijenta from './ProfilPacijenta';






 
class PretragaPacijenata extends React.Component {

  state = {
    obelezenaKlinika: null,
    tipoviPregleda: null,
    sviPregledi: null,

    ime: null,
    prezime: null,
    brPacijenta: null,

    sviPacijenti: null,

    pronadjeniPacijenti: [],

    nazad: false,
  }


    handleImePacijenta = (e) => {
        this.setState({
            ime: e.target.value,
        });
    };
    
    handlePrezimePacijenta = (e) => {
        this.setState({
            prezime: e.target.value,
        });
    };

    handleBrojPacijenta = (e) => {
        this.setState({
            brPacijenta: e.target.value,
        });
    };

    filtrirajHandler = (e) => {
        console.log(this.props);
        e.preventDefault();

        if (this.props.sviPacijenti !== null && this.props.sviPacijenti !== undefined)
        {

            if ((this.state.ime === null || this.state.ime === undefined || this.state.ime === '') &&
            (this.state.prezime === null || this.state.prezime === undefined || this.state.prezime === '')&&
            (this.state.brPacijenta === null || this.state.brPacijenta === undefined || this.state.brPacijenta === ''))
            {
                this.setState({
                    pronadjeniPacijenti: this.props.sviPacijenti
                })
            }
            else
            {
                let noviPacijenti = [];
                
                console.log(this.state.brPacijenta)

                for (let i=0; i < this.props.sviPacijenti.length; i++)
                {
                    console.log(this.props.sviPacijenti[i])
                    console.log(i)
                    if (this.props.sviPacijenti[i].firstName === this.state.ime ||
                         this.state.ime === null || this.state.ime === undefined || this.state.ime === '')
                    {
                        if (this.props.sviPacijenti[i].lastName === this.state.prezime ||
                            this.state.prezime === null || this.state.prezime === undefined || this.state.prezime === '')
                        {
                            if (parseInt(this.props.sviPacijenti[i].id) === parseInt(this.state.brPacijenta) ||
                                this.state.brPacijenta === null || this.state.brPacijenta === undefined || this.state.brPacijenta === '')
                            {
                                noviPacijenti.push(this.props.sviPacijenti[i]);
                            }
                       
                        }

                    }
                }
                

                this.setState({
                    pronadjeniPacijenti: noviPacijenti
                })
            }
        }
    }

    redirectNazad(){
        if(this.state.nazad)
        {
            return this.props.history.push("/doktor");
        }
    }
  
    renderPretragePacijenata = () => {
        console.log(this.props);
        return (

        <div>
            <div className="ui secondary  menu">
                <a className="item" onClick={(e)=>{ this.setState({nazad: true})}}> NAZAD</a>
            </div>
            

            {this.redirectNazad()}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h2>Pretraga i filtriranje pacijenata </h2>
            </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                <div className="ui form">
                    <div className="field">
                        <label>Ime</label>
                        <input type="text" placeholder="Ime"
                        value={this.state.ime} onChange={this.handleImePacijenta} />
                    </div>
                    <div className="field">
                        <label>Prezime</label>
                        <input type="text"  placeholder="Prezime"
                    value={this.state.prezime} onChange={this.handlePrezimePacijenta} />
                    </div>
                    <div className="field">
                        <label>Jedinstveni broj pacijenta</label>
                        <input type="number" placeholder="JBP"
                        value={this.state.brPacijenta} onChange={this.handleBrojPacijenta} />
                    </div>
                
                    <button class="ui button" type="submit" onClick={ (e) => { this.filtrirajHandler(e); this.props.prikazi_pacijente(e)}}>Pretrazi</button>
                </div>
                </div>
                <br/>
                <br/>
                <br/>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h3>Pronadjeni pacijenti</h3>
                </div>
                <br/>
                <br/>
                <br/>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <ListaPacijenata_Pretraga pacijenti={this.state.pronadjeniPacijenti} />
                </div>

                
            </div>
        );
    }

    render() {
        return (
        <div>
            {this.renderPretragePacijenata()}
        </div>
        );
    }

}




const mapStateToProps = state => {
    console.log(state.auth);

  return {
    obelezenaKlinika: state.auth.obelezenaKlinika,
    tipoviPregleda: state.auth.tipoviPregleda,
    sviPregledi: state.auth.sviPregledii,

    sviPacijenti: state.auth.pacijenti,
  }
}

const mapDispatchToProps = dispatch => {
    return {
       prikazi_pacijente: () => dispatch(actions.pacijenti()),
       prikazi_prijavljenog_korisnika: () => dispatch(actions.prijavljenKorisnik()),
      }
  }


export default connect(mapStateToProps, mapDispatchToProps)(PretragaPacijenata);