import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Spinner from '../Spinner';
import KarticaKorisnika from './KarticaKorisnika';
import ListaKorisnika from './ListaKorisnika';
import SelektBar from './SelektBar';
import Calendar from 'react-calendar';
import FormaMejla from './FormaMejla';


const initialState = { korisnik : null, pacijenti: [], pacijentisort: []}

class MedicinskaSestra extends React.Component {

    state = { po: '' };

    componentDidMount(){
        console.log('MAUNT');
        this.props.vratiKorisnike();
        this.props.sviPacijenti();
        this.props.sortiraniPacijenti();
    }


    renderPac(){
        if(this.props.pacijenti!=null && (this.state.po==='' || this.state.po==='ID')){
            console.log('PISACE LISTU');
           return <ListaKorisnika lista={this.props.pacijenti}/>;
        }

        if(this.props.pacijentisort!=null && this.state.po==='IME'){
            console.log('PISI JOPE');
            return <ListaKorisnika lista={this.props.pacijentisort}/>;
        }

        if(this.state.po==='SESTRA'){
            return <div className="ui link cards"><KarticaKorisnika slika={this.props.korisnik} /></div>;
        }

        if(this.state.po==='ZAHTEV'){
            return <FormaMejla />
        }

        if(this.state.po==='KALENDAR'){
            return <Calendar />
        }

    }

    funZaSortiranje =(pod) => {
      this.setState({po: pod});
    }

    renderComponent(){
        if(this.props.korisnik!=null){
            return (
                <div>
                    <div style={{ float: "left"}}>
                        <div className="ui secondary  menu">
                            <a className="item" onClick={(e)=>{ this.setState({po: ''});}}> Pocetna</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'ZAHTEV'});}}> Zahtev za odsustvo/godisnji</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'SESTRA'});}}>Profil</a>
                            <a className="item"> Overa recepta</a>
                            <a className="item" onClick={(e)=>{this.setState({po: 'KALENDAR'});}}> Radni Kalendar</a>
                        </div>
                    </div>
                    <div style={{ float: "right"}}> 
                                <SelektBar fja={this.funZaSortiranje}/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="ui blue image label" onClick={(e) => { this.setState({po: 'SESTRA'});}}>
                                    <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg"/>{this.props.korisnik.username}
                                        <div className="detail">{this.props.korisnik.role}</div> 
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

    render(){
        console.log('RENDER');
        console.log(this.props.korisnik);
        console.log(this.props.pacijenti);
        console.log(this.props.pacijentisort);
        return (
            <div> {this.renderComponent()}</div>
        );
    }

}

const mapStateToProps = state => {
    console.log('STEJTO TO PROPS');
    console.log(state.auth.prijavljenKorisnik);
    console.log(state.auth.pacijenti);
    console.log(state.auth.pacijentisort);
    return {
       korisnik: state.auth.prijavljenKorisnik,
       pacijenti: state.auth.pacijenti,
       pacijentisort: state.auth.pacijentisort
    }
};

const mapDispatchToProps = dispatch => {
    console.log('DISPEC TO PROPS');
    return {
        vratiKorisnike: () => dispatch(actions.prijavljenKorisnik()),
        sviPacijenti: () => dispatch(actions.pacijenti()),
        sortiraniPacijenti: () => dispatch(actions.sortiraniPacijenti())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicinskaSestra);