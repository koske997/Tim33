import React, { Component } from "react";
import Auth from "../../../store/actions/auth"

import {connect} from 'react-redux';


 
class Klinike extends Component {

  

  render() {
    // sessionStorage.getItem('role');  Dobijam role trenutno ulogovanog korisnika
    return (
      <div>
        <h2>Spisak svih klinika: </h2>
        <p>Ovde mozete da vidite osnovne podatke o svim klinikama  koje postoje u nasoj evidenciji.</p>

        <div>
           <span>{this.props.userId} </span>
        </div>

        <button className="ageUp" onClick={this.props.onAgeUp} >Button1</button>
        <button className="ageDown" onClick={this.props.onAgeDown} >Button2</button>
        <hr/>
        <div>History</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
      token: state.token,
      userId: state.userId
  }}

const mapDispatchToProps = dispatch => {
  return {
     onAgeUp: () => dispatch({type: "AGE_UP", value: 1}),
      onAgeDown: () => dispatch({type: "AGE_DOWN", value: 1})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Klinike);