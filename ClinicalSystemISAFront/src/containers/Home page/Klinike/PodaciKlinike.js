import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaKlinika from "../Klinike/ListaKlinika";
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';




 
class PodaciKlinike extends React.Component {

  state = {
    sveKlinike: null,
    obelezenaKlinika: null,
    redirectPretragaDoktora: false,
  }

  renderRedirect = () => {
    if (this.state.redirectPretragaDoktora) {
        
      return <Redirect to='/pretragaDoktora'/>
    }
    
  }


  handleClick = () => {

      this.setState({
          redirectPretragaDoktora: true,
      });

      this.props.tipovi_pregleda();
      this.props.svi_pregledi();

  }


  renderObelezeneKlinike = () => {
    console.log(this.props);
    if(this.props.obelezenaKlinika !== undefined && this.props.obelezenaKlinika !== null)
    {
      return (
        <div>
          <hr />

          <h1>{this.props.obelezenaKlinika.name} </h1>

          <div>
          <img class="ui medium circular image" src={this.props.obelezenaKlinika.picture} />

          </div>

          <hr />
          <div>
            <div class="ui statistics">

              <div class="statistic">
                <div class="value">
                  {this.props.obelezenaKlinika.likes}
                </div>
                <div class="label">
                  Likes
                </div>
              </div>

              <div class="statistic">
                <div class="value">
                  {this.props.obelezenaKlinika.user.length}
                </div>
                <div class="label">
                  Members
                </div>
              </div>

              <div class="statistic">
                <div class="value">
                  {this.props.obelezenaKlinika.city}
                </div>
                <div class="label">
                  City
                </div>

              </div>
            </div>
          </div>
          <hr />
          

          <hr />
          <div class="ui items">
            <div class="item" onClick={(e) => {this.handleClick(e);}}>
              <div class="middle aligned content">
                <a class="header">Pretrazi doktore ove klinike</a>
              </div>
            </div>
          </div>

        </div>
      );
    }
 }

  render() {

    return (
      <div>
        {this.renderObelezeneKlinike()}
        {this.renderRedirect()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    obelezenaKlinika: state.auth.obelezenaKlinika,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tipovi_pregleda: () => dispatch(actions.tipoviPregleda()),

    svi_pregledi: () => dispatch(actions.pregledi()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PodaciKlinike);