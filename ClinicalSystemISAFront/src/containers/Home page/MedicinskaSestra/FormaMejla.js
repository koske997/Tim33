import React from 'react';


class FormaMejla extends React.Component{

    state = { tip: '', tekst: ''};

    cerajDalje(){
        this.props.vrati(this.state);
    }


    render(){
        return (
            <div className="ui form success">
                <div className="field">
                    <div className="ui radio checkbox">
                        <input type="radio" name="example2" onClick={(e) => {this.setState({tip: 'godisnji'});}}/>
                        <label>Godisnji</label>
                    </div>
                </div>     
                <div className="field">
                    <div className="ui radio checkbox">
                        <input type="radio" name="example2" onClick={(e) => {this.setState({tip: 'odsustvo'});}}/>
                        <label>Odsustvo</label>
                    </div>
                </div> 
                <div className="field">
                    <label>Navedite razlog za slanje zahteva:</label>
                    <textarea  value={this.state.tekst}  onChange={(e) => {this.setState({tekst: e.target.value});}}></textarea>
                </div>
                <div className="ui submit button" onClick={(e) => {this.cerajDalje();}}>Posalji zahtev</div>
            </div>
        );
    }

}

export default FormaMejla;