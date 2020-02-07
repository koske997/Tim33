import React, { Component } from "react";
import * as actions from '../../../store/actions/index'
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import ListaPronadjenihLekaraKlinike from './ListaPronadjenihLekaraKlinike';
import ListaTipovaPregleda from '../AKlinike/ListaTipovaPregleda';



 
class PretragaLekaraKlinike extends React.Component {

  state = {
    obelezenaKlinika: null,
    tipoviPregleda: null,
    sviPregledi: null,

    ime: null,
    prezime: null,
    srednjaOcena: null,
    tip: null,


    pronadjeniLekari: [],
  }

    componentDidMount(){
        this.props.svi_tipovi_pregleda();
        this.props.svi_pregledi();
    }


    handleImeLekara = (e) => {
        this.setState({
            ime: e.target.value,
        });
    };
    
    handlePrezimeLekara = (e) => {
        this.setState({
            prezime: e.target.value,
        });
    };

    handleSrednjaOcena = (e) => {
        this.setState({
            srednjaOcena: e.target.value,
        });
    };

    handleTip = (e) => {
        this.setState({
            tip: e.target.value,
        });
    };


    filtrirajHandler = (e) => {
        console.log(this.props);
        console.log(this.state.tip);
        e.preventDefault();

        if (this.props.sviLekariKlinike !== null && this.props.sviLekariKlinike !== undefined)
        {

            if ((this.state.ime === null || this.state.ime === undefined || this.state.ime === '') &&
            (this.state.prezime === null || this.state.prezime === undefined || this.state.prezime === '')&&
            (this.state.srednjaOcena === null || this.state.srednjaOcena === undefined || this.state.srednjaOcena === '') &&
            (this.state.tip === null || this.state.tip === undefined || this.state.tip === ''))
            {
                this.setState({
                    pronadjeniLekari: this.props.sviLekariKlinike
                })
            }
            else
            {
                let noviLekari = [];
                
                for (let i=0; i < this.props.sviLekariKlinike.length; i++)
                {
                    console.log('Ulazis u for?')
                    console.log(this.state.srednjaOcena)
                    if (this.props.sviLekariKlinike[i].firstName === this.state.ime ||
                         this.state.ime === null || this.state.ime === undefined || this.state.ime === '')
                    {
                        if (this.props.sviLekariKlinike[i].lastName === this.state.prezime ||
                            this.state.prezime === null || this.state.prezime === undefined || this.state.prezime === '')
                        {
                            if (parseInt(this.props.sviLekariKlinike[i].ocena) >= parseInt(this.state.srednjaOcena) ||
                                this.state.srednjaOcena === null || this.state.srednjaOcena === undefined || this.state.srednjaOcena === '')
                            {
                                console.log('oce22222222222222222222222222')
                                if (this.state.tip === null || this.state.tip === undefined || this.state.tip === '')
                                {
                                    console.log('Ovde kontam da udjes?');
                                    noviLekari.push(this.props.sviLekariKlinike[i]);
                                }
                                else
                                {
                                    console.log('udjes li ovde a?!//1???')
                                   if (this.props.sviPregledi !== null && this.props.sviPregledi !== undefined)
                                   {
                                       for (let j=0; j<this.props.sviPregledi.length; j++)
                                       {
                                           if (this.props.sviPregledi[j].type === this.state.tip)
                                           {
                                               if (this.props.sviLekariKlinike[i].id === this.props.sviPregledi[j].idLekara)
                                                    noviLekari.push(this.props.sviLekariKlinike[i]);
                                           }
                                       }
                                   } 
                                }
                            }      
                        }
                    }
                }
                for (let i=0; i<noviLekari.length; i++)
                {
                    for (let j=0; j<noviLekari.length; j++)
                    {
                        if( noviLekari[i].id === noviLekari[j].id)
                        {
                            noviLekari.pop(noviLekari[i]);
                        }
                    }
                }
                

                this.setState({
                    pronadjeniLekari: noviLekari
                })
            }
        }
    }

  
    renderPretrageLekara = () => {
        console.log(this.props);

        return (
            
            <div>
            <hr />

            <h2>Pretraga i filtriranje lekara </h2>
            <form className="ui form">
                <div className="field">
                    <label>Ime</label>
                    <input type="text" placeholder="Ime"
                    value={this.state.ime} onChange={this.handleImeLekara} />
                </div>
                <div className="field">
                    <label>Prezime</label>
                    <input type="text"  placeholder="Prezime"
                value={this.state.prezime} onChange={this.handlePrezimeLekara} />
                </div>

                <div className="field">
                    <label>Srednja ocena</label>
                    <input type="number" placeholder="Ocena"
                    value={this.state.srednjaOcena} onChange={this.handleSrednjaOcena} />
                </div>

                <div className="field">
                    <label>Tip pregleda</label>
                    <div className="ui select">
                    <select value={this.state.tip} onChange={this.handleTip}>
                        <option></option>
                        <ListaTipovaPregleda  tipoviPregleda={this.props.tipoviPregleda}/> 
                    </select>
                    </div>
                </div>
            
                <button class="ui button" type="submit" onClick={ (e) => { this.filtrirajHandler(e); }}>Pretrazi</button>
            </form>

                <div>
                    <h3>Pronadjeni lekari</h3>

                    <ListaPronadjenihLekaraKlinike doktori={this.state.pronadjeniLekari} />

                </div>

            </div>
        );
    }

    render() {
        return (
        <div>
            {this.renderPretrageLekara()}
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

    tipoviPregleda: state.auth.tipoviPregleda,

  }
}

const mapDispatchToProps = dispatch => {
    return {
       prikazi_prijavljenog_korisnika: () => dispatch(actions.prijavljenKorisnik()),
       svi_tipovi_pregleda: () => dispatch(actions.tipoviPregleda()),
       svi_pregledi: () => dispatch(actions.pregledi()),
      }
  }


export default connect(mapStateToProps, mapDispatchToProps)(PretragaLekaraKlinike);