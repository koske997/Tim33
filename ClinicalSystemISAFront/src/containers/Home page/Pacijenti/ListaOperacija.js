import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'


const ListaOperacija = props => {

    if (props.pacijenti == null)
    {
        return ListaOperacija;
    }
    
    const operacije = props.operacije.map((operacija) => {
        return (
            <div key={operacija.id} class="ui three column grid">
                <div className="column">
                    <div className="ui fluid card">
                        <div className="image">
                            <Image
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                        </div>
                        <div className="content">
                            <a className="header">{operacija.lastName}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    });


    return <div> {operacije} </div>
}

export default ListaOperacija;