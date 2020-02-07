import React from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import PretragaKlinika from './PretragaKlinika/PretragaKlinika';
import {Redirect} from 'react-router-dom';



class ListaPronadjenihLekaraKlinike extends React.Component {

    state ={
        selectedKlinika: [],
        redirectProfilKlinike: false,
    };


    
    renderLekaraKlinike = () => {
        
        const doktori = this.props.doktori ?  this.props.doktori : [];
        console.log(doktori);
        console.log(doktori.length);

        if (doktori !== null && doktori !== undefined)
        {
        return doktori.map((doktor) => {    
            if ( doktor.role === 'DOCTOR')
            {
            return (          
                <div className="ui link cards">
                <div className="card">
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
                    </div>
                ); 
            }
        });
         }
     }

    render() {
        return (
            <div>
                {this.renderLekaraKlinike()}
            </div>
        );
    }

}
  
  const mapDispatchToProps = dispatch => {
    return {
       sacuvaj_kliniku_profila: (klinikaProfila) => dispatch(actions.sacuvajKlinikuProfila(klinikaProfila)),

    }
  }
  
  export default connect(null, mapDispatchToProps)(ListaPronadjenihLekaraKlinike);