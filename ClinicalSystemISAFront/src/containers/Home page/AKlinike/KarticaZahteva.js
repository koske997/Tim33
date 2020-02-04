import React from 'react';


const KarticaZahteva = (props) => {

    return (
        
                    <div className="card">
                        <div className="content">
                        <img className="right floated mini ui image" src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"/>
                        <div className="header">
                            Zahtev za {props.ostalo.tip}
                        </div>
                        <div className="meta">
                            Od nekoga
                        </div>
                        <div className="description">
                           Za datum {props.ostalo.datum}
                        </div>
                        </div>
                        <div className="extra content">
                        <div className="ui two buttons">
                            <div className="ui basic green button">Prihvati</div>
                            <div className="ui basic red button">Odbij</div>
                        </div>
                        </div>
                    </div>
        
    );

}

export default KarticaZahteva;