import React from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import PretragaKlinika from './PretragaKlinika/PretragaKlinika';
import {Redirect} from 'react-router-dom';



class ListaUnapredDefinisanihLekova extends React.Component {

    state ={
        selectedKlinika: [],
        redirectProfilKlinike: false,
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
                <div className="ui link cards">
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
                {this.renderUnapredPregleda()}
            </div>
        );
    }

}
  
  const mapDispatchToProps = dispatch => {
    return {
       sacuvaj_kliniku_profila: (klinikaProfila) => dispatch(actions.sacuvajKlinikuProfila(klinikaProfila)),

    }
  }
  
  export default connect(null, mapDispatchToProps)(ListaUnapredDefinisanihLekova);