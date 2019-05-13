import React from 'react';
import {Scene,Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RagisterForm from './components/RagisterForm';
import CreateList from './components/CreateList';
import ListsPage from './components/ListsPage';
import ListView from './components/ListView';
import EditList from './components/EditList';
import {View,Text} from 'react-native';

const RouterComponent = () => {
    return(
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth" navigationBarStyle={{ backgroundColor: 'green', height: 0 }}>
                    <Scene key="login" component={LoginForm} initial/>
                    <Scene key="ragister" component={RagisterForm}/>
                </Scene>
                <Scene key="main"  navigationBarStyle={{ backgroundColor: 'green', height: 0 }}>
                    <Scene key="listpage" component={ListsPage}/>
                    <Scene key="listview" component={ListView}/>
                    <Scene key="createlist" component={CreateList}/>
                    <Scene key="editlist" component={EditList}/>
                </Scene>
            </Scene>
        </Router>
    )
}

export default RouterComponent;