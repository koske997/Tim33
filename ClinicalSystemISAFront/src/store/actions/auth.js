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
                'Authorization': 'Bearer' + token
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
                'Authorization': 'Bearer' + token
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