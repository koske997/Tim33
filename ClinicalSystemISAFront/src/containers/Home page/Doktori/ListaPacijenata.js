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
            <div key={pacijent.id} class="ui three column grid">
                <div className="column">
                    <div className="ui fluid card">
                        <div className="image">
                            <Image
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                        </div>
                        <div className="content">
                            <a className="header">{pacijent.lastName} {pacijent.lastName}</a>
                        </div>
                        <div class="meta">
                            <span class="date">{pacijent.role}</span>
                        </div>
                        <div class="extra content">
                            <a>
                            <i class="user icon"></i>
                            ID Patient : {parseInt(pacijent.id)}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    });


    return <div> {pacijenti} </div>
}

export default ListaPacijenata;