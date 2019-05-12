import React from 'react';
import { Image,TouchableWithoutFeedback  } from 'react-native';

const ImageButtonNoFeedback = ({ onPress,source,dimmension,marginRight=0,marginLeft=0}) => {
    return(
        <TouchableWithoutFeedback  
            onPress={ onPress }
        >
            <Image
                style={{width: dimmension, height:dimmension,marginRight,marginLeft}}
                source={source}
            /> 
        </TouchableWithoutFeedback>    
    );
};


export { ImageButtonNoFeedback };