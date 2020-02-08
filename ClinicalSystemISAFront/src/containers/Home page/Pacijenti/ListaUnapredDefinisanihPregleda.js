import React from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import PretragaKlinika from './PretragaKlinika/PretragaKlinika';
import {Redirect} from 'react-router-dom';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import Zakazivanje from './Zakazivanje';



class ListaUnapredDefinisanihLekova extends React.Component {

    state ={
        selectedKlinika: [],
        po: '',
        redirectProfilKlinike: false,
        openModal: false,
        zapamceniId: null
    };

    handleClick = id => {
        
        const { klinike = [] } = this.props;
        const klinika = klinike.find(value => id === value.id);
        console.log(id);
        this.setState({
            selectedKlinika: klinika,
        });
        this.props.sacuvaj_kliniku_profila(klinika);

        this.setState({redirectProfilKlinike: true});
    }

    componentDidMount(){
        this.props.prikazi_prijavljenKorisnik();
    }

    zakazi(id){
        this.setState({openModal: true, zapamceniId: id});
    }

    konacno = () => {
        this.setState({openModal: false});
        console.log('HOCE DA ZAKAZE!!');
        this.props.podesi('', '', this.state.zapamceniId, this.props.prijavljenKorisnik.id, '', '', '', '');
    }

    closeModal = () => {
        console.log('USO U FJU');
        this.setState({openModal: false});
    }
    
    renderUnapredPregleda = () => {
        
        const pregledi = this.props.pregledi ?  this.props.pregledi : [];
        console.log(pregledi);
        console.log(pregledi.length);

        if (pregledi !== null && pregledi !== undefined)
        {
        return pregledi.map((pregled) => {    
            if (pregled.unapred === true)
            {
            return (       
                   
                <div className="ui link cards" onClick={e =>{this.zakazi(pregled.id);}}>
                    <div className="card" >
                        
                    <div className="content">
                        <div className="header">{pregled.name}</div>
                        <br/> <br />
                        <div className="meta">
                            <a>Tip: {pregled.type}</a>
                        </div>
                        <div className="description">
                            Datum i vreme: {pregled.dateTime} <br/>
                            Trajanje: {pregled.duration}
                        </div>
                    </div>
                    <div className="extra content">
                        <span className="right floated">
                        Cena: {pregled.price}
                        </span>
                    </div>
                    </div>
                    
                </div>
                
            ); 
            }
        });
         }
     }

    render() {
        return (
            <div>
                <Zakazivanje openModal={this.state.openModal}  closeModall={this.closeModal} hoce={this.konacno}/>
                {this.renderUnapredPregleda()}
            </div>
        );
    }

}
const mapStateToProps = state => {
    console.log(state.auth);
    return {
        prijavljenKorisnik: state.auth.prijavljenKorisnik
    }
  }
  

  const mapDispatchToProps = dispatch => {
    return {
       sacuvaj_kliniku_profila: (klinikaProfila) => dispatch(actions.sacuvajKlinikuProfila(klinikaProfila)),
       podesi: (naziv, opis, tip, sala, lekar, cena, datumVreme, trajanje) => dispatch(actions.podesiPregled(naziv, opis, tip, sala, lekar, cena, datumVreme, trajanje)),
       prikazi_prijavljenKorisnik: () => dispatch(actions.prijavljenKorisnik())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListaUnapredDefinisanihLekova);