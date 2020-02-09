import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import ListaSala_1 from './ListaSala_1';
import UnosSale from './UnosSale';


class saleZaPregled extends React.Component {

  state = {
    redirectPregled: false,
    rezervacije: null,
}

componentDidMount(){
  this.props.sve_rezervacije();
}
  
setRedirect = (e) => {
    this.setState({
      redirectPregled: true
    })
}



renderPac(){
  if(this.state.po==='NOVA'){
    return <UnosSale />
  }

  if(this.state.po==='IZMENA'){
      return <div>
              <ListaSala_1 sale={this.props.sale} rezervacije={this.props.rezervacije}/>
            </div>
  }
  
  if(this.state.po === 'VRATI')
  {
    return this.props.history.push("/adminKlinike");
  }
}

renderComponent(){
      return (
          <div>
              <div style={{ float: "left"}}>
                  <div className="ui secondary  menu">
                      <a className="item" onClick={(e)=>{ this.setState({po: 'NOVA'});}}> Unesi novu salu za preglede i operacije</a>
                      <a className="item" onClick={(e)=>{ this.props.prikazi_sale(e); this.setState({po: 'IZMENA'})}}> Izmeni sale</a>
                      <a className="item" onClick={(e)=>{ this.setState({po: 'VRATI'})}}> NAZAD</a>

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
        tipoviPregleda: state.auth.tipoviPregleda,

        rezervacije: state.auth.rezervacije,
    }
}

const mapDispatchToProps = dispatch => {
    return {

        prikazi_sale: () => dispatch(actions.sale()),
        prikazi_doktore: () => dispatch(actions.doktori()),
        prikazi_tipove_pregleda: () => dispatch(actions.tipoviPregleda()),

        sve_rezervacije: () => dispatch(actions.rezervacije()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(saleZaPregled);