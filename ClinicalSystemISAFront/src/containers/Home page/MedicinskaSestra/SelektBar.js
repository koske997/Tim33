import React from 'react';

class SelektBar extends React.Component {

    saljiNazad(pod){
        this.props.fja(pod);
    }   


    render(){
        return (
            <select className="ui search dropdown" onChange={(e) => {this.saljiNazad(e.target.value)}}>
                    <option value="">Sortiraj po ...</option>
                    <option value="ID">Id-ju korisnika</option>
                    <option value="IME">Po imenu korisnika</option>
            </select>
        );
    }

}

export default SelektBar;
