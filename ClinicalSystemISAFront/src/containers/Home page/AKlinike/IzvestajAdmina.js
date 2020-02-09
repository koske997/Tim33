import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../Spinner';
import IzvestajAdmina_ListaLekara from './IzvestajAdmina_ListaLekara';
import { BarChart } from "reaviz";

class IzvestajAdmina extends React.Component {

    state = {
        redirectPregled: false,
        redirectSala: false,
        redirectTipoviPregleda: false, 
        po: '',
        zapamcenid: null,
        prijavljenKorisnik: null,
        openModal: false,

        klinikaIzvestaja: null,
        sveKlinike: null,

        lekariKlinike: null,
        preglediKlinike: null,

        doktori: null,

        brojacD: null,
        brojacN: null,
        brojacM: null,

        prihodD: null,
        prihodN: null,
        prihodM: null,
    }
  
  
    setRedirect = (e) => {
        this.setState({
        redirectPregled: true
        })
    }

    componentDidMount(){
        this.props.prikazi_preglede();
        this.props.prikazi_doktore();
        this.props.prijavljen_korisnik();
        this.props.prikazi_klinike();

        this.izracunajBrojPregleda();
        this.pronadjiKlinikuAdmina();
        this.pronadjiLekareKlinike();
        this.izracunajBrojPregleda();
    }

    pronadjiKlinikuAdmina() {

        if (this.props.prijavljenKorisnik !== null && this.props.prijavljenKorisnik !== undefined &&
            this.props.sveKlinike !== null && this.props.sveKlinike !== undefined)
        {
            for (let i=0; i<this.props.sveKlinike.length; i++)
            {
                for (let j=0; j<this.props.sveKlinike[i].user.length; j++)
                {
                    if (this.props.prijavljenKorisnik.id === this.props.sveKlinike[i].user[j].id)
                    {
                        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
                        this.setState({
                            klinikaIzvestaja: this.props.sveKlinike[i],
                        })
                    }
                }
            }
        }
    }


    pronadjiLekareKlinike() {
        let noviLekari = [];
        let noviPregledi = [];

        if (this.props.prijavljenKorisnik !== null && this.props.prijavljenKorisnik !== undefined &&
            this.props.sveKlinike !== null && this.props.sveKlinike !== undefined && this.state.klinikaIzvestaja !== null)
        {
            //for( let i=0; i<this.state.klinikaIzvestaja.length; i++)
            //{

                for( let j=0; j<this.state.klinikaIzvestaja.user.length; j++)
                {
                    if (this.state.klinikaIzvestaja.user[j].role  === 'DOCTOR' )
                    {
                        noviLekari.push(this.state.klinikaIzvestaja.user[j]);

                        for ( let k=0; k<this.props.sviPregledi.length; k++)
                        {
                            if (this.props.sviPregledi[k].idLekara === this.state.klinikaIzvestaja.user[j].id)
                            {


                                noviPregledi.push(this.props.sviPregledi[k]);
                            }
                        }
                    }   
                }
            //}
        
            this.setState({
                lekariKlinike: noviLekari,
                preglediKlinike: noviPregledi,
            });
        }
    }

    izracunajBrojPregleda() {
        if( this.props.sviPregledi !== null && this.props.sviPregledi !== undefined)
        {
            console.log(this.props.sviPregledi);

            let trenutniDatum = new Date();

            trenutniDatum = trenutniDatum.toString();
            let spl = trenutniDatum.split(' ');
            let dan = spl[2];
            dan = parseInt(dan);
            let mesec = 2;
            let godina = spl[3];
            godina = parseInt(godina);
            console.log(dan+' ' + mesec+ ' ' + godina);

            let brojacMesec = 0;
            let brojacNedelja = 0;
            let brojacDan = 0;

            let ukupanPrihodDan = 0;
            let ukupanPrihodNedelja = 0;
            let ukupanPrihodMesec = 0;

            if (this.state.preglediKlinike != null)
            {
                for (let i=0; i<this.state.preglediKlinike.length; i++)
                {
                    let datum = this.state.preglediKlinike[i].dateTime.split('T');
                    let dat = datum[0].split('-');

                    let godina2 = parseInt(dat[0]);
                    let mesec2 = parseInt(dat[1]);
                    let dan2 = parseInt(dat[2]);


                    if (Math.abs(godina - godina2) === 0 && Math.abs(mesec - mesec2) === 0 && Math.abs(dan - dan2) === 0)
                    {
                        brojacDan++;
                        brojacNedelja++;
                        brojacMesec++;

                        ukupanPrihodDan += this.state.preglediKlinike[i].price;
                        ukupanPrihodMesec += this.state.preglediKlinike[i].price;
                        ukupanPrihodNedelja += this.state.preglediKlinike[i].price;

                    }

                    if (Math.abs(godina - godina2) === 0 && Math.abs(mesec - mesec2) === 0 && 
                    Math.abs(dan - dan2) <= 7 && Math.abs(dan - dan2) !== 0)
                    {
                        brojacNedelja++;
                        brojacMesec++;

                        ukupanPrihodMesec += this.state.preglediKlinike[i].price;
                        ukupanPrihodNedelja += this.state.preglediKlinike[i].price;
                    }

                    if (Math.abs(Math.abs(godina - godina2) === 0 && Math.abs(mesec - mesec2) === 0 && 
                    Math.abs(dan - dan2) > 7))
                    {
                        brojacMesec++;
                        ukupanPrihodMesec += this.state.preglediKlinike[i].price;
                    }


                }
            }

                    this.setState({
                        brojacD: brojacDan,
                        brojacN: brojacNedelja,
                        brojacM: brojacMesec,
                        prihodD: ukupanPrihodDan,
                        prihodN: ukupanPrihodNedelja,
                        prihodM: ukupanPrihodMesec
                    })
        }
    }

    renderKlinike() {
        if (this.state.klinikaIzvestaja !== null && this.state.klinikaIzvestaja !==undefined)
        {
            return (          
                <div className="ui link cards">
                    <div className="card">
                        <div className="image">
                            <img alt="da" src={this.state.klinikaIzvestaja.picture}/>
                        </div>
                    <div className="content">
                        <div className="header">{this.state.klinikaIzvestaja.name}</div>
                        <br/> <br />
                        <div className="header">
                            Prosecna ocena: {this.state.klinikaIzvestaja.ocena}
                        </div>
                        <br/> <br/>
                        <div className="meta">
                            <a>Likes: {this.state.klinikaIzvestaja.likes}</a>
                        </div>
                        <div className="description">
                            {this.state.klinikaIzvestaja.city}
                        </div>
                    </div>
                    <div className="extra content">
                        <span className="right floated">
                        </span>
                        <span>
                            <i className="user icon"></i>
                            {this.state.klinikaIzvestaja.user.length}
                        </span>
                    </div>
                    </div>
                </div>
            ); 
        }
    }

    renderGrafikaPregleda() {
        const data = [
            { key: 'Dan', data: parseInt(this.state.brojacD) },
            { key: 'Nedelja', data: parseInt(this.state.brojacN) },
            { key: 'Mesec', data: parseInt(this.state.brojacM) }
          ];
          
          return <BarChart width={550} height={450} data={data} />;
    }

    renderGrafikaPrihoda() {
        const data = [
            { key: 'Dan', data: parseInt(this.state.prihodD) },
            { key: 'Nedelja', data: parseInt(this.state.prihodN) },
            { key: 'Mesec', data: parseInt(this.state.prihodM) }
          ];
          
          return <BarChart  width={550} height={450} data={data} />;
    }

    renderPac(){
        if(this.state.po==='KLINIKA'){
            return this.renderKlinike();
        }

        if(this.state.po==='LEKARI'){
            return <IzvestajAdmina_ListaLekara doktori={this.state.lekariKlinike} />;
        }

        if(this.state.po === 'GRAFIK PREGLEDA'){
            return this.renderGrafikaPregleda();
        }

        if(this.state.po === 'PRIHODI KLINIKE'){
            return this.renderGrafikaPrihoda();
        }

        if(this.state.po === 'VRATI')
        {
            return this.props.history.push("/adminKlinike");
        }
    }

    renderComponent(){
        if(this.props.prijavljenKorisnik!=null){
            return (
                <div>
                    <div style={{ float: "left"}}>
                        <div className="ui secondary  menu">
                            <a className="item" onClick={(e)=>{ this.pronadjiKlinikuAdmina(e); this.setState({po: 'KLINIKA'});}}> Klinika</a>
                            <a className="item" onClick={(e)=>{ this.pronadjiLekareKlinike(e); this.setState({po: 'LEKARI'})}}> Lekari</a>
                            <a className="item" onClick={(e)=>{ this.izracunajBrojPregleda(e); this.setState({po: 'GRAFIK PREGLEDA'});}}>Grafik pregleda</a>
                            <a className="item" onClick={(e)=>{ this.izracunajBrojPregleda(e); this.setState({po: 'PRIHODI KLINIKE'});}}> Prihodi klinike</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'VRATI'})}}> NAZAD</a>

                        </div>
                    </div>
                    <div style={{ float: "right"}}> 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="ui blue image label" onClick={(e) => { this.setState({po: 'SESTRA'});}}>
                                    <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg"/>{this.props.prijavljenKorisnik.username}
                                        <div className="detail">{this.props.prijavljenKorisnik.role}</div> 
                                </a> 
                                
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {this.renderPac()}
                    </div>    
                </div>
            );     
        }
        return <Spinner poruka="Ucitavanje"/>
    }



  render() {
      return (
        <div>
            {this.renderComponent()}
        </div>
    );
  }
}



const mapStateToProps = state => {
    console.log(state.auth);
    return {
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda,

        prijavljenKorisnik: state.auth.prijavljenKorisnik,

        sveKlinike: state.auth.klinike,

        sviPregledi: state.auth.sviPregledii,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        prikazi_doktore: () => dispatch(actions.doktori()),
        prikazi_tipove_pregleda: () => dispatch(actions.tipoviPregleda()),

        prikazi_preglede: () => dispatch(actions.pregledi()),
        prijavljen_korisnik: () => dispatch(actions.prijavljenKorisnik()),

        prikazi_klinike: () => dispatch(actions.klinike()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IzvestajAdmina);