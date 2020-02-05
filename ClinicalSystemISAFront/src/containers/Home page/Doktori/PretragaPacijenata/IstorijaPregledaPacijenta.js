import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';


class IstorijaPregledaPacijenta extends React.Component
{
    state = {
        redirectt: false,
        selektovanPregled: null,
    }



 
    selectChangeHandler = (e) => {
        console.log(e.target.value)
        let pregled;

        if (this.props.istorijaPregleda !== null && this.props.istorijaPregleda !== undefined)
        {
            console.log('Udjes li');
            for (let i=0; i<this.props.istorijaPregleda.length; i++)
            {
                if (this.props.istorijaPregleda[i].id === parseInt(e.target.value))
                {
                    console.log('Udjes li2');
                    pregled = this.props.istorijaPregleda[i];
                }
            }
        }
        
        console.log(pregled);
        this.props.sacuvaj_pregled(pregled);

        this.setState({
            selektovanPregled: e.target.value,
        });
    }

    renderPregleda = () => {
        if (this.props.istorijaPregleda !== null && this.props.istorijaPregleda !== undefined)
        {
            const istorijaPregleda = this.props.istorijaPregleda;
            return istorijaPregleda.map((pregled) => {    
                return (
                <option key={pregled.id} id={pregled.id} >{pregled.id}</option>
                );
            });
        }
     }

    render() {
        return (
            <div>
                <select value={this.state.selektovanPregled} onChange={(e) => this.selectChangeHandler(e)}>
                    {this.renderPregleda()}
                </select>
            </div>
        );
    }

}


const mapDispatchToProps = dispatch => {
    return {

         sacuvaj_pregled: (pregledKarton) => dispatch(actions.sacuvajPregledKarton(pregledKarton)),
    }
};
export default connect(null, mapDispatchToProps)(IstorijaPregledaPacijenta);