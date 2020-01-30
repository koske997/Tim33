import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaPregleda from './ListaPregleda';
import ListaOperacija from './ListaOperacija';


const initialState = {
  karton: null,
  pregledi: null,
  operacije: null
}

class MedicinskiKarton extends React.Component {

  
  render() {
    console.log(this.props.karton);
    return (
      <div>

        <div className="ui segment">
          <h2>Istorija pregleda </h2>

          <div>         
            <ListaPregleda pregledi={this.props.karton}/>
          </div>

          <button className="Prikazi_preglede" onClick={this.props.prikazi_karton} >Prikazi preglede</button>
        </div>

        <div className="ui segment">
          <h2>Istorija operacija</h2>  
          
          <div>
            <ListaOperacija operacije={this.props.karton} />
          </div>

          <button className="Prikazi_operacije" onClick={this.props.prikazi_karton} >Prikazi operacije</button>
        </div>

      
      </div>

     
    );
  }
}

const mapStateToProps = state => {
  console.log(state.auth);
  return {
      karton: state.auth.karton,
  }
}

const mapDispatchToProps = dispatch => {
  return {
     prikazi_karton: () => dispatch(actions.karton()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicinskiKarton);