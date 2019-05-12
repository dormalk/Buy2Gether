import React from 'react';
import { View,Image,Dimensions } from 'react-native';
import {DARK_GREEN} from '../StyleConfig';

const Welcoming = () => {
    return(
        <View style={styles.welcomingStyle}>
            <Image
                resizeMode={'contain'}
                style={{flex:1,width: 300}}
                source={require('../../images/logo.png')}
            />
        </View>
    );
};

const styles = {
    welcomingStyle: {
        zIndex: 10, 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DARK_GREEN
    }
};

export { Welcoming };