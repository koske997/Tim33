import React from 'react';
import * as actions from '../../../../store/actions/index';
import get from 'lodash/get';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PretragaKlinika from './PretragaKlinika';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import ListaOpisaModala from './ListaOpisaModala';
import DatePicker from 'react-datepicker';
import moment from 'moment';



class Popup extends React.Component{

    state = {
        number: '',
        free: false,
        id: null,
        imeKlinike: '',
        imePregleda: '',
        po: '',
        doktoriTeKlinike: [],
        datum: null,
        usaoJednom: true,
    };

    componentDidMount(){
        this.setState({datum: new Date()});
        console.log('EVO VAMOOOOOOOOOOOOOOOOOOOOOOOOOO');
        console.log(this.props.doktorii);
    }
    componentDidUpdate(prevProps)
    {
        const doktori1= get(prevProps, 'doktorii');
        const doktori2 = get(this.props, 'doktorii');

        if (doktori1 !== doktori2)
        {
            this.setState({
                usaoJednom: true
            })
        }
        
    }

    


    uzmiId = (id2) => {
        console.log('VRATIO');
        console.log(this.props.tip);
        this.props.vrni(id2, this.props.tip, this.state.datum);
        {/* this.setState({po: 'JES', id: id2});*/}
    }

    renderModala = () => {
        const { openModal, closeModal } = this.props;

       
        if (this.props.openModal)
        {
            console.log('SACEEEE');
            console.log(this.props.doktorii);
        return (
            <Modal open={openModal} onClose={() => closeModal()}>
            <Modal.Header>{this.props.klinikee.name} -> pregled : {this.props.pregledd.type}</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
              <Modal.Description>
                <hr />
              <ListaOpisaModala vrati={this.uzmiId} doktori={this.props.doktorii} />
                <hr />
                <DatePicker
                    onChange={date => this.promeni(date)}
                    selected={this.state.datum}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
              />
              <br/>
              <br/>
              <br/>
              <Button onClick={() => closeModal()} >Izadji</Button>
              </Modal.Description>
            </Modal.Content>
            </Modal>
        );
        }
    }

    renderCeraj(){
        if(this.state.po==='JES'){
            return <Redirect to={{path: '/zakazi', state:  this.state.id}} />;
        }
    }

    promeni(date){
        const sada = new Date();
        if(moment(sada).isBefore(date)){
            this.setState({datum: date});
        }
    }


    render() {
        return (
            <div>
                {this.renderCeraj()}
                {this.renderModala()}
              {/** {this.renderPromenuStanja()}*/}  
            </div>
        );
    }
}




class ListaKlinika_Pretraga extends React.Component {

    state ={
        selectedKlinika: [],
        openModal: false,

        pregled: null,
        doktori: [],
    };

    handleClick = id => {
        const klinike = this.props.klinike;
        const klinika = klinike.find(value => id === value.id);
        this.props.trazii(id, '', '', '', this.props.tip);
        if(this.props.pretraziTip)
        {
            this.setState({
                selectedKlinika: klinika,
                openModal: true,
                doktori: this.props.doktori,
                pregled: this.props.pregled
            });
        }
    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

   
    resavaSve = (id, tip, datum) => {
        this.props.slanjeZahteva(tip, datum, id, '', this.props.korisnik.id);
    }

    renderKlinike = () => {
        
        
            const klinike = this.props.klinike ?  this.props.klinike : [];
        console.log(this.props);

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


        if (klinike.length >= 1)
        {
            
        return klinike.map((klinika) => {    
            return (
                    <div key={klinika.id} id={klinika.id} className="ui link cards">
                        <div className="card">
                            <div className="content"  onClick={(e) => {this.handleClick(klinika.id); }}>
                                <div className="header"> {klinika.name}</div>
                            <div className="description">
                                {klinika.city}
                            </div>
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
                <Popup vrni={this.resavaSve} tip={this.props.tip} klinikee={this.state.selectedKlinika} doktorii={this.props.doktoree} pregledd={this.state.pregled} openModal={this.state.openModal} closeModal={this.closeModal} /> 
                {this.renderKlinike()}
            </div>
        );
    }

}

const mapStateToProps = state => {
    console.log(state.auth.prijavljenKorisnik);
    console.log('DZIM JEBOTE');
    console.log(state.auth.potrebniDoktori);
    return {
       korisnik: state.auth.prijavljenKorisnik,
       doktoree: state.auth.potrebniDoktori
    }
};



const mapDispatchToProps = dispatch => {
    return {
        slanjeZahteva: (tip, datum, doktorId, adminId, posiljalacId) => dispatch(actions.slanjeZahteva(tip, datum, doktorId, adminId, posiljalacId)),
        vratiKorisnike: () => dispatch(actions.prijavljenKorisnik()),
        trazii: (id, naziv, grad, lajkovi, tip) => dispatch(actions.traziDoktore(id, naziv, grad, lajkovi, tip)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListaKlinika_Pretraga);