import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';


class KarticaZahteva extends React.Component {


    
    funNazad(id, str, tip, datum){
        this.props.fun(id, str, tip, datum);
        console.log(this.props.ostalo);
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
                                    <div className="ui basic green button" onClick={(e) => {this.funNazad(this.props.ostalo.id,'PRI',this.props.ostalo.tip,this.props.ostalo.datum);}}>Prihvati</div>
                                    <div className="ui basic red button" onClick={(e) => {this.funNazad(this.props.ostalo.id,'ODB',this.props.ostalo.tip,this.props.ostalo.datum);}}>Odbij</div>
                                </div>
                                </div>
                            </div>
                
            );
    }
}

export default KarticaZahteva;