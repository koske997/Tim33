import React from 'react';


const ListaBolesti = props => {

    console.log(props)

    if (props.bolesti == null)
    {
        return ListaBolesti;
    }
    
    const bolesti = props.bolesti.map((bolest) => {
        return (
               <option>{bolest.sickNumber}</option>   
        );
    });


    return bolesti
}

export default ListaBolesti;