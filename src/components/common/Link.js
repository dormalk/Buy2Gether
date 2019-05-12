import React from 'react';
import {TouchableOpacity,Text} from 'react-native';
import {OCEAN_BLUE} from '../StyleConfig';

const Link = ({children,onPress}) => {
    const {containerStyle,textStyle} = styles;
    return(
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    )
}


const styles = {
    textStyle:{
        alignSelf: 'center',
        color: OCEAN_BLUE,
        fontSize: 18
    },
    containerStyle:{
        flex:1,
        alignSelf: 'stretch',
    }
}
export {Link};