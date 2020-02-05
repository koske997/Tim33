import React from 'react';


class Odgovor extends React.Component {

    state = { tekst: ''};

    posalji(){
        this.props.vrati(this.state.tekst);
    }

    render(){
        return(
            <div className="ui form success">
                <div className="field">
                    <label>Navedite razlog za slanje zahteva:</label>
                    <textarea  value={this.state.tekst}  onChange={(e) => {this.setState({tekst: e.target.value});}}></textarea>
                </div>
                <div className="ui submit button" onClick={(e) => {this.posalji();}}>Posalji</div>
            </div>
        );
    }

}

export default Odgovor;