import{
    ADD_NEW_LIST,
    FATCH_SLIST,
    FATCH_ULIST,
    RESET_LISTS
} from './types';
import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/storage';



export const createList = (newList) => {
    console.log(newList);
    return () => {
        return firebase.database().ref(`lists`)
        .push(newList);
    }
}

export const removeList = ({lid}) => {
    return() => {
        return firebase.database().ref(`lists/${lid}`)
        .remove();
    }
}

export const addListToUser = ({lid}) => {
    const {currentUser} = firebase.auth();
    return(dispatch) => {
        firebase.database().ref(`users/${currentUser}/ulist`)
        .set(lid)
        .then(() => dispatch({type: ADD_NEW_LIST, payload: uid}))
    }
}

export const fatchList = (list) => {
    return(dispatch) => {
        var userlist=[];

        list.forEach(lid => {
            firebase.database().ref(`lists/${lid}`)
            .on('value',snapshot =>{
                userlist.push({...snapshot.val(),key: snapshot.key});
            });   
        }); 
        setTimeout(() =>{
            dispatch({type: FATCH_ULIST, userlist});
        },1000);
        return Promise.resolve(userlist);
    }
}


export const fatchSheredList = (list) => {
    return(dispatch) => {
        var sheredlist=[];

        list.forEach(lid => {
            firebase.database().ref(`lists/${lid}`)
            .on('value',snapshot =>{
                sheredlist.push({...snapshot.val(),key: snapshot.key});
            });   
        }); 
        setTimeout(() =>{
            dispatch({type: FATCH_SLIST, sheredlist});
        },500);
        return Promise.resolve(sheredlist);
    }
}


export const resetLists = () => {
    return(dispatch) =>{
        dispatch({type: RESET_LISTS});
    }
}

export const updateList = ({lid,update}) => {
    return() => {
        firebase.database().ref(`lists/${lid}`)
        .update(update);
    }
}

export const updateItemAtList = ({lid,update,index}) => {
    return() => {
        firebase.database().ref(`lists/${lid}/items/${index}`)
        .update(update);
    }
}

