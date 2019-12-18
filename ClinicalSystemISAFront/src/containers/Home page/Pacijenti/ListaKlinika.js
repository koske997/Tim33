import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'

const ListaKlinika = props => {

    console.log(props)

    if (props.klinike == null)
    {
        return ListaKlinika;
    }
    
    const klinike = props.klinike.map((klinika) => {
        return (
            <div class="ui link cards">
                <div class="card">
                    <div class="image">
                        <img src={klinika.picture} alt="Nece slika"/>
                    </div>
                    <div class="content">
                        <div class="header">{klinika.name}</div>
                            <div class="meta">
                                <a>{klinika.city}</a>
                            </div>
                            <div class="description">
                                Opis
                            </div>
                        </div>
                        <div class="extra content">
                            <span class="right floated">
                                {klinika.clinicCenter.name}
                            </span>
                            <span>
                                <i class="user like"></i>
                                    Br.svidjanja: 10
                            </span>
                        </div>
                    </div>
                </div>
        );
    });


    return <div> {klinike} </div>
}

export default ListaKlinika;