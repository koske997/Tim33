import React, { Component } from "react";
import Auth from "../../../store/actions/auth"
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaKlinika from "../Klinike/ListaKlinika";
import { Button, Header, Image, Modal } from 'semantic-ui-react';



 
class PodaciKlinike extends React.Component {

  state = {
    sveKlinike: null,
    obelezenaKlinika: null,
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
                  Doctors
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
          <div class="ui items">
            <div class="item">
              <div class="middle aligned content">
                <a class="header">Prikazi sve zaposlene doktore</a>
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

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PodaciKlinike);