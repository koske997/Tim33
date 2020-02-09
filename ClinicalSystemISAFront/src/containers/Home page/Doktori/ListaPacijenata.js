import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'


const ListaPacijenata = props => {

    console.log(props.pacijenti)

    if (props.pacijenti == null)
    {
        return ListaPacijenata;
    }
    
    const pacijenti = props.pacijenti.map((pacijent) => {
        return (
            <div className="ui link cards" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="card" key={pacijent.id}>
                <div className="image">
                    <img alt="da" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
                </div>
            <div className="content">
                <div className="header">{pacijent.firstName} {pacijent.lastName}</div>
                <div className="meta">
                    <a>{pacijent.role}</a>
                </div>
                <div className="description">
                    {pacijent.address} {pacijent.city} {pacijent.country} 
                </div>
            </div>
            <div className="extra content">
                <span className="right floated">
                {pacijent.phoneNumber}
                </span>
                <span>
                    <i className="user icon"></i>
                    {pacijent.username}
                </span>
            </div>
            </div>
        </div>
        );
    });


    return <div> {pacijenti} </div>
}

export default ListaPacijenata;