import React, { Component } from "react";
import Auth from "../../../../store/actions/auth"
import * as actions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Spinner from '../../Spinner';
import ModalLekara from "./ModalLekara";
import UnosLekara from './UnosLekara';


class Lekari extends React.Component {

  state = {
    prijavljenKorisnik: null,
    sveKlinike: null,

    klinikaAdmina: null,
    lekariKlinike: [],

    lekarZaModal: null,

    openModal: false,
    pomocnaPromenjiva: false,

}

    handleClick = (doktor) => {
        this.setState({
            openModal: true,
            lekarZaModal: doktor,
        });
    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

    componentDidMount(){
      this.props.prikazi_prijavljenKorisnik();
      this.props.prikazi_klinike();  

      this.pronadjiLekareKlinikeAdministratora();
   }


    pronadjiLekareKlinikeAdministratora() {
        let klinika = null;
        let lekari = null;

        if (this.props.sveKlinike !== null && this.props.sveKlinike !== undefined)
        {
            for (let i=0; i<this.props.sveKlinike.length; i++)
            {
                for (let j=0; j<this.props.sveKlinike[i].user.length; j++)
                {
                    if (this.props.prijavljenKorisnik.id === this. props.sveKlinike[i].user[j].id)
                    {
                        klinika = this.props.sveKlinike[i];
                        lekari = this.props.sveKlinike[i].user;
                    }
                }
            }
            this.setState({
                klinikaAdmina: klinika,
                lekariKlinike: lekari
            })
        }
    }


    renderKorisnika(){

      if(this.props.prijavljenKorisnik!=null){
        console.log(this.props.prijavljenKorisnik);
          return (<div style={{ float: "right"}}> 
                        <a className="ui blue image label"><img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg"/>
                        {this.props.prijavljenKorisnik.username}
                        <div className="detail">{this.props.prijavljenKorisnik.role}</div></a>
                    </div>
                  );
      }
      return <Spinner poruka="Ucitavanje"/> ;      
    }

  

    lekariKlinikeAdmina() {
        console.log(this.props.sveKlinike);
        console.log(this.props.prijavljenKorisnik);
        if (this.props.sveKlinike !== null && this.props.sveKlinike !== undefined &&
            this.props.prijavljenKorisnik !== null && this.props.prijavljenKorisnik !== undefined &&
            this.state.lekariKlinike !== null && this.state.lekariKlinike !== undefined)
        {
        
            return this.state.lekariKlinike.map((doktor) => {
            if (doktor.role === 'DOCTOR')
            {
            return (
                    <div className="card" onClick={(e) => {this.handleClick(doktor) }}>
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
                );
            }
        });
        }
    }

  
    renderMeni(){
      if(this.state.odabir==='DODAJ'){
        if(this.state.klinikaAdmina !== null)
            return <UnosLekara klinika={this.state.klinikaAdmina}/>

      }

      if(this.state.odabir==='LEKARI'){
        return <div className="ui link cards"> {this.lekariKlinikeAdmina()} </div>;
      }

      if(this.state.odabir === 'VRATI')
        {
            return this.props.history.push("/adminKlinike");
        }
      
  }




renderModifikacijeLekara = () => {
      return (
          <div>
            <div style={{ float: "left"}}>
                        <div className="ui secondary  menu">
                            <a className="item" onClick={(e) => {this.pronadjiLekareKlinikeAdministratora(e); this.setState({ odabir: 'LEKARI'});}}>Lekari klinike</a>
                            <a className="item" onClick={(e) => {this.pronadjiLekareKlinikeAdministratora(e); this.setState({odabir: 'DODAJ'});}}> Dodaj lekara</a>
                            <a className="item" onClick={(e)=>{ this.setState({odabir: 'VRATI'})}}> NAZAD</a>

                        </div>
                    </div>
              {this.renderKorisnika()}
                <br/>
                <br/>
                <br/>
                <br/>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {this.renderMeni()}
              </div>
      </div>
      );
  }



  render(){
        return (
          <div>
              {this.renderModifikacijeLekara()}
              <ModalLekara lekar={this.state.lekarZaModal} openModal={this.state.openModal} closeModal={this.closeModal} /> 
          </div>
      );
    }   
  
}

const mapStateToProps = state => {
  console.log(state.auth);
  return {
      sveKlinike: state.auth.klinike,

      prijavljenKorisnik: state.auth.prijavljenKorisnik,
  }
}

const mapDispatchToProps = dispatch => {
  return {

    prikazi_prijavljenKorisnik: () => dispatch(actions.prijavljenKorisnik()),
    prikazi_klinike: () => dispatch(actions.klinike()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lekari);