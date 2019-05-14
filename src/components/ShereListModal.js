import React from 'react';
import {Text,Modal,View} from 'react-native';
import { RegularButton,CardSection,Input,Spinner } from './common';
import {connect} from 'react-redux';
import {WHITE,DARK_GREEN }from './StyleConfig';
import {shereList} from '../actions';

class ShereListModal extends React.Component{
    state = {
        visible: this.props.visible,
        email: ''
    }
    componentWillReceiveProps(nextProps){
        this.setState({visible:nextProps.visible});
    }
    onChangeEmail(email){
        this.setState({email});
    }
    onSendRequest(){
        if(this.state.email != this.props.email){
            this.props.shereList(this.state.email,this.props.value.key)
        }
        this.props.onChangeModal();
    }
    renderButton(){
        if(this.props.loading)
            return( <Spinner size="large"/>);
        else{
            return(
                <RegularButton
                    externButtonStyle={styles.darkButtonStyle}
                    externTextStyle={{color:WHITE}}
                    onPress={this.onSendRequest.bind(this)}>
                    שלח
                </RegularButton>
            )
        }
    }

    render(){
        const {containerStyle,titleStyle,cardSectionStyle} = styles;
        return(
            <Modal
                visible={this.state.visible}
                transparent
                animationType="slide"
                onRequestClose = {() => {this.setState({visible: !this.state.visible})}}

            >
            <View style = {containerStyle}>
                <CardSection style = {cardSectionStyle}>
                    <Text style = {titleStyle}>שיתוף רשימה</Text>
                </CardSection>
                <CardSection style = {cardSectionStyle}>
                    <Input
                        label="אימייל"
                        placeholder="user@gmail.com"
                        onChangeText={this.onChangeEmail.bind(this)}
                        value={this.state.email}
                    />
                </CardSection>
                <CardSection style = {cardSectionStyle}>
                    {this.renderButton()}
                </CardSection>
            </View>
            </Modal>
        );
    }
}


const styles ={
    titleStyle:{
        flex:1,
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 40

    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex:1,
        justifyContent: 'center'
    },
    cardSectionStyle:{
        justifyContent: 'center',
    },
    errorTextStyle: {
        fontSize: 18,
        alignSelf:'center',
        color: 'red',
        paddingTop: 5,
        paddingBottom: 5
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
const mapStateToProps=({auth}) => {
    const {email,loading} = auth;
    return {email,loading};
}

export default connect(mapStateToProps,{shereList})(ShereListModal);