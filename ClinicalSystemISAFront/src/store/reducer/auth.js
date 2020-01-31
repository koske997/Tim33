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