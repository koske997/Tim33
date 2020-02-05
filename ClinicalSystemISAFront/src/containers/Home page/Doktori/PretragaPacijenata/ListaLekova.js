import React from 'react';


const ListaLekova = props => {

    console.log(props)

    if (props.lekovi == null)
    {
        return ListaLekova;
    }
    
    const lekovi = props.lekovi.map((lek) => {
        return (
               <option>{lek.name}</option>   
        );
    });


    return lekovi
}

export default ListaLekova;