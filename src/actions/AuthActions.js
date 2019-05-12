import{
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_USER,
    RAGISTER_FAIL,
    RAGISTER_SUCCESS,
    RAGISTER_USER,
    AUTH_PASSWORD_CHANGED,
    RAGISTER_FAIL_NOT_FIT_PASSWORDS,
    CLEAR_FORM,
    RECOVERY_FAIL,
    RECOVERY_SUCCESS,
    RECOVERY_PASSWORD,
    LOGOUT_USER
} from './types';
import firebase from '@firebase/app';
import {fatchUser} from './UserActions';
import '@firebase/auth';
import {Actions} from 'react-native-router-flux';
import { reject } from 'rsvp';

export const emailChanged = (text) => {
    return{
        type:EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text) => {
    return{
        type:PASSWORD_CHANGED,
        payload: text
    }
}

export const authPasswordChanged = (text) => {
    return{
        type:AUTH_PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({email,password}) =>{
    return(dispatch) => {
        dispatch({type:LOGIN_USER})
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((user) => {
            dispatch(fatchUser());
            loginSuccess(dispatch,user);
        })
        .catch(() => loginFail(dispatch));
    } 
}

// export const isLogin = () => {
//     console.log('isLogin');
//     setTimeout(function(){
//         return(dispatch) => {
//             const {currentUser} = firebase.auth();
//             if (currentUser != null){
//                 console.log('Yes');
//                 dispatch(fatchUser());
//                 loginSuccess(dispatch,currentUser);
//             }
//             else{
//                 console.log('no');
//             }
//         }    
//     },1000);
// }

export const isLogin = () => {
    console.log('isLogin');
    return (dispatch) => {
        const {currentUser} = firebase.auth();
        if (currentUser != null){
            dispatch(fatchUser());
            loginSuccess(dispatch,currentUser);
        }
    }    
}


export const logoutUser = () => {
    return(dispatch) => {
        dispatch({type:LOGOUT_USER})
        firebase.auth().signOut()
        .then(() => {
            Actions.auth();
        })
    } 
}

export const loginFail = (dispatch) =>{
    dispatch({type:LOGIN_FAIL})
}

export const loginSuccess = (dispatch,user) => {
    Actions.main({isLoading:true});
    dispatch({
        type: LOGIN_SUCCESS,
        payload: user
    });
}

export const ragisterUser = ({email,password,authPassword}) => {
    return(dispatch) => {
        dispatch({type:RAGISTER_USER});
        if(authPassword !== password){
            dispatch({type:RAGISTER_FAIL_NOT_FIT_PASSWORDS});
            return Promise.reject();
        }
        else{
            return firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((user) => ragisterSuccess(dispatch,user))
            .catch(() => ragisterFail(dispatch));    
        }
    }
}



export const ragisterFail = (dispatch) => {
    dispatch({type: RAGISTER_FAIL})
}

export const ragisterSuccess = (dispatch,user) => {
    Actions.main();
    dispatch({
        type: RAGISTER_SUCCESS,
        payload: user
    });   
}

export const clearForm = () => {
    return(dispatch) => {
        dispatch({
            type:CLEAR_FORM
        })    
    }
}

export const passwordRecovery = (email) => {
    return(dispatch) => {
        dispatch({type:RECOVERY_PASSWORD});
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => recoverySuccess(dispatch))
        .catch(() => recoveryFail(dispatch));
    }
}

export const recoveryFail = (dispatch) => {
    dispatch({type:RECOVERY_FAIL});
}

export const recoverySuccess = (dispatch) => {
    dispatch({type:RECOVERY_SUCCESS});
}

