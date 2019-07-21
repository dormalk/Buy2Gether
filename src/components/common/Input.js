import React from 'react';
import { TextInput,View,Text } from 'react-native';

const Input = ({ label,value,onChangeText,placeholder,secureTextEntry,TextInputStyle,ViewContainerStyle,LabelInputStyle={flex:1},autoFocus = false }) => {
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
                autoFocus={autoFocus}
            />
            <Text style={[labelStyle,LabelInputStyle]}>{label}</Text>
        </View>
    );
};

const styles = {
    inputStyle: {
        flex: 2,
        color:'#000',
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 16,
        lineHeight: 23,
        height: 50,
        width: 100,
        textAlign: 'right'
    },
    labelStyle: {
        fontSize: 18,
        paddingRight: 20,
        flex: 1
    },
    containerStyle: {
        height: 38,
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center'
    }
}


export { Input };

