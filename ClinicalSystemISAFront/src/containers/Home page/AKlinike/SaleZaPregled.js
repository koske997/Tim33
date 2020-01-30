import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaSala_1 from './ListaSala_1';





const initialState = {
    sale: null,
    doktori: null,
    tipoviPregleda: null
}

class saleZaPregled extends React.Component {

  state = {
    redirectPregled: false,
}

  
setRedirect = (e) => {
    this.setState({
      redirectPregled: true
    })
}

  


renderRedirect = () => {
    if (this.state.redirectPregled) {
      return <Redirect to='/unosSale' />
    }

}


  
  render() {
      return (
      <div>
            <h3>Sale za pregled i operacije </h3>

        <div className="ui segment">
            <h4>Dodaj novu salu</h4>

            {this.renderRedirect()}

            <button className="Unesi_salu" onClick={ (e) => {this.setRedirect(e);}} >Unesi novu salu</button>
            <hr/>
        </div>

        <div className="ui segment">
          <h4>Lista svih sala </h4>  
          
          <div>
            <ListaSala_1 sale={this.props.sale} />
          </div>
          <button className="Prikazi_sale" onClick={this.props.prikazi_sale} >Prikazi sve sale</button>


        </div>

   </div>
    );
  }
}



const mapStateToProps = state => {
    console.log(state.auth.sale);
    return {
        sale: state.auth.sale,
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda
    }
}

const mapDispatchToProps = dispatch => {
    return {

        prikazi_sale: () => dispatch(actions.sale()),
        prikazi_doktore: () => dispatch(actions.doktori()),
        prikazi_tipove_pregleda: () => dispatch(actions.tipoviPregleda())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(saleZaPregled);