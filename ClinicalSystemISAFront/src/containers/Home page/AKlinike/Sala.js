import React from 'react';


class Sala extends React.Component {

    state = {broj: 0};

    render(){
        const sala = this.props.sale.map((s) => {
            if(s.free==true){
                return (
                    <option key={s.id} value={s.id}>{s.number}</option>
                    );
            }
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
                <button className="ui button" onClick={e => {console.log(this.state.broj)}}>Zakazi pregled!</button>
            </div>
        );

    }

}



export default Sala;