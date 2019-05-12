import React from 'react';
import {connect} from 'react-redux';
import {Card,
        CardSection,
        Input,
        RegularButton,
        Spinner,
        Confirm} from './common';
import {DARK_GREEN,WHITE} from './StyleConfig';
import { 
        emailChanged,
        passwordChanged,
        ragisterUser,
        authPasswordChanged, 
        clearForm } from '../actions/AuthActions';
import {createUser} from '../actions/UserActions';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
class RagisterForm extends React.Component{

    state = {
        showModal: false
    }
    onEmailChange(email) {
        this.props.emailChanged(email);
    }

    onPasswordChange(password){
        this.props.passwordChanged(password);
    }

    onAuthPasswordChange(authPassword){
        this.props.authPasswordChanged(authPassword);
    }

    onRagister(){
        const {email,password,authPassword} = this.props;
        this.props.ragisterUser({email,password,authPassword})
        .then(() => this.props.createUser({email}));
    }

    renderError(){
        if(this.props.error)
            return <Text style={styles.errorTextStyle}>{this.props.error}</Text>
    }

    renderButtons(){
        if(this.props.loading){
            return <CardSection><Spinner size="large"/></CardSection>;
        }
        else{
            return(
                <CardSection>
                    <RegularButton
                        externButtonStyle={styles.whiteButtonStyle}
                        externTextStyle={{color:DARK_GREEN}}
                        onPress={() => {this.setState({showModal:!this.state.showModal})}}>
                            חזור
                    </RegularButton>
                    <RegularButton
                        externButtonStyle={styles.darkButtonStyle}
                        externTextStyle={{color:WHITE}}
                        onPress={this.onRagister.bind(this)}>
                        הרשם
                    </RegularButton>
                </CardSection>
            );
        }
    }

    onAcceptReturn(){
        this.setState({showModal:!this.state.showModal});
        this.props.clearForm();
        Actions.login();
    }
    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label="אימייל"
                        placeholder="user@gmail.com"
                        value={this.props.email}
                        onChangeText = {this.onEmailChange.bind(this)}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="סיסמא"
                        placeholder="Password"
                        value={this.props.password}
                        onChangeText = {this.onPasswordChange.bind(this)}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="אימות סיסמא"
                        placeholder="Password"
                        value={this.props.authPassword}
                        onChangeText = {this.onAuthPasswordChange.bind(this)}
                    />
                </CardSection>
                {this.renderError()}
                {this.renderButtons()}

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAcceptReturn.bind(this)}
                    onDecline={() => {this.setState({showModal:!this.state.showModal})}}
                >
                    האם אתה בטוח שאתה רוצה לחזור?
                </Confirm>
            </Card>
        )
    }
}

const styles = {
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

const mapStateToProps = ({auth}) => {
    const {email,error,password,loading,authPassword} = auth;
    return {email,error,password,loading,authPassword};
}

export default connect(mapStateToProps,{ 
    emailChanged,
    passwordChanged,
    ragisterUser,
    authPasswordChanged,
    clearForm,
    createUser })(RagisterForm);