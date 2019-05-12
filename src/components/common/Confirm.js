import React from 'react';
import {Text,View,Modal} from 'react-native';
import { CardSection } from './CardSection';
import { RegularButton } from './Buttons/RegularBotton';
import {WHITE,DARK_GREEN} from '../StyleConfig';


const Confirm = ({children,visible,onAccept,onDecline}) => {
    const {cardSectionStyle,textStyle,containerStyle} = styles;
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose = {() => {alert('Modal is closed')}}
        >
            <View style={containerStyle}>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>
                        {children}
                    </Text>
                </CardSection>
                <CardSection>
                    <RegularButton 
                        onPress={onDecline}
                        externButtonStyle={styles.darkButtonStyle}
                        externTextStyle={{color:WHITE}}>לא</RegularButton>
                    <RegularButton 
                        onPress={onAccept}
                        externButtonStyle={styles.whiteButtonStyle}
                        externTextStyle={{color:DARK_GREEN}}>כן</RegularButton>
                </CardSection>
            </View>
        </Modal>
    );
};

const styles = {
    cardSectionStyle:{
        justifyContent: 'center',
    },
    textStyle:{
        flex:1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle:{
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex:1,
        justifyContent: 'center'
    },
    whiteButtonStyle:{
        backgroundColor:WHITE,
        borderColor:DARK_GREEN
    },
    darkButtonStyle:{
        backgroundColor:DARK_GREEN,
        borderColor:DARK_GREEN
    }
}

export { Confirm };
