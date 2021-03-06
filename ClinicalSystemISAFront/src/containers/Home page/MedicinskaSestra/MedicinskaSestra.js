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
import DatePicker from 'react-datepicker';
import moment from 'moment';




const initialState = { korisnik : null, pacijenti: [], pacijentisort: []}

class MedicinskaSestra extends React.Component {

    state = { po: '', datum: null };

    componentDidMount(){
        console.log('MAUNT');
        this.props.vratiKorisnike();
        this.props.sviPacijenti();
        this.props.sortiraniPacijenti();
        this.setState({datum: new Date()});
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
            return <FormaMejla vrati={this.funZaMail}/>
        }

        if(this.state.po==='KALENDAR'){
            return (
              <DatePicker
              onChange={date => this.promeni(date)}
              selected={this.state.datum}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            );
        }

        if(this.state.po==='ODG' && this.props.odgovor==null){
            return <Spinner poruka="Slanje zahteva"/>
        }

        if(this.state.po==='ODG' && this.props.odgovor==201){
            return <div className="ui success message"><div className="header">Zahtev poslat!</div><p>Vas zahtev je uspesno poslat administratoru klinike.</p></div>
        }

        if(this.state.po==='IZLOGUJ'){
            sessionStorage.clear();
            return <Redirect to='/login'/>
        }

    }

    funZaMail = (podaci) => {
        this.props.slanjeMaila(this.props.korisnik.username, podaci.tip, podaci.tekst);
        this.props.slanjeZahteva(podaci.tip, '', '', '', this.props.korisnik.id);
        this.setState({po: 'ODG'});
    }

    promeni(date){
        const sada = new Date();
        if(moment(sada).isBefore(date)){
            this.setState({datum: date});
        }
    }

    funZaSortiranje =(pod) => {
      this.setState({po: pod});
    }


    prijavljenJeKo() {
        if (this.props.prijavljenKorisnik !== null && this.props.prijavljenKorisnik !== undefined)
        {
          console.log('AAAAAAAAAAAAAAA')
          if ( this.props.prijavljenKorisnik.role === 'DOCTOR')
            return <Redirect to="/doktor" />;
  
          if( this.props.prijavljenKorisnik.role === 'PATIENT')
            return <Redirect to="/pacijenti" />
  
          if( this.props.prijavljenKorisnik.role === 'ADMINC')
            return <Redirect to="/adminKlinike" />
        }
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
                            <a className="item" onClick={(e)=>{this.setState({po: 'IZLOGUJ'});}}>Izloguj se</a>
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
        return (
            <div> 
                {this.renderComponent()}
                {this.prijavljenJeKo()}
            </div>
        );
    }

}

const mapStateToProps = state => {
    console.log('STEJTO TO PROPS');
    console.log(state.auth.prijavljenKorisnik);
    console.log(state.auth.pacijenti);
    console.log(state.auth.pacijentisort);
    console.log(state.auth.odgovor);
    console.log(state.auth.zahtevSestre);
    return {
       korisnik: state.auth.prijavljenKorisnik,
       pacijenti: state.auth.pacijenti,
       pacijentisort: state.auth.pacijentisort,
       odgovor: state.auth.odgovor
    }
};

const mapDispatchToProps = dispatch => {
    console.log('DISPEC TO PROPS');
    return {
        vratiKorisnike: () => dispatch(actions.prijavljenKorisnik()),
        sviPacijenti: () => dispatch(actions.pacijenti()),
        sortiraniPacijenti: () => dispatch(actions.sortiraniPacijenti()),
        slanjeMaila: (mailFrom, mailTo, dodatak) => dispatch(actions.slanjeMaila(mailFrom, mailTo, dodatak)),
        slanjeZahteva: (tip, datum, doktorId, adminId, posiljalacId) => dispatch(actions.slanjeZahteva(tip, datum, doktorId, adminId, posiljalacId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicinskaSestra);