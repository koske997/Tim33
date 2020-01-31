import React from 'react';
import KarticaKorisnika from './KarticaKorisnika';

const ListaKorisnika = (props) => {

    const slike = props.lista.map((slika) => {
        return <KarticaKorisnika key={slika.id} slika={slika}/>
    });
    return <div className="ui link cards">{slike}</div>;
};

export default ListaKorisnika;