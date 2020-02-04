import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import Spinner from '../../Spinner';
import KarticaProfilaPacijenta from './KarticaProfilaPacijenta';
import MedicinskiKartonPacijenta from './MedicinskiKartonPacijenta';
import FormaZaPregled from './FormaZaPregled';

const initialState = { korisnik : null, pacijenti: [], pacijentisort: []}

class ProfilPacijenta extends React.Component {

    state = { 
        po: '',
        obelezenPacijent: null,
    };

    componentDidMount(){
        console.log(this.props);
        this.props.vratiKorisnike();
        this.props.sviPacijenti();
    }


    renderPac(){

        if (this.state.po==='PROFIL'){
            return <KarticaProfilaPacijenta pacijent={this.props.obelezenPacijent} />;
        }

        if (this.state.po === 'KARTON')
        {
            return <MedicinskiKartonPacijenta />
        }

        if (this.state.po === 'ZAPOCNI PREGLED')
        {
            return <FormaZaPregled />
        }

    }


    renderComponent(){
        if(this.props.korisnik!=null){
            return (
                <div>
                    <div style={{ float: "left"}}>
                        <div className="ui secondary  menu">
                            <a className="item" onClick={(e)=>{ this.setState({po: ''});}}> Pocetna</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'PROFIL'});}}>Profil</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'KARTON'});}}> Medicinski karton</a>
                            <a className="item" onClick={(e)=>{ this.setState({po: 'ZAPOCNI PREGLED'}); this.props.bolesti(e); this.props.lekovi(e); }}>Zapocni pregled</a>

                        </div>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />

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
            <div> {this.renderComponent()}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
       korisnik: state.auth.prijavljenKorisnik,
       pacijenti: state.auth.pacijenti,
       pacijentisort: state.auth.pacijentisort,
       odgovor: state.auth.odgovor,

       obelezenPacijent: state.auth.obelezenPacijent,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        vratiKorisnike: () => dispatch(actions.prijavljenKorisnik()),
        sviPacijenti: () => dispatch(actions.pacijenti()),
        sortiraniPacijenti: () => dispatch(actions.sortiraniPacijenti()),
        slanjeMaila: (mailFrom, mailTo, dodatak) => dispatch(actions.slanjeMaila(mailFrom, mailTo, dodatak)),


        bolesti: () => dispatch(actions.bolesti()),
        lekovi: () => dispatch(actions.lekovi()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilPacijenta);