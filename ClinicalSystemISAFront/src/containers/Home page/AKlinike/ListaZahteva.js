import React from 'react';
import KarticaZahteva from './KarticaZahteva';

class ListaZahteva extends React.Component {

    constructor(props, context){
        super(props, context);
        this.funNazad2 = this.props.obrada.bind(this);
      }


    funNazad2(id, str, tip){
        console.log(id);
        this.props.obrada(id, str, tip);
    }

    renderDrugi(){
        const zahtevii = this.props.podaci.map((pod) => {
            return <KarticaZahteva key={pod.id} ostalo={pod} fun={this.funNazad2}/>
        });
        return <div className="ui cards">{zahtevii}</div>;
    }

    render(){
            return (
                <div>
                    {this.renderDrugi()}
                </div>
            );
    }
}

export default ListaZahteva;