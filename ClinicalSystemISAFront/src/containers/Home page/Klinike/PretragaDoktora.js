import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import ListaTipovaPregleda from '../AKlinike/ListaTipovaPregleda';
import ListaPacijenata from '../Doktori/ListaPacijenata';





 
class PretragaDoktora extends React.Component {

  state = {
    obelezenaKlinika: null,
    tipoviPregleda: null,
    sviPregledi: null,

    tip: null,
    ime: null,
    prezime: null,
    brLajkova: null,

    pretraziTip: false,

    listaLekara: []
  }

selectChangeHandler = (e) => {

    this.setState({
        tip: e.target.value,
    });
}

handleImeDoktora = (e) => {
    this.setState({
        ime: e.target.value,
    });
};
  
handlePrezimeDoktora = (e) => {
    this.setState({
        prezime: e.target.value,
    });
};

handleBrojLajkova = (e) => {
    this.setState({
        brLajkova: e.target.value,
    });
};

handlePretraziPoTipu = (e) => {
    this.setState({
        pretraziTip: e.target.checked,
    });
};


filtrirajHandler = (e) =>
{
    e.preventDefault();

    if((this.state.ime === undefined || this.state.ime === null|| this.state.ime === '')&&
    (this.state.prezime === undefined || this.state.prezime === null|| this.state.prezime === '')&&
    (this.state.brLajkova === undefined || this.state.brLajkova === null|| this.state.brLajkova === '') && !this.state.pretraziTip)
    {
        let noviNiz = [];

        console.log('kkkkkkkkkkkkk')

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR')
            {
                noviNiz.push(this.props.obelezenaKlinika.user[i]);
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    else if((this.state.ime !== undefined && this.state.ime !== null && this.state.ime !== '')&&
    (this.state.prezime === undefined || this.state.prezime === null || this.state.prezime === '')&&
    (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '')&&
     !this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR' && this.props.obelezenaKlinika.user[i].firstName === this.state.ime)
            {
                noviNiz.push(this.props.obelezenaKlinika.user[i]);
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    else if((this.state.ime === undefined || this.state.ime === null || this.state.ime === '')&&
    (this.state.prezime !== undefined && this.state.prezime !== null && this.state.prezime !== '')&&
    (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '')&&
     !this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR' && this.props.obelezenaKlinika.user[i].lastName === this.state.prezime)
            {
                noviNiz.push(this.props.obelezenaKlinika.user[i]);
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    else if((this.state.ime === undefined || this.state.ime === null || this.state.ime === '')&&
    (this.state.prezime === undefined || this.state.prezime === null || this.state.prezime === '')&&
    (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '')&&
     !this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR' && this.props.obelezenaKlinika.user[i].likes >= this.state.brLajkova)
            {
                noviNiz.push(this.props.obelezenaKlinika.user[i]);
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime !== undefined && this.state.ime !== null && this.state.ime !== '')&&
    (this.state.prezime !== undefined && this.state.prezime !== null && this.state.prezime !== '')&&
    (this.state.brLajkova === undefined || this.state.brLajkova === null|| this.state.brLajkova === '')&&
     !this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR' &&
            this.props.obelezenaKlinika.user[i].firstName === this.state.ime && 
            this.props.obelezenaKlinika.user[i].lastName === this.state.prezime)
            {
                noviNiz.push(this.props.obelezenaKlinika.user[i]);
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime !== undefined && this.state.ime !== null && this.state.ime !== '')&&
    (this.state.prezime === undefined || this.state.prezime === null || this.state.prezime === '')&&
    (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '')&&
    !this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR' &&
            this.props.obelezenaKlinika.user[i].firstName === this.state.ime && 
            this.props.obelezenaKlinika.user[i].likes >= this.state.brLajkova)
            {
                noviNiz.push(this.props.obelezenaKlinika.user[i]);
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime === undefined || this.state.ime === null || this.state.ime === '')&&
    (this.state.prezime !== undefined && this.state.prezime !== null && this.state.prezime !== '')&&
    (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '')&&
     !this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR' &&
            this.props.obelezenaKlinika.user[i].lastName === this.state.prezime && 
            this.props.obelezenaKlinika.user[i].likes >= this.state.brLajkova)
            {
                noviNiz.push(this.props.obelezenaKlinika.user[i]);
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime !== undefined && this.state.ime !== null && this.state.ime !== '')&&
    (this.state.prezime !== undefined && this.state.prezime !== null && this.state.prezime !== '')&&
    (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '')&&
     !this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR' &&
            this.props.obelezenaKlinika.user[i].lastName === this.state.prezime && 
            this.props.obelezenaKlinika.user[i].likes >= this.state.brLajkova &&
            this.props.obelezenaKlinika.user[i].firstName === this.state.ime)
            {
                noviNiz.push(this.props.obelezenaKlinika.user[i]);
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime === undefined || this.state.ime === null || this.state.ime === '')&&
    (this.state.prezime === undefined || this.state.prezime === null || this.state.prezime === '')&&
    (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '')&&
    (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR')
            {
                for (let j=0; j<this.props.sviPregledi.length; j++)
                {
                    for (let k=0; k<this.props.sviPregledi[j].doctor.length; k++)
                    {
                        if (this.props.obelezenaKlinika.user[i].id === this.props.sviPregledi[j].doctor[k].id)
                        {
                            if(this.props.sviPregledi[j].type === this.state.tip)
                            {
                                noviNiz.push(this.props.obelezenaKlinika.user[i]);
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime !== undefined && this.state.ime !== null && this.state.ime !== '')&&
    (this.state.prezime === undefined || this.state.prezime === null || this.state.prezime === '')&&
    (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '')&&
    (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR')
            {
                for (let j=0; j<this.props.sviPregledi.length; j++)
                {
                    for (let k=0; k<this.props.sviPregledi[j].doctor.length; k++)
                    {
                        if (this.props.obelezenaKlinika.user[i].id === this.props.sviPregledi[j].doctor[k].id
                            && this.props.obelezenaKlinika.user[i].firstName === this.state.ime)
                        {
                            if(this.props.sviPregledi[j].type === this.state.tip)
                            {
                                noviNiz.push(this.props.obelezenaKlinika.user[i]);
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime === undefined || this.state.ime === null || this.state.ime === '')&&
    (this.state.prezime !== undefined && this.state.prezime !== null && this.state.prezime !== '')&&
    (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '')&&
    (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR')
            {
                for (let j=0; j<this.props.sviPregledi.length; j++)
                {
                    for (let k=0; k<this.props.sviPregledi[j].doctor.length; k++)
                    {
                        if (this.props.obelezenaKlinika.user[i].id === this.props.sviPregledi[j].doctor[k].id
                            && this.props.obelezenaKlinika.user[i].lastName === this.state.prezime)
                        {
                            if(this.props.sviPregledi[j].type === this.state.tip)
                            {
                                noviNiz.push(this.props.obelezenaKlinika.user[i]);
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime === undefined || this.state.ime === null || this.state.ime === '')&&
    (this.state.prezime === undefined || this.state.prezime === null || this.state.prezime === '')&&
    (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '')&&
    (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR')
            {
                for (let j=0; j<this.props.sviPregledi.length; j++)
                {
                    for (let k=0; k<this.props.sviPregledi[j].doctor.length; k++)
                    {
                        if (this.props.obelezenaKlinika.user[i].id === this.props.sviPregledi[j].doctor[k].id
                            && this.props.obelezenaKlinika.user[i].likes >= this.state.brLajkova)
                        {
                            if(this.props.sviPregledi[j].type === this.state.tip)
                            {
                                noviNiz.push(this.props.obelezenaKlinika.user[i]);
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime !== undefined && this.state.ime !== null && this.state.ime !== '')&&
    (this.state.prezime !== undefined && this.state.prezime !== null && this.state.prezime !== '')&&
    (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '')&&
    (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR')
            {
                for (let j=0; j<this.props.sviPregledi.length; j++)
                {
                    for (let k=0; k<this.props.sviPregledi[j].doctor.length; k++)
                    {
                        if (this.props.obelezenaKlinika.user[i].id === this.props.sviPregledi[j].doctor[k].id
                            && this.props.obelezenaKlinika.user[i].firstName === this.state.ime && 
                            this.props.obelezenaKlinika.user[i].lastName === this.state.prezime)
                        {
                            if(this.props.sviPregledi[j].type === this.state.tip)
                            {
                                noviNiz.push(this.props.obelezenaKlinika.user[i]);
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime !== undefined && this.state.ime !== null && this.state.ime !== '')&&
    (this.state.prezime === undefined || this.state.prezime === null || this.state.prezime === '')&&
    (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova === '')&&
    (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR')
            {
                for (let j=0; j<this.props.sviPregledi.length; j++)
                {
                    for (let k=0; k<this.props.sviPregledi[j].doctor.length; k++)
                    {
                        if (this.props.obelezenaKlinika.user[i].id === this.props.sviPregledi[j].doctor[k].id
                            && this.props.obelezenaKlinika.user[i].firstName === this.state.ime && 
                            this.props.obelezenaKlinika.user[i].likes >= this.state.brLajkova)
                        {
                            if(this.props.sviPregledi[j].type === this.state.tip)
                            {
                                noviNiz.push(this.props.obelezenaKlinika.user[i]);
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime === undefined || this.state.ime === null || this.state.ime === '')&&
    (this.state.prezime !== undefined && this.state.prezime !== null && this.state.prezime !== '')&&
    (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '')&&
    (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR')
            {
                for (let j=0; j<this.props.sviPregledi.length; j++)
                {
                    for (let k=0; k<this.props.sviPregledi[j].doctor.length; k++)
                    {
                        if (this.props.obelezenaKlinika.user[i].id === this.props.sviPregledi[j].doctor[k].id
                            && this.props.obelezenaKlinika.user[i].lastName === this.state.prezime && 
                            this.props.obelezenaKlinika.user[i].likes >= this.state.brLajkova)
                        {
                            if(this.props.sviPregledi[j].type === this.state.tip)
                            {
                                noviNiz.push(this.props.obelezenaKlinika.user[i]);
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    if((this.state.ime !== undefined && this.state.ime !== null && this.state.ime !== '')&&
    (this.state.prezime !== undefined && this.state.prezime !== null && this.state.prezime !== '')&&
    (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '')&&
    (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
    {
        let noviNiz = [];

        for (let i=0; i<this.props.obelezenaKlinika.user.length; i++)
        {
            if (this.props.obelezenaKlinika.user[i].role === 'DOCTOR')
            {
                for (let j=0; j<this.props.sviPregledi.length; j++)
                {
                    for (let k=0; k<this.props.sviPregledi[j].doctor.length; k++)
                    {
                        if (this.props.obelezenaKlinika.user[i].id === this.props.sviPregledi[j].doctor[k].id
                            && this.props.obelezenaKlinika.user[i].lastName === this.state.prezime && 
                            this.props.obelezenaKlinika.user[i].likes >= this.state.brLajkova &&
                            this.props.obelezenaKlinika.user[i].firstName === this.state.ime)
                        {
                            if(this.props.sviPregledi[j].type === this.state.tip)
                            {
                                noviNiz.push(this.props.obelezenaKlinika.user[i]);
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            listaLekara: noviNiz,
        })
    }
    
    
         
}


  renderPretrageDoktora = () => {
    console.log(this.props);

      return (
        
        <div>
        <hr />

        <h2>Pretraga i filtriranje doktora </h2>
        <form className="ui form">
            <div className="field">
                <label>Ime</label>
                <input type="text" placeholder="Naziv"
                value={this.state.ime} onChange={this.handleImeDoktora} />
            </div>
            <div className="field">
                <label>Prezime</label>
                <input type="text"  placeholder="Grad"
               value={this.state.prezime} onChange={this.handlePrezimeDoktora} />
            </div>
            <div className="field">
                <label>Broj lajkova</label>
                <input type="number" placeholder="Lajkovi"
                value={this.state.brLajkova} onChange={this.handleBrojLajkova} />
            </div>
           
            <div className="field">
                <label>Tip pregleda</label>
                <div className="ui select">
                <select value={this.state.tip} onChange={ this.selectChangeHandler}>
                    <ListaTipovaPregleda  tipoviPregleda={this.props.tipoviPregleda}/> 
                </select>
                </div>
            </div>

            <button class="ui button" type="submit" onClick={ (e) => { this.filtrirajHandler(e)}}>Pretrazi</button>
            <input type="checkbox" checked={this.state.pretraziTip} onChange={this.handlePretraziPoTipu} ></input>
        </form>

            <div>
                <h3>Pronadjeni doktori</h3>

                <ListaPacijenata pacijenti={this.state.listaLekara} />
            </div>

        </div>
      );
    
 }

  render() {

    return (
      <div>
        {this.renderPretrageDoktora()}
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
  }
}


export default connect(mapStateToProps, null)(PretragaDoktora);