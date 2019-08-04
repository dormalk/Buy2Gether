import{
    FATCH_USER,
    UPDATE_ULIST_USER,
    REMOVE_USER,
    CREATE_USER,
    UPDATE_SLIST_USER,
    RAGISTER_FAIL
} from './types';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import {Actions} from 'react-native-router-flux';
import {isLogin} from './AuthActions';


export const createUser = (user,email='') => {
    return(dispatch) => {
        if(user){
            firebase.database().ref(`users/${user.uid}/`)
            .set({email:email,isFirst:true})
            .then(() => dispatch({type:CREATE_USER, payload:email}));    
        }
        else{
            dispatch({type: RAGISTER_FAIL})
        }
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

export const agreeShereList = (uniqListKey) => {
    const {currentUser} = firebase.auth();
    if(currentUser){
        return firebase.database().ref(`users/${currentUser.uid}/slist`)
        .once('value',snapshot => {
            var array = [];
            if(!!snapshot.val()){
                array = snapshot.val();
            }
            if(!array.includes(uniqListKey)){
                array = [...array, uniqListKey];
                firebase.database().ref(`users/${currentUser.uid}/slist`)
                .set(array);
            }
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