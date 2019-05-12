import{
    FATCH_USER,
    UPDATE_ULIST_USER,
    REMOVE_USER,
    CREATE_USER,
    UPDATE_SLIST_USER
} from './types';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import {Actions} from 'react-native-router-flux';


export const createUser = ({email}) => {
    const {currentUser} = firebase.auth();
    return(dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/email`)
        .set(email)
        .then(() => dispatch({type:CREATE_USER, payload:email}));
    }
}

export const removeUser = () => {
    const {currentUser} = firebase.auth();
    return(dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}`)
            .remove()
            .then(() => {
                dispatch({type: REMOVE_USER})
                Actions.auth();
            })
    }
}


export const updateUlistUser = (update) => {
    const {currentUser} = firebase.auth();
    return(dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/ulist`)
            .set(update)
            .then(() => dispatch({type: UPDATE_ULIST_USER, payload:update}))
    }
}


export const updateSlistUser = (update) => {
    const {currentUser} = firebase.auth();
    return(dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/slist`)
            .set(update)
            .then(() => dispatch({type: UPDATE_SLIST_USER, payload:update}))
    }
}

export const fatchUser = () => {
    const {currentUser} = firebase.auth();
    return(dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}`)
            .on('value',snapshot => { 
                dispatch({type:FATCH_USER, payload: snapshot.val()});
            })
    }
}

export const shereList = (email,uniqListKey) => {
    return() => {
        var id = '';
        firebase.database().ref(`users`)
        .once('value',snapshot =>{
            Object.entries(snapshot.val()).forEach( user => {
                console.log(user);
                if(user[1].email == email){
                    id = user[0];
                    firebase.database().ref(`users/${id}/slist`)
                    .once('value',snapshot => {
                        var array = [];
                        if(!!snapshot.val()){
                            array = snapshot.val();
                        }
                        array = [...array, uniqListKey];
                        firebase.database().ref(`users/${id}/slist`)
                        .set(array);
                    });
                }
            });
        });
    }
}