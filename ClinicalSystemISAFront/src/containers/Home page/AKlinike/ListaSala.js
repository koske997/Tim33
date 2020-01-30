import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'


const ListaSala = props => {

    console.log(props.sale)

    if (props.sale == null)
    {
        return ListaSala;
    }
    
    const sale = props.sale.map((sala) => {
        return (
               <option>{sala.number}</option>   
        );
    });


    return sale
}

export default ListaSala;