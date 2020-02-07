import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-objects';
import jwt_decode from 'jwt-decode';

export const registerSuccess = (token, userId) => {
    return {
        type: actionTypes.SIGN_UP,
        userToken: token,
        userId: userId
    }
}

export const loginSuccess = (token, userId) => {
    return {
        type: actionTypes.LOG_IN,
        userToken: token,
        userId: userId
    }
}

export const register = (email, password, repeatPassword, firstName, lastName, address, city, country, phoneNumber, id, role) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            repeatPassword: repeatPassword,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            country: country,
            phoneNumber: phoneNumber, 
            userId: id,
            role: role.toUpperCase(),
            returnSecureToken: true
        };
        //const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC93NeXpBVN_En7EAvqghEZU63moggPykU';
        const url = '/register';        
        
        if (password === repeatPassword) {
            axios.post(url, authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                sessionStorage.setItem('token', response.data.idToken);
                sessionStorage.setItem('expirationDate', expirationDate);
                sessionStorage.setItem('userId', response.data.localId);
                dispatch(registerSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
};

export const login = (email, password) => {
    return dispatch => {
        const user = {
            email: email,
            password: password
        };
        //const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC93NeXpBVN_En7EAvqghEZU63moggPykU';
        const url = '/login';

        axios.post(url, user)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                sessionStorage.setItem('token', response.data.accessToken);
                const jwtToken = jwt_decode(response.data.accessToken);
                sessionStorage.setItem('firstTimeLogged', response.data.firstTimeLogged);
                sessionStorage.setItem('role', jwtToken.role);
                sessionStorage.setItem('expirationDate', expirationDate);
                dispatch(loginSuccess(response.data.accessToken, jwtToken.role));
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const sviPacijenti = (pacijenti) => {
    console.log(pacijenti)
    return {
        type: actionTypes.SACUVAJ_PACIJENTE,
        pacijenti: pacijenti
    }
}

export const pacijenti = () => {

    return dispatch => {
    
        const url = "/pacijenti";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response.data);
                dispatch(sviPacijenti(response.data));

            }).catch(error => {
                console.log(error);
            })
    

    };

};


export const sveKlinike = (klinike) => {
    console.log(klinike)
    return {
        type: actionTypes.SACUVAJ_KLINIKE,
        klinike: klinike
    }
}

export const klinike = () => {

    return dispatch => {
    
        const url = "/klinike";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(sveKlinike(response.data));

            }).catch(error => {
                console.log(error);
            })
    };
};


export const medicinskiKarton = (karton) => {
    console.log(karton)
    return {
        type: actionTypes.SACUVAJ_KARTON,
        karton: karton
    }
}


export const karton = () => {

    return dispatch => {
    
        const url = "/medicinskiKartonUlogovanogKorisnika";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response.data);
                dispatch(medicinskiKarton(response.data));

            }).catch(error => {
                console.log(error);
            })
    

    };
};


export const sacuvajPregled = (pregled) => {
    console.log(karton)
    return {
        type: actionTypes.SACUVAJ_PREGLED,
        pregled: pregled
    }
}

export const unosPregleda = (podaci) => {
    console.log(podaci);
    return dispatch => {
        const authData = {
            naziv: podaci.naziv,
            opis: podaci.opis,
            tip: podaci.tip,
            sala: podaci.sala,
            lekar: podaci.lekar,
            cena: podaci.cena,
            datumVreme: podaci.datumVreme,
            trajanje: podaci.trajanje,

            returnSecureToken: true
        };

        const url = '/unosPregleda';        
        
        axios.post(url, authData)
        .then(response => {
            console.log(response);

            dispatch(sacuvajPregled(response.data));
        })
        .catch(err => {
             console.log(err);
        });
    };
};

export const sacuvajOdgovor = (odg) => {
    console.log(odg);
    return {
        type: actionTypes.SACUVAJ_ODGOVOR,
        odgovor: odg
    }
}

export const slanjeMaila = (mailFrom, mailTo, dodatak) => {
    return dispatch => {
        const authData = {
            mailFrom: mailFrom,
            mailTo: mailTo,
            dodatak: dodatak
        };
        const url = '/mailSestre';

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(sacuvajOdgovor(response.status));
        }).catch(err => {
                console.log(err);
        });

    };
};


export const sacuvajOdgovorPotvrde = (odg) => {
    console.log(odg);
    return {
        type: actionTypes.SACUVAJ_ODGOVOR_POTVRDE,
        odgovor2: odg
    }
}

export const slanjePotvrdnogMaila = (mailFrom, mailTo, dodatak) => {
    return dispatch => {
        const authData = {
            mailFrom: mailFrom,
            mailTo: mailTo,
            dodatak: dodatak
        };
        const url = '/mailPotvrda';

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(sacuvajOdgovorPotvrde(response.status));
        }).catch(err => {
                console.log(err);
        });

    };
};



export const sacuvajZahtev = (odg) => {
    console.log(odg);
    return{
        type: actionTypes.SACUVAJ_POSLATI_ZAHTEV,
        zahtevSestre: odg
    }
}

export const slanjeZahteva = (tip, datum, doktorId, adminId, posiljalacId) => {
    return dispatch => {
        const authData = {
            tip: tip,
            datum: datum,
            doktorId: doktorId,
            adminId: adminId,
            posiljalacId: posiljalacId
        };
        const url = '/zahtevSestre';

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(sacuvajZahtev(response.data));
        }).catch(err => {
            console.log(err);
        });

    };
};



export const sveSale = (sale) => {
    return {
        type: actionTypes.SACUVAJ_SALE,
        sale: sale
    }
}

export const sale = () => {

    return dispatch => {
        const url = "/sveSale";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(sveSale(response.data));

            }).catch(error => {
                console.log(error);
            })
    };
};

export const sviDoktori = (doktori) => {
    return {
        type: actionTypes.SACUVAJ_DOKTORE,
        doktori: doktori
    }
}

export const doktori= () => {

    return dispatch => {
    
        const url = "/sviDoktori";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(sviDoktori(response.data));

            }).catch(error => {
                console.log(error);
            })
    };
};


export const sviTipoviPregleda = (tipoviPregleda) => {
    return {
        type: actionTypes.SACUVAJ_TIPOVE_PREGLEDA,
        tipoviPregleda: tipoviPregleda
    }
}

export const tipoviPregleda = () => {

    return dispatch => {
    
        const url = "/sviTipoviPregleda";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(sviTipoviPregleda(response.data));

            }).catch(error => {
                console.log(error);
            })
    };
};



/*export const sacuvajSalu= (sala) => {
    return {
        type: actionTypes.SACUVAJ_SALU,
        sala: sala
    }
}*/

export const unosSale = (broj, slobodna) => {
    return dispatch => {
        const authData = {
            broj: broj,
            slobodna: slobodna,
           
            returnSecureToken: true
        };

        const url = '/unosSale';        
        
        axios.post(url, authData)
        .then(response => {
            console.log(response);

            //dispatch(sacuvajSalu(response.data));
        })
        .catch(err => {
             console.log(err);
        });
    };
};


export const izmeniSalu = (izmena) => {
    return dispatch => {
        console.log(izmena);
        const authData = {
            id: izmena.id,
            broj: izmena.broj,
            slobodna: izmena.slobodna,

            returnSecureToken: true,
        };
        
        const url = '/modifikujSalu';
        axios.post(url, authData)
        .then(response => {
            console.log(response);

            //dispatch(sacuvajSalu(response.data));
        })
        .catch(err => {
             console.log(err);
        });
        
    };
};

export const sviPregledi = (sviPregledii) => {
    return {
        type: actionTypes.SACUVAJ_PREGLEDE,
        sviPregledii: sviPregledii,
    }
}




export const pregledi = () => {

    return dispatch => {
        const url = "/sviPregledi";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(sviPregledi(response.data));

            }).catch(error => {
                console.log(error);
            })
    };
};

export const izmeniTipPregleda = (izmena) => {
    return dispatch => {
        console.log(izmena);
        const authData = {
            id: izmena.id,
            naziv: izmena.ime,

            returnSecureToken: true,
        };
        
        const url = '/modifikujTipPregleda';
        axios.post(url, authData)
        .then(response => {
            console.log(response);

            //dispatch(sacuvajSalu(response.data));
        })
        .catch(err => {
             console.log(err);
        });
        
    };
};

export const unosTipaPregleda = (naziv) => {
    return dispatch => {
        const authData = {
            naziv: naziv,
        };

        const url = '/unosTipaPregleda';        
        
        axios.post(url, authData)
        .then(response => {
            console.log(response);

        })
        .catch(err => {
             console.log(err);
        });
    };
};

export const izbrisiSalu = (izmena) => {
    return dispatch => {
        console.log(izmena);
        const authData = {
            id: izmena.id,
            broj: izmena.broj,
            slobodna: izmena.slobodna,

            returnSecureToken: true,
        };
        
        const url = '/izbrisiSalu';
        axios.post(url, authData)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
             console.log(err);
        });
        
    };
};

export const sacuvajPrijavljenogKorisnika= (prijavljenKorisnik) => {
    return {
        type: actionTypes.SACUVAJ_PRIJAVLJENOG_KORISNIKA,
        prijavljenKorisnik: prijavljenKorisnik,
    }
}

export const prijavljenKorisnik = () => {

    return dispatch => {
        const url = "/prijavljenKorisnik";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(sacuvajPrijavljenogKorisnika(response.data));

            }).catch(error => {

                console.log(error);
            })
    };
};


export const sacuvajSortiranePacijente = (pacijentisort) => {
    return {
        type: actionTypes.VRATI_SORTIRANE_PACIJENTE,
        pacijentisort: pacijentisort,
    }
}

export const sortiraniPacijenti = () => {
    return dispatch => {
        const url = "/sortpacijenti";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            console.log(response);
            dispatch(sacuvajSortiranePacijente(response.data));
        }).catch(error => {
            console.log(error);
        })

    };
};

export const sacuvajVraceneZahteve = (zahtevi) => {
    return{
        type: actionTypes.SACUVAJ_SVE_ZAHTEVE,
        sviZahtevi: zahtevi,
    }
}

export const vratiZahteve = () => {
    return dispatch => {
        const url = '/sviZahtevi';
        const token = sessionStorage.getItem('token');

        axios.get(url,{
            headers:{
                'Authorization': 'Bearer ' + token
            }  
        }).then(response => {
            console.log(response);
            dispatch(sacuvajVraceneZahteve(response.data));
        }).catch(err => {
            console.log(err);
        });

    };
};


export const izmeniPrijavljenogKorisnika = (izmena) => {
    return dispatch => {
        console.log(izmena);
        const authData = {
            id: izmena.id,
            firstName: izmena.firstName,
            lastName: izmena.lastName,
            email: izmena.email,
            password: izmena.password,
            address: izmena.address,
            city: izmena.city,
            country: izmena.country,
            phoneNumber: izmena.phoneNumber,

            returnSecureToken: true,
        };
        
        const url = '/izmeniPrijavljenogKorisnika';
        axios.post(url, authData)
        .then(response => {
            console.log(response);

            //dispatch(sacuvajSalu(response.data));
        })
        .catch(err => {
             console.log(err);
        }); 
    };
};


export const brisiZahtev = (tip, datum, doktorId, adminId, posiljalacId) => {
    return dispatch => {
        const authData = {
            tip: tip,
            datum: datum,
            doktorId: doktorId,
            adminId: adminId,
            posiljalacId: posiljalacId
        };
        const url = '/brisiZahtev';
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            
        }).catch(err => {
            console.log(err);
        });
    };
};


export const zahtevZaPregled = (tip, datum, doktorId, adminId, posiljalacId) => {
    return dispatch => {
        const authData = {
            tip: tip,
            datum: datum,
            doktorId: doktorId,
            adminId: adminId,
            posiljalacId: posiljalacId
        };
        const url = '/zahtevPregled';
        axios.post(url, authData)
        .then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    };
};


export const sacuvajObelezenuKliniku= (obelezenaKlinika) => {
    return {
        type: actionTypes.SACUVAJ_OBELEZENU_KLINIKU,
        obelezenaKlinika: obelezenaKlinika,
    }
}

export const cuvajIdDoktora = (id) => {
    return {
        type: actionTypes.SACUVAJ_DOKTORE_ID,
        doktorId: id
    }
}

export const sacuvajObelezenogPacijenta= (obelezenPacijent) => {
    console.log(obelezenPacijent);
    return {
        type: actionTypes.SACUVAJ_OBELEZENOG_PACIJENTA,
        obelezenPacijent: obelezenPacijent,
    }
}

export const sveBolesti = (sveBolesti) => {
    return {
        type: actionTypes.SACUVAJ_BOLESTI,
        sveBolesti: sveBolesti,
    }
}

export const bolesti = () => {

    return dispatch => {
        const url = "/sveBolesti";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(sveBolesti(response.data));

            }).catch(error => {
                console.log(error);
            })
    };
};

export const sviLekovi = (sviLekovi) => {
    return {
        type: actionTypes.SACUVAJ_LEKOVE,
        sviLekovi: sviLekovi,
    }
}

export const lekovi = () => {

    return dispatch => {
        const url = "/sviLekovi";
        const token = sessionStorage.getItem('token');

        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response);
                dispatch(sviLekovi(response.data));

            }).catch(error => {
                console.log(error);
            })
    };
};


export const unosPregledaDoktora = (pregled) => {
    console.log(pregled);
    return dispatch => {
        const authData = {
            bolest: pregled.bolest,
            lek: pregled.lek,
            cena: pregled.cena,
            idLekara: pregled.idLekara,
            idPacijenta: pregled.idPacijenta,
            opis: pregled.opis,
            tip: pregled.tip,
            naziv: pregled.naziv,
            datumVreme: pregled.datumVreme,

            returnSecureToken: true
        };

        const url = '/unosPregledaDoktora';        
        
        axios.post(url, authData)
        .then(response => {
            console.log(response);

            //dispatch(sacuvajPregled(response.data));
        })
        .catch(err => {
             console.log(err);
        });
    };
};

export const sacuvajPregledKarton = (pregledKarton) => {
    return {
        type: actionTypes.SACUVAJ_PREGLED_KARTON,
        pregledKarton: pregledKarton,
    }
}

export const unosOceneKlinike = (podaci) => {
    return dispatch => {
        console.log(podaci);
        const authData = {
            id: podaci.id,
            idPregleda: podaci.idPregleda,
            ocena: podaci.ocena,

            returnSecureToken: true
        };

        const url = '/unosOceneKlinike';        
        
        axios.post(url, authData)
        .then(response => {
            console.log(response);

            dispatch(sacuvajPregledKarton(response.data));
        })
        .catch(err => {
             console.log(err);
        });
    };
};

export const unosOceneLekara = (podaci) => {
    return dispatch => {
        console.log(podaci);
        const authData = {
            id: podaci.id,
            idPregleda: podaci.idPregleda,
            ocena: podaci.ocena,

            returnSecureToken: true
        };

        const url = '/unosOceneLekara';        
        
        axios.post(url, authData)
        .then(response => {
            console.log(response);

            dispatch(sacuvajPregledKarton(response.data));
        })
        .catch(err => {
             console.log(err);
        });
    };
};

export const promeniLozinku = (podaci) => {
    console.log(podaci);
    console.log(podaci.id);
    console.log(podaci.lozinka);

    return dispatch => {
        console.log('Udjjes li ovamo!>!>!>!?!??!?!')
        const authData = {
            id: podaci.id,
            lozinka: podaci.lozinka,

            returnSecureToken: true,
            };
        
        const url = '/promenaLozinke';
        axios.post(url, authData)
        .then(response => {
            console.log(response);

            //dispatch(sacuvajSalu(response.data));
        })
        .catch(err => {
             console.log(err);
        }); 
    };
};

export const sacuvajKlinikuProfila = (klinikaProfila) => {
    return{
        type: actionTypes.SACUVAJ_KLINIKU_PROFILA,
        klinikaProfila: klinikaProfila,
    }
}