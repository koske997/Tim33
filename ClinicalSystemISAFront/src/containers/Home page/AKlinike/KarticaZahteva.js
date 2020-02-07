import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';


class KarticaZahteva extends React.Component {


    
    funNazad(id, str, tip){
        this.props.fun(id, str, tip);
    }

    

    render(){
            return (
                
                            <div className="card">
                                <div className="content">
                                <img className="right floated mini ui image" src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"/>
                                <div className="header">
                                    Zahtev za {this.props.ostalo.tip}
                                </div>
                                <div className="meta">
                                    Od nekoga
                                </div>
                                <div className="description">
                                Za datum {this.props.ostalo.datum}
                                </div>
                                </div>
                                <div className="extra content">
                                <div className="ui two buttons">
                                    <div className="ui basic green button" onClick={(e) => {this.funNazad(this.props.ostalo.id,'PRI',this.props.ostalo.tip);}}>Prihvati</div>
                                    <div className="ui basic red button" onClick={(e) => {this.funNazad(this.props.ostalo.id,'ODB',this.props.ostalo.tip);}}>Odbij</div>
                                </div>
                                </div>
                            </div>
                
            );
    }
}

export default KarticaZahteva;