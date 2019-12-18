import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaPacijenata from './ListaPacijenata';
import { Redirect } from 'react-router-dom'




const initialState = {
  pacijenti: null
}


class Doktori extends React.Component {

    state = {
        redirect: false
    }

      
    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/pregled' />
        }
    }


  render() {
    console.log(this.props.pacijenti);
    return (
      <div className="ui segment">
        <h2>Lista svih pacijenata </h2>

        <div>         
          <ListaPacijenata  pacijenti={this.props.pacijenti}/>
        </div>

        <button className="ui button" onClick={this.props.prikazi_pacijente} >Prikazi pacijente</button>
        <hr/>

        <button class="ui labeled icon button">
            <i class="left arrow icon"></i>
                Istorija pregleda
        </button>

        {this.renderRedirect()}

        <button class="ui right labeled icon button" onClick={this.setRedirect}>
            <i class="right arrow icon"></i>
                Zapocni pregled
        </button>

      </div>

     
    );
  }
}

const mapStateToProps = state => {
  console.log(state.auth);
  return {
      pacijenti: state.auth.pacijenti,
  }
}

const mapDispatchToProps = dispatch => {
  return {
     prikazi_pacijente: () => dispatch(actions.pacijenti()),
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doktori);