import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
import { addObject } from '../actions';
import "../../containers/Home page/Klinike/Klinike"

const initialState = {
    token: null,
    userId: null,
    pacijenti: null,
    klinike: null,
    karton: null,
    pregled: null,
    sale: null,
    doktori: null,
    tipoviPregleda: null,
    prijavljenKorisnik: null,
    pacijentisort: null,
    odgovor: null,
    sviPregledii: null,
    obelezenaKlinika: null,
    zahtevSestre: null,
    sviZahtevi: null,
    odgovor2: null,
    doktorId: null,
    obelezenPacijent: null,
    sveBolesti: null,
    sviLekovi: null,
    pregledKarton: null,
    pretraga: null,
    potrebniDoktori: null,
    moze: null,
    klinikaProfila: null,
    odgovor3: null,
    rezervacije: null,
}

const reducer = (state = initialState, action) => {
    const newState = {...state};


switch (action.type) {
    case "AGE_UP":
        return {
            ...state,
            token: state.token + action.value,
            userId: state.userId
        }
        break;
    case "AGE_DOWN":
        return {
            ...state,
            token: state.token - action.value,
            userId: state.userId
        }
        break;
    case actionTypes.SACUVAJ_PACIJENTE:
        console.log(action.pacijenti);
        return {
            ...state,
            pacijenti: action.pacijenti
        }
    case actionTypes.SACUVAJ_KLINIKE:
        return {
            ...state,
            klinike: action.klinike
        }
    case actionTypes.SACUVAJ_KARTON:
        return {
            ...state,
            karton: action.karton
        }
    case actionTypes.SACUVAJ_PREGLED:
        return {
            ...state,
            pregled: action.pregled
        }
    case actionTypes.SACUVAJ_SALE:
        return {
            ...state,
            sale: action.sale
        }
    case actionTypes.SACUVAJ_DOKTORE:
        return {
            ...state,
            doktori: action.doktori
        }
    case actionTypes.SACUVAJ_TIPOVE_PREGLEDA:
        return {
            ...state,
            tipoviPregleda: action.tipoviPregleda
        }
    case actionTypes.SACUVAJ_PRIJAVLJENOG_KORISNIKA:
        return {
            ...state,
            prijavljenKorisnik: action.prijavljenKorisnik
        }

    case actionTypes.VRATI_SORTIRANE_PACIJENTE:
        return{
            ...state,
            pacijentisort: action.pacijentisort
        }
    case actionTypes.SACUVAJ_ODGOVOR:
        return{
            ...state,
            odgovor: action.odgovor
        }
    case actionTypes.SACUVAJ_PREGLEDE:
        return {
            ...state,
            sviPregledii: action.sviPregledii
        }
    case actionTypes.SACUVAJ_OBELEZENU_KLINIKU:
            return {
                ...state,
                obelezenaKlinika: action.obelezenaKlinika
            }
    case actionTypes.SACUVAJ_POSLATI_ZAHTEV:
        return {
            ...state,
            zahtevSestre: action.zahtevSestre
        }
    case actionTypes.SACUVAJ_SVE_ZAHTEVE:
        return{
            ...state,
            sviZahtevi: action.sviZahtevi
        }    
    case actionTypes.SACUVAJ_ODGOVOR_POTVRDE:
        return{
            ...state,
            odgovor2: action.odgovor2
        }  
    case actionTypes.SACUVAJ_DOKTORE_ID:
        return{
            ...state,
            doktorId: action.doktorId
        }      
    case actionTypes.SACUVAJ_OBELEZENOG_PACIJENTA:
            return {
                 ...state,
                obelezenPacijent: action.obelezenPacijent
            }     
    case actionTypes.SACUVAJ_BOLESTI:
            return {
                 ...state,
                sveBolesti: action.sveBolesti
            } 
    case actionTypes.SACUVAJ_LEKOVE:
        return {
             ...state,
            sviLekovi: action.sviLekovi
        } 
    case actionTypes.SACUVAJ_PREGLED_KARTON:
        return {
             ...state,
            pregledKarton: action.pregledKarton
        } 
    case actionTypes.SACUVAJ_PRETRAGU:
        return {
            ...state,
            pretraga: action.pretraga
        }    
    case actionTypes.SACUVAJ_POTREBNE_DOKTORE:
        return {
            ...state,
            potrebniDoktori: action.potrebniDoktori
        }    
    case actionTypes.SACUVAJ_MOGUCNOST_REZERVACIJE:
        return {
            ...state,
            moze: action.moze
        }
    case actionTypes.SACUVAJ_KLINIKU_PROFILA:
        return {
             ...state,
            klinikaProfila: action.klinikaProfila
        } 
    case actionTypes.SACUVAJ_ODGOVOR_DOKTORA:
        return {
            ...state,
            odgovor3: action.odgovor3
        }    
    case actionTypes.SACUVAJ_REZERVACIJE:
        return {
            ...state,
            rezervacije: action.rezervacije
        }   
    case actionTypes.OBRISI_PRIJAVLJENOG:
        return {
            ...state,
            prijavljenKorisnik: undefined
        } 
    case actionTypes.SIGN_UP:
        return userRegister(state, action);
    case actionTypes.LOG_IN:
        return userLogin(state, action);
    case actionTypes.ADDED_OBJECT:
        return addObject();
    default:
        return state;
}

}

const userRegister = (state, action) => {
    return updateObject(state, {
        token: action.userToken,
        userId: action.userId
    });
};

const userLogin = (state, action) => {
    return updateObject(state, {
        token: action.userToken,
        userId: action.userId
    });
}

/*const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGN_UP:
            return userRegister(state, action);
        case actionTypes.LOG_IN:
            return userLogin(state, action);
        case actionTypes.ADDED_OBJECT:
            return addObject();
        default:
            return state;
    }
};*/

export default reducer;