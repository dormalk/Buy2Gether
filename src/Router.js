import React from 'react';
import {Scene,Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RagisterForm from './components/RagisterForm';
import CreateList from './components/CreateList';
import ListsPage from './components/ListsPage';
import ListView from './components/ListView';
import EditList from './components/EditList';
import {View,Text} from 'react-native';
import { RegularButton } from './components/common';

const RouterComponent = () => {
    return(
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth" navigationBarStyle={{ backgroundColor: '#5aba1f', height: 0}} renderBackButton={() => (null)}  renderLeftButton={()=>(null)}>
                    <Scene key="login" duration={0} component={LoginForm} initial/>
                    <Scene key="ragister" duration={0} component={RagisterForm}/>
                </Scene>
                <Scene key="main" navigationBarStyle={{ backgroundColor: '#5aba1f', height: 0}} renderBackButton={() => (null)} renderLeftButton={()=>(null)}>
                    <Scene key="listpage" duration={0} component={ListsPage}/>
                    <Scene key="listview" duration={0} component={ListView}/>
                    <Scene key="createlist" duration={0} component={CreateList}/>
                    <Scene key="editlist" duration={0} component={EditList}/>
                </Scene>
            </Scene>
        </Router>
    )
}

export default RouterComponent;