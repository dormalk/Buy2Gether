import React from 'react';
import { Text,TouchableOpacity } from 'react-native';

const RegularButton = ({ onPress,children,externButtonStyle,externTextStyle }) => {
    const { buttonStyle,textStyle } = styles;

    return(
        <TouchableOpacity 
            style={{...buttonStyle,...externButtonStyle}}
            onPress={ onPress }
        >
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
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 2,
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
    }
}

export { RegularButton };