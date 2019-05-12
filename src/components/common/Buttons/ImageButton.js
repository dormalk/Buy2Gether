import React from 'react';
import { Image,TouchableOpacity  } from 'react-native';

const ImageButton = ({ onPress,source,dimmension,marginRight=0}) => {
    return(
        <TouchableOpacity  
            onPress={ onPress }
        >
            <Image
                style={{width: dimmension, height:dimmension,marginRight}}
                source={source}
            /> 
        </TouchableOpacity>    
    );
};


export { ImageButton };