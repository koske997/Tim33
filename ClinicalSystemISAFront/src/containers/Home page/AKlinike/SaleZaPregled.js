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

renderPac(){
  if(this.state.po==='NOVA'){
    return <Redirect to='/unosSale' />
  }

  if(this.state.po==='IZMENA'){
      return <div>
              <ListaSala_1 sale={this.props.sale} />
            </div>
  }
}

renderComponent(){
      return (
          <div>
              <div style={{ float: "left"}}>
                  <div className="ui secondary  menu">
                      <a className="item" onClick={(e)=>{ this.setState({po: 'NOVA'});}}> Unesi novu salu za preglede i operacije</a>
                      <a className="item" onClick={(e)=>{ this.props.prikazi_sale(e); this.setState({po: 'IZMENA'})}}> Izmeni podatke sale</a>
                  </div>
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



  
  render() {
      return (
        <div>
          {this.renderComponent()}
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