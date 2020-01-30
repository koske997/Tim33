import React from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';




const ListaKlinika = props => {

    console.log(props)

    if (props.klinike == null)
    {
        return ListaKlinika;
    }

    function handleClick(id){
        console.log(id);

        const klinike = props.klinike.map((klinika) => {
            if(klinika.id == id)
            {
             console.log(klinika.name);
            }

        });
        console.log(klinike);
     }
   
    
    const klinike = props.klinike.map((klinika) => {
        return (
            
            <div key={klinika.id} id={klinika.id} onClick={() => handleClick(klinika.id)} class="ui link cards" >
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