import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import ListaSala_1 from '.././ListaSala_1';
import ListaTipovaPregleda from "../ListaTipovaPregleda";
import UnosTipaPregleda from './UnosTipaPregleda';
import ListaTipovaPregledaa from "./ListaTipovaPregledaa";








class TipoviPregleda extends React.Component {

  state = {
    redirect: false,
}

  
  setRedirect = (e) => {
      this.setState({
        redirect: true
      })
  }


  renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/unosTipaPregleda' />
      }
    
  }



  renderMeni(){
    if(this.state.odabir==='DODAJ'){
      if(this.state.klinikaAdmina !== null)
          return <UnosTipaPregleda />;
    }

    if(this.state.odabir==='TIPOVI'){
      return <ListaTipovaPregledaa tipoviPregleda={this.props.tipoviPregleda} />;
    }
    
    if (this.state.odabir === 'VRATI')
    {
      return this.props.history.push("/adminKlinike")
    }
  }




  renderModifikacijeTipa = () => {
    return (
        <div>
          <div style={{ float: "left"}}>
                      <div className="ui secondary  menu">
                          <a className="item" onClick={(e) => {this.props.prikazi_tipove_pregleda(e); this.props.prikazi_preglede(e); this.setState({ odabir: 'DODAJ'});}}>Unesi novi tip</a>
                          <a className="item" onClick={(e) => {this.props.prikazi_tipove_pregleda(e); this.props.prikazi_preglede(e); this.setState({odabir: 'TIPOVI'});}}> Tipovi pregleda</a>
                          <a className="item" onClick={(e)=>{ this.setState({odabir: 'VRATI'})}}> NAZAD</a>

                      </div>
                  </div>
              <br/>
              <br/>
              <br/>
              <br/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  {this.renderMeni()}
            </div>
    </div>
    );
  }



  render(){
      return (
        <div>
            {this.renderModifikacijeTipa()}
        </div>
    );
  }   


  
 
}



const mapStateToProps = state => {
    console.log(state.auth.tipoviPregleda);
    return {
        sale: state.auth.sale,
        doktori: state.auth.doktori,
        tipoviPregleda: state.auth.tipoviPregleda
    }
}

const mapDispatchToProps = dispatch => {
    return {
        prikazi_tipove_pregleda: () => dispatch(actions.tipoviPregleda()),
        prikazi_preglede: () => dispatch(actions.tipoviPregleda())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TipoviPregleda);