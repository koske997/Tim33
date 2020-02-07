import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


class Sala extends React.Component {

    state = {broj: 0};

    provera(){
        console.log('ODJE MICOOO!!!');
        this.props.proveriBrate(this.state.broj,this.props.datum);
        console.log(this.props.datum);
        if(this.props.moze==false || this.props.moze==null){
            alert('Odabrana sala je za trazeni termin zauzeta!!');
        }else{
            this.props.vraceno(this.state.broj);
        }
    }

    render(){
        const sala = this.props.sale.map((s) => {
                return (
                    <option key={s.id} value={s.id}>{s.number}</option>
                    );
        });

        return (
            <div className="ui form">
                <div className="field">
                    <label>Odaberite slobodnu salu:</label>
                    </div>
                <div className="field">
                    <select value={this.state.broj} onChange={e => {this.setState({broj: e.target.value});}}>
                        {sala}
                    </select>
                </div>
                <button className="ui button" onClick={e => {this.provera();}}>Zakazi pregled!</button>
            </div>
        );

    }

}

const mapStateToProps = state => {
    console.log(state.auth.moze);
    return {
        moze: state.auth.moze
    }
}

const mapDispatchToProps = dispatch => {
    return {
        proveriBrate: (idSale, datum) => dispatch(actions.zauzeceSale(idSale, datum))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sala);