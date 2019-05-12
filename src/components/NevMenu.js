import React from 'react';
import  { View } from 'react-native';
import {WHITE} from './StyleConfig';
import {ImageButton} from './common';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/AuthActions';
import {Actions} from 'react-native-router-flux';

class NevMenu extends React.Component {


    onListsPages(){
        Actions.listpage();
    }

    onCreateNew(){
        Actions.createlist();
    }


    render(){
        const { viewStyle,imageStyle } = styles;

        return(
            
            <View style={viewStyle}>
                <ImageButton
                    {...imageStyle}
                    source={require('../images/checklist.png')}
                    onPress={this.onListsPages.bind(this)}
                />

                <ImageButton
                    {...imageStyle}
                    source={require('../images/add.png')}
                    onPress={this.onCreateNew.bind(this)}
                />
                <ImageButton
                    {...imageStyle}
                    source={require('../images/logout.png')}
                    onPress={this.props.logoutUser.bind(this)}
                />
            </View>
        )
    }
}

const styles = {
    viewStyle:{
        backgroundColor: WHITE,
        flexDirection: 'row-reverse',
        display:'flex',
        justifyContent: 'space-between',
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height:200 },
        shadowOpacity: 0.9,
        position: 'relative',
        paddingRight: 30,
        paddingLeft: 30
    },
    imageStyle:{
        paddingRight:30,
        paddingLeft:30,
        dimmension:40
    }
}


export default connect(null,{logoutUser})(NevMenu);