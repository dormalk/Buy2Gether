import React from 'react';
import { Text,TouchableOpacity,Image } from 'react-native';

const BottonWithIcon = ({ onPress,children,externButtonStyle,externTextStyle,source }) => {
    const { buttonStyle,textStyle } = styles;

    return(
        <TouchableOpacity 
            style={{...buttonStyle,...externButtonStyle}}
            onPress={ onPress }
        >
            <Image source={source} style={{width:25,height:25, marginRight: 10,marginLeft:10}}></Image>
            <Text style={{...textStyle,...externTextStyle}}>{children}</Text>
        </TouchableOpacity>    
    );
};


const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',

    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 2,
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
}

export { BottonWithIcon };