import React from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import PretragaKlinika from './PretragaKlinika/PretragaKlinika'


class ListaKlinika extends React.Component {

    state ={
        selectedKlinika: [],
        openModal: false,
    };

    handleClick = id => {
        const { klinike = [] } = this.props;
        const klinika = klinike.find(value => id === value.id);
        this.setState({
            selectedKlinika: klinika,
            openModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

   
    
    renderKlinike = () => {
        
        const klinike = this.props.klinike ?  this.props.klinike : [];
        console.log(klinike);
        console.log(klinike.length);

        if(klinike.length === undefined)
        {
            return (
                <div key={klinike.id} id={klinike.id} className="ui link cards">
                    <div className="card">
                        <div className="content"  onClick={(e) => {this.handleClick(klinike.id); }}>
                            <div className="header"> {klinike.name}</div>
                        <div className="description">
                            {klinike.city}
                        </div>
                        </div>
                    </div>
                 </div>
        );
        }

        if (klinike.length >= 1)
        {
        return klinike.map((klinika) => {    
            return (
                    <div key={klinika.id} id={klinika.id} className="ui link cards">
                        <div className="card">
                            <div className="content"  onClick={(e) => {this.handleClick(klinika.id); }}>
                                <div className="header"> {klinika.name}</div>
                            <div className="description">
                                {klinika.city}
                            </div>
                            </div>
                        </div>
                     </div>
            );
        });
         }
     }

    render() {
        return (
            <div>
                {this.renderKlinike()}
            </div>
        );
    }

}

export default ListaKlinika;