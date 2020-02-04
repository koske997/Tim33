import React from 'react';
import KarticaZahteva from './KarticaZahteva';

const ListaZahteva = (props) => {

    const zahtevii = props.podaci.map((pod) => {
        return <KarticaZahteva key={pod.id} ostalo={pod}/>
    });

    return (
        <div className="ui cards">
            {zahtevii}
        </div>
    );

}

export default ListaZahteva;