import React from 'react';
import { TextInput,View,Text } from 'react-native';

const Input = ({ label,value,onChangeText,placeholder,secureTextEntry,TextInputStyle,ViewContainerStyle }) => {
    const { inputStyle,containerStyle,labelStyle } = styles;
    return(
        <View style={[containerStyle,ViewContainerStyle]}>
            <TextInput
                secureTextEntry = {secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={[inputStyle,TextInputStyle]}
                value={value}
                onChangeText={onChangeText}
            />
            <Text style={labelStyle}>{label}</Text>
        </View>
    );
};

const styles = {
    inputStyle: {
        color:'#000',
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        height: 50,
        width: 100,
        textAlign: 'right'
    },
    labelStyle: {
        fontSize: 20,
        paddingRight: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center'
    }
}


export { Input };

