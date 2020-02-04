import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {updateObject} from '../../../../shared/utility';
import ListaTipovaPregleda from '../../AKlinike/ListaTipovaPregleda';
import ListaKlinika_Pretraga from './ListaKlinika_Pretraga';


class PretragaKlinika extends React.Component {

    state = {
        naziv: '',
        grad: '',
        tip: '',
        brLajkova: '',
        pretraziTip: false,
           
        sale: null,
        doktori: null,
        tipoviPregleda: null,

        sviPregledi: null,

        staPretrazi: false,
            
            
        klinikee: null,
        pronadjeneKlinike: null,

        pronadjeniDoktori: null,
        pronadjenPregled: null,
    }


    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    selectChangeHandler = (e) => {

        this.setState({
            tip: e.target.value,
        });
    }

    handleNazivKlinike = (e) => {
        this.setState({
            naziv: e.target.value,
        });
    };

    handleGradKlinike = (e) => {
        this.setState({
            grad: e.target.value,
        });
    };

    handleLajkoviKlinike = (e) => {
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

        console.log(this.props.klinikee);
        console.log(this.state.brLajkova);
        console.log(this.state.grad);
        console.log(this.state.tip);
        console.log(this.state.naziv);
        console.log(this.state.tip);
        console.log(this.state.pretraziTip)

        if(this.props.klinikee != null && this.props.klinikee != undefined)
        {
            if ((this.state.naziv === undefined || this.state.naziv === null || this.state.naziv === '') &&
            (this.state.grad === undefined || this.state.grad === null || this.state.grad === '') &&
            (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '')
            && !this.state.pretraziTip)
            {

                this.setState({
                    pronadjeneKlinike: this.props.klinikee,
                })
            }
            else if ((this.state.naziv !== undefined && this.state.naziv !== null && this.state.naziv !== '') &&
            (this.state.grad === undefined || this.state.grad === null || this.state.grad === '') &&
            (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '')
             && !this.state.pretraziTip)
            {
                let noveKlinike = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    if (this.props.klinikee[i].name === this.state.naziv)
                    {
                        noveKlinike.push(this.props.klinikee[i]);
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,
                })
            }
            else if ((this.state.naziv === undefined || this.state.naziv === null || this.state.naziv === '') &&
            (this.state.grad !== undefined && this.state.grad !== null && this.state.grad !== '') &&
            (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '') 
            && !this.state.pretraziTip)
            {
                let noveKlinike = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    if (this.props.klinikee[i].city === this.state.grad)
                    {
                        noveKlinike.push(this.props.klinikee[i]);
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,
                })
            }
            else if ((this.state.naziv === undefined || this.state.naziv === null || this.state.naziv === '') &&
            (this.state.grad === undefined || this.state.grad === null || this.state.grad === '') &&
            (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '')
            && !this.state.pretraziTip)
            {
                let noveKlinike = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    if (this.props.klinikee[i].likes >= this.state.brLajkova)
                    {
                        noveKlinike.push(this.props.klinikee[i]);
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,
                })
            }
            else if ((this.state.naziv !== undefined && this.state.naziv !== null && this.state.naziv !== '') &&
            (this.state.grad !== undefined && this.state.grad !== null && this.state.grad !== '') &&
            (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '')
             && !this.state.pretraziTip)
            {
                let noveKlinike = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    if (this.props.klinikee[i].city === this.state.grad && this.props.klinikee[i].name === this.state.naziv)
                    {
                        noveKlinike.push(this.props.klinikee[i]);
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,
                })
            }
            else if ((this.state.naziv !== undefined && this.state.naziv !== null && this.state.naziv !== '') &&
            (this.state.grad === undefined || this.state.grad === null || this.state.grad === '') &&
            (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '') &&
             !this.state.pretraziTip)
            {
                let noveKlinike = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    if (this.props.klinikee[i].name === this.state.naziv && this.props.klinikee[i].likes >= this.state.brLajkova)
                    {
                        noveKlinike.push(this.props.klinikee[i]);
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,
                })
            }
            else if ((this.state.naziv === undefined || this.state.naziv === null || this.state.naziv === '') &&
            (this.state.grad !== undefined && this.state.grad !== null && this.state.grad !== '') &&
            (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '')
             && !this.state.pretraziTip)
            {
                let noveKlinike = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    if (this.props.klinikee[i].city === this.state.grad && this.props.klinikee[i].likes >= this.state.brLajkova)
                    {
                        noveKlinike.push(this.props.klinikee[i]);
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,
                })
            }
            else if ((this.state.naziv !== undefined && this.state.naziv !== null && this.state.naziv !== '') &&
            (this.state.grad !== undefined && this.state.grad !== null && this.state.grad !== '') &&
            (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '')
            && !this.state.pretraziTip)
            {
                let noveKlinike = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    if (this.props.klinikee[i].name === this.state.naziv && this.props.klinikee[i].city === this.state.grad && this.props.klinikee[i].likes >= this.state.brLajkova)
                    {
                        noveKlinike.push(this.props.klinikee[i]);
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,
                })
            }
            else if ((this.state.naziv === undefined || this.state.naziv === null || this.state.naziv === '') &&
            (this.state.grad === undefined || this.state.grad === null || this.state.grad === '') &&
            (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '') &&
            (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
            {
                let noveKlinike = [];
                let pregled;
                let doktori = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    for(let j=0; j<this.props.klinikee[i].user.length; j++)
                    {
                        for(let z=0; z<this.props.sviPregledi.length; z++)
                        {
                            for (let b=0; b<this.props.sviPregledi[z].doctor.length; b++)
                            {
                                if(this.props.klinikee[i].user[j].id === this.props.sviPregledi[z].doctor[b].id)
                                {
                                    if(this.props.sviPregledi[z].type === this.state.tip)
                                    {
                                        noveKlinike.push(this.props.klinikee[i]);

                                        pregled = this.props.sviPregledi[z];

                                        doktori.push(this.props.sviPregledi[z].doctor[b]);
                                    }
                                }
                            }
                        }
                    }
                }

                if (noveKlinike.length > 1)
                {
                    for (let k=0; k<noveKlinike.length; k++)
                    {
                        for (let kk=0; kk<noveKlinike.length; kk++)
                        {
                            if(noveKlinike[k].id === noveKlinike[kk].id)
                            {
                                noveKlinike.pop(noveKlinike[k]);
                            }
                        }
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,

                    pronadjenPregled: pregled,
                    pronadjeniDoktori: doktori,
                })
            }
            else if ((this.state.naziv !== undefined && this.state.naziv !== null && this.state.naziv !== '') &&
            (this.state.grad === undefined || this.state.grad === null || this.state.grad === '') &&
            (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '') &&
            (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
            {
                let noveKlinike = [];
                let pregled;
                let doktori = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    for(let j=0; j<this.props.klinikee[i].user.length; j++)
                    {
                        for(let z=0; z<this.props.sviPregledi.length; z++)
                        {
                            for (let b=0; b<this.props.sviPregledi[z].doctor.length; b++)
                            {
                                if(this.props.klinikee[i].user[j].id === this.props.sviPregledi[z].doctor[b].id)
                                {
                                    if(this.props.sviPregledi[z].type === this.state.tip &&
                                         this.props.klinikee[i].name === this.state.naziv)
                                    {
                                        noveKlinike.push(this.props.klinikee[i]);

                                        pregled = this.props.sviPregledi[z];

                                        doktori.push(this.props.sviPregledi[z].doctor[b]);
                                    }
                                }
                            }
                        }
                    }
                }

                if (noveKlinike.length > 1)
                {
                    for (let k=0; k<noveKlinike.length; k++)
                    {
                        for (let kk=0; kk<noveKlinike.length; kk++)
                        {
                            if(noveKlinike[k].id === noveKlinike[kk].id)
                            {
                                noveKlinike.pop(noveKlinike[k]);
                            }
                        }
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,

                    pronadjenPregled: pregled,
                    pronadjeniDoktori: doktori,
                })
            }
            else if ((this.state.naziv === undefined || this.state.naziv === null || this.state.naziv === '') &&
            (this.state.grad !== undefined && this.state.grad !== null && this.state.grad !== '') &&
            (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '') &&
            (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
            {
                let noveKlinike = [];
                let pregled;
                let doktori = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    for(let j=0; j<this.props.klinikee[i].user.length; j++)
                    {
                        for(let z=0; z<this.props.sviPregledi.length; z++)
                        {
                            for (let b=0; b<this.props.sviPregledi[z].doctor.length; b++)
                            {
                                if(this.props.klinikee[i].user[j].id === this.props.sviPregledi[z].doctor[b].id)
                                {
                                    if(this.props.sviPregledi[z].type === this.state.tip &&
                                         this.props.klinikee[i].city === this.state.grad)
                                    {
                                        noveKlinike.push(this.props.klinikee[i]);

                                        pregled = this.props.sviPregledi[z];

                                        doktori.push(this.props.sviPregledi[z].doctor[b]);
                                    }
                                }
                            }
                        }
                    }
                }

                if (noveKlinike.length > 1)
                {
                    for (let k=0; k<noveKlinike.length; k++)
                    {
                        for (let kk=0; kk<noveKlinike.length; kk++)
                        {
                            if(noveKlinike[k].id === noveKlinike[kk].id)
                            {
                                noveKlinike.pop(noveKlinike[k]);
                            }
                        }
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,

                    pronadjenPregled: pregled,
                    pronadjeniDoktori: doktori,
                })
            }
            else if ((this.state.naziv === undefined || this.state.naziv === null || this.state.naziv === '') &&
            (this.state.grad === undefined || this.state.grad === null || this.state.grad === '') &&
            (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '') &&
            (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
            {
                let noveKlinike = [];
                let pregled;
                let doktori = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    for(let j=0; j<this.props.klinikee[i].user.length; j++)
                    {
                        for(let z=0; z<this.props.sviPregledi.length; z++)
                        {
                            for (let b=0; b<this.props.sviPregledi[z].doctor.length; b++)
                            {
                                if(this.props.klinikee[i].user[j].id === this.props.sviPregledi[z].doctor[b].id)
                                {
                                    if(this.props.sviPregledi[z].type === this.state.tip &&
                                         this.props.klinikee[i].likes >= this.state.brLajkova)
                                    {
                                        noveKlinike.push(this.props.klinikee[i]);

                                        pregled = this.props.sviPregledi[z];

                                        doktori.push(this.props.sviPregledi[z].doctor[b]);
                                    }
                                }
                            }
                        }
                    }
                }

                if (noveKlinike.length > 1)
                {
                    for (let k=0; k<noveKlinike.length; k++)
                    {
                        for (let kk=0; kk<noveKlinike.length; kk++)
                        {
                            if(noveKlinike[k].id === noveKlinike[kk].id)
                            {
                                noveKlinike.pop(noveKlinike[k]);
                            }
                        }
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,

                    pronadjenPregled: pregled,
                    pronadjeniDoktori: doktori,
                })
            }
            else if ((this.state.naziv !== undefined && this.state.naziv !== null && this.state.naziv !== '') &&
            (this.state.grad === undefined || this.state.grad === null || this.state.grad === '') &&
            (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '') &&
            (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
            {
                let noveKlinike = [];
                let pregled;
                let doktori = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    for(let j=0; j<this.props.klinikee[i].user.length; j++)
                    {
                        for(let z=0; z<this.props.sviPregledi.length; z++)
                        {
                            for (let b=0; b<this.props.sviPregledi[z].doctor.length; b++)
                            {
                                if(this.props.klinikee[i].user[j].id === this.props.sviPregledi[z].doctor[b].id)
                                {
                                    if(this.props.sviPregledi[z].type === this.state.tip &&
                                         this.props.klinikee[i].likes >= this.state.brLajkova &&
                                         this.props.klinikee[i].name === this.state.naziv)
                                    {
                                        noveKlinike.push(this.props.klinikee[i]);

                                        pregled = this.props.sviPregledi[z];

                                        doktori.push(this.props.sviPregledi[z].doctor[b]);
                                    }
                                }
                            }
                        }
                    }
                }

                if (noveKlinike.length > 1)
                {
                    for (let k=0; k<noveKlinike.length; k++)
                    {
                        for (let kk=0; kk<noveKlinike.length; kk++)
                        {
                            if(noveKlinike[k].id === noveKlinike[kk].id)
                            {
                                noveKlinike.pop(noveKlinike[k]);
                            }
                        }
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,

                    pronadjenPregled: pregled,
                    pronadjeniDoktori: doktori,
                })
            }
            else if ((this.state.naziv !== undefined && this.state.naziv !== null && this.state.naziv !== '') &&
            (this.state.grad !== undefined && this.state.grad !== null && this.state.grad !== '') &&
            (this.state.brLajkova === undefined || this.state.brLajkova === null || this.state.brLajkova === '') &&
            (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
            {
                let noveKlinike = [];
                let pregled;
                let doktori = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    for(let j=0; j<this.props.klinikee[i].user.length; j++)
                    {
                        for(let z=0; z<this.props.sviPregledi.length; z++)
                        {
                            for (let b=0; b<this.props.sviPregledi[z].doctor.length; b++)
                            {
                                if(this.props.klinikee[i].user[j].id === this.props.sviPregledi[z].doctor[b].id)
                                {
                                    if(this.props.sviPregledi[z].type === this.state.tip &&
                                         this.props.klinikee[i].city === this.state.grad &&
                                         this.props.klinikee[i].name === this.state.naziv)
                                    {
                                        noveKlinike.push(this.props.klinikee[i]);

                                        pregled = this.props.sviPregledi[z];

                                        doktori.push(this.props.sviPregledi[z].doctor[b]);
                                    }
                                }
                            }
                        }
                    }
                }

                if (noveKlinike.length > 1)
                {
                    for (let k=0; k<noveKlinike.length; k++)
                    {
                        for (let kk=0; kk<noveKlinike.length; kk++)
                        {
                            if(noveKlinike[k].id === noveKlinike[kk].id)
                            {
                                noveKlinike.pop(noveKlinike[k]);
                            }
                        }
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,

                    pronadjenPregled: pregled,
                    pronadjeniDoktori: doktori,
                })
            }
            else if ((this.state.naziv === undefined || this.state.naziv === null || this.state.naziv === '') &&
            (this.state.grad !== undefined && this.state.grad !== null && this.state.grad !== '') &&
            (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '') &&
            (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
            {
                let noveKlinike = [];
                let pregled;
                let doktori = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    for(let j=0; j<this.props.klinikee[i].user.length; j++)
                    {
                        for(let z=0; z<this.props.sviPregledi.length; z++)
                        {
                            for (let b=0; b<this.props.sviPregledi[z].doctor.length; b++)
                            {
                                if(this.props.klinikee[i].user[j].id === this.props.sviPregledi[z].doctor[b].id)
                                {
                                    if(this.props.sviPregledi[z].type === this.state.tip &&
                                         this.props.klinikee[i].likes >= this.state.brLajkova &&
                                         this.props.klinikee[i].city === this.state.grad)
                                    {
                                        noveKlinike.push(this.props.klinikee[i]);

                                        pregled = this.props.sviPregledi[z];

                                        doktori.push(this.props.sviPregledi[z].doctor[b]);
                                    }
                                }
                            }
                        }
                    }
                }

                if (noveKlinike.length > 1)
                {
                    for (let k=0; k<noveKlinike.length; k++)
                    {
                        for (let kk=0; kk<noveKlinike.length; kk++)
                        {
                            if(noveKlinike[k].id === noveKlinike[kk].id)
                            {
                                noveKlinike.pop(noveKlinike[k]);
                            }
                        }
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,

                    pronadjenPregled: pregled,
                    pronadjeniDoktori: doktori,
                })
            }
            else if ((this.state.naziv !== undefined && this.state.naziv !== null && this.state.naziv !== '') &&
            (this.state.grad !== undefined && this.state.grad !== null && this.state.grad !== '') &&
            (this.state.brLajkova !== undefined && this.state.brLajkova !== null && this.state.brLajkova !== '') &&
            (this.state.tip !== undefined && this.state.tip !== null && this.state.tip !== '') && this.state.pretraziTip)
            {
                let noveKlinike = [];
                let pregled;
                let doktori = [];

                for (let i=0; i<this.props.klinikee.length; i++)
                {
                    for(let j=0; j<this.props.klinikee[i].user.length; j++)
                    {
                        for(let z=0; z<this.props.sviPregledi.length; z++)
                        {
                            for (let b=0; b<this.props.sviPregledi[z].doctor.length; b++)
                            {
                                if(this.props.klinikee[i].user[j].id === this.props.sviPregledi[z].doctor[b].id)
                                {
                                    if(this.props.sviPregledi[z].type === this.state.tip &&
                                         this.props.klinikee[i].likes >= this.state.brLajkova &&
                                         this.props.klinikee[i].city === this.state.grad && 
                                         this.props.klinikee[i].name === this.state.naziv)
                                    {
                                        noveKlinike.push(this.props.klinikee[i]);

                                        pregled = this.props.sviPregledi[z];

                                        doktori.push(this.props.sviPregledi[z].doctor[b]);
                                    }
                                }
                            }
                        }
                    }
                }

                if (noveKlinike.length > 1)
                {
                    for (let k=0; k<noveKlinike.length; k++)
                    {
                        for (let kk=0; kk<noveKlinike.length; kk++)
                        {
                            if(noveKlinike[k].id === noveKlinike[kk].id)
                            {
                                noveKlinike.pop(noveKlinike[k]);
                            }
                        }
                    }
                }

                this.setState({
                    pronadjeneKlinike: noveKlinike,

                    pronadjenPregled: pregled,
                    pronadjeniDoktori: doktori,
                })
            }
        }
     }

    render() {
        return (
            <div>
            <h2>Pretraga svih klinika </h2>
            <form className="ui form">
                <div className="field">
                    <label>Naziv</label>
                    <input type="text" placeholder="Naziv"
                    value={this.state.naziv} onChange={this.handleNazivKlinike} />
                </div>
                <div className="field">
                    <label>Grad</label>
                    <input type="text"  placeholder="Grad"
                   value={this.state.grad} onChange={this.handleGradKlinike} />
                </div>
                <div className="field">
                    <label>Broj lajkova</label>
                    <input type="number" placeholder="Lajkovi"
                    value={this.state.brLajkova} onChange={this.handleLajkoviKlinike} />
                </div>
               
                <div className="field">
                    <label>Tip pregleda</label>
                    <div className="ui select">
                    <select value={this.state.tip} onChange={ this.selectChangeHandler}>
                        <ListaTipovaPregleda  tipoviPregleda={this.props.tipoviPregleda}/> 
                    </select>
                    </div>
                </div>

                <button className="ui button" type="submit" onClick={ (e) => {this.props.prikazi_klinike(e); this.filtrirajHandler(e)}}>Pretrazi</button>
                <input type="checkbox" checked={this.state.pretraziTip} onChange={this.handlePretraziPoTipu} ></input>
            </form>

                <div>
                    <h3>Pronadjene klinike</h3>

                    <ListaKlinika_Pretraga pretraziTip={this.state.pretraziTip} klinike={this.state.pronadjeneKlinike} doktori={this.state.pronadjeniDoktori} pregled={this.state.pronadjenPregled} />

                </div>

            </div>
           
        );
    }
}

const mapStateToProps = state => {
    console.log(state.auth);
    return {
        sale: state.auth.sale,
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda,

        klinikee: state.auth.klinike,

        sviPregledi: state.auth.sviPregledii,
    }
}

const mapDispatchToProps = dispatch => {
    return {
       // unesiPregled: (naziv, opis, tip, sala, lekar, cena, datumVreme, trajanje) => 
         //   dispatch(actions.unosPregleda(naziv, opis, tip, sala, lekar, cena, datumVreme, trajanje)),

         prikazi_klinike: () => dispatch(actions.klinike()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PretragaKlinika);