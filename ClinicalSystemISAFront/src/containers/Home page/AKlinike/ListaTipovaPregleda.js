import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'


const ListaTipovaPregleda = props => {

    console.log(props)

    if (props.tipoviPregleda == null)
    {
        return ListaTipovaPregleda;
    }
    
    const tipoviPregleda = props.tipoviPregleda.map((tipPregleda) => {
        return (
               <option>{tipPregleda.name}</option>   
        );
    });


    return tipoviPregleda
}

export default ListaTipovaPregleda;