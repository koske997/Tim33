import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaPacijenata from './ListaPacijenata';
import ListaKlinika from './ListaKlinika';


const initialState = {
  pacijenti: null,
  klinike: null,
  karton: 'prazan'
}



class Pacijenti extends React.Component {

  
  render() {
    console.log(this.props.pacijenti);
    return (
      <div className="ui segment">
        <h2>Lista svih pacijenata </h2>

        <div>         
          <ListaPacijenata  pacijenti={this.props.pacijenti}/>
        </div>

        <button className="Prikazi_pacijente" onClick={this.props.prikazi_pacijente} >Prikazi pacijente</button>
        <hr/>


      <div className="ui segment">
        <h2>Lista svih klinika</h2>  
        
        <div>
          <ListaKlinika klinike={this.props.klinike} />
        </div>

        <button className="Prikazi_klinike" onClick={this.props.prikazi_klinike} >Prikazi klinike</button>
      </div>

      <div className="ui segment">
        <h2>Medicinski karton</h2>  
        
        
        <div>
          <span>Karton</span>
        </div>

        <button className="Prikazi_karton" onClick={this.props.prikazi_karton} >Prikazi karton</button>
      </div>

      </div>

     
    );
  }
}

const mapStateToProps = state => {
  console.log(state.auth);
  return {
      pacijenti: state.auth.pacijenti,
      klinike: state.auth.klinike,
      karton: state.auth.karton
  }
}

const mapDispatchToProps = dispatch => {
  return {
     prikazi_pacijente: () => dispatch(actions.pacijenti()),
     prikazi_klinike: () => dispatch(actions.klinike()),
     prikazi_karton: () => dispatch(actions.karton())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pacijenti);