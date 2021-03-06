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
    LOGOUT_USER,
    LOGIN_USER_WITH_GOOGLE,
    RESET_LISTS,
    REMOVE_USER
} from './types';
import firebase from '@firebase/app';
import {fatchUser,createUser} from './UserActions';
import '@firebase/auth';
import {Actions} from 'react-native-router-flux';
import { reject } from 'rsvp';
import { Google, StandaloneAndroidClientId } from 'expo';
import * as GoogleSignIn from 'expo-google-sign-in';
import { AppAuth } from 'expo-app-auth';


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
    return (dispatch) => {
        const {currentUser} = firebase.auth();
        if (currentUser != null){
            dispatch(fatchUser());
            loginSuccess(dispatch,currentUser);
        }
    }    
}


export const logoutUser = () => {
    return async(dispatch) => {
        dispatch({type:LOGOUT_USER});
        dispatch({type: RESET_LISTS});
        dispatch({type: REMOVE_USER})
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


export const loginWithGoogle = (googleUser) => {
    return (dispatch) => {
        dispatch({type: LOGIN_USER_WITH_GOOGLE})
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
        );

        firebase.auth().signInWithCredential(credential)
        .then((user) => {
            firebase.database().ref(`users/${user.uid}`)
            .once('value',snapshot => {
                if(snapshot.exists())
                    dispatch(fatchUser());
                else
                    dispatch(createUser(user,googleUser.email));
                loginSuccess(dispatch,user);
            });
        })
        .catch((message) => {
            alert('login Error:'+message)
        });        
    }
}



onSignIn = (googleUser,dispatch) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
    .auth().
    onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).than(()=>{
            dispatch(fatchUser());
            loginSuccess(dispatch,user);
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }


  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }