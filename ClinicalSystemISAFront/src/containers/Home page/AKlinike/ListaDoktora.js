import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'


const ListaDoktora = props => {

    console.log(props)

    if (props.doktori == null)
    {
        return ListaDoktora;
    }
    
    const doktori = props.doktori.map((doktor) => {
        return (
               <option>{doktor.firstName + ' ' + doktor.lastName + ' ' + doktor.email}</option>   
        );
    });


    return doktori
}

export default ListaDoktora;