import React from 'react';
import {View,Text} from 'react-native';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import { Header } from './components/common';
import firebase from '@firebase/app';
import '@firebase/auth';
import Reducers from './reducers';
import Router from './Router';


/*Continue from here*/
class Main extends React.Component{

    componentWillMount(){
        const config = {
            apiKey: "AIzaSyC7Vr-CjR87j6znYLpv_PEn6v3y8nvAOwU",
            authDomain: "shoppi-96a49.firebaseapp.com",
            databaseURL: "https://shoppi-96a49.firebaseio.com",
            projectId: "shoppi-96a49",
            storageBucket: "shoppi-96a49.appspot.com",
            messagingSenderId: "307713454797"
          };
          firebase.initializeApp(config);
    }
    render(){
        const store = createStore(Reducers,{},applyMiddleware(ReduxThunk));
        return(
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}

export default Main;