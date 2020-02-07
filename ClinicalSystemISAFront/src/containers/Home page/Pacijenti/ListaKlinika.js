import React from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import PretragaKlinika from './PretragaKlinika/PretragaKlinika';
import {Redirect} from 'react-router-dom';



class ListaKlinika extends React.Component {

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


    redirectKlinike() {
        if (this.state.redirectProfilKlinike)
            return <Redirect to="profilKlinike" />

    }

   
    
    renderKlinike = () => {
        
        const klinike = this.props.klinike ?  this.props.klinike : [];
        console.log(klinike);
        console.log(klinike.length);

        if(klinike.length === undefined)
        {
            return (
                
                <div key={klinike.id} id={klinike.id} className="ui link cards">
                    <div className="card">
                        <div className="content"  onClick={(e) => {this.handleClick(klinike.id); }}>
                            <div className="header"> {klinike.name}</div>
                        <div className="description">
                            {klinike.city}
                        </div>
                        </div>
                    </div>
                 </div>
        );
        }

        if (klinike.length >= 1 && klinike !== null)
        {
        return klinike.map((klinika) => {    
            return (          
                <div className="ui link cards">
                    <div className="card" onClick={(e) => {this.handleClick(klinika.id)}}>
                        <div className="image">
                            <img alt="da" src={klinika.picture}/>
                        </div>
                    <div className="content">
                        <div className="header">{klinika.name}</div>
                        <br/> <br />
                        <div className="meta">
                            <a>Likes: {klinika.likes}</a>
                        </div>
                        <div className="description">
                            {klinika.city}
                            {klinika.address}
                        </div>
                    </div>
                    <div className="extra content">
                        <span className="right floated">
                        Prosecna ocena: {klinika.ocena}
                        </span>
                        <span>
                            <i className="user icon"></i>
                            {klinika.user.length}
                        </span>
                    </div>
                    </div>
                </div>
            ); 
        });
         }
     }

    render() {
        return (
            <div>
                {this.renderKlinike()}
                {this.redirectKlinike()}
            </div>
        );
    }

}
  
  const mapDispatchToProps = dispatch => {
    return {
       sacuvaj_kliniku_profila: (klinikaProfila) => dispatch(actions.sacuvajKlinikuProfila(klinikaProfila)),

    }
  }
  
  export default connect(null, mapDispatchToProps)(ListaKlinika);