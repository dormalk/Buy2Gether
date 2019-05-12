import React from 'react';
import {Text} from 'react-native';
import {Card,CardSection,Input,RegularButton,Spinner,Link, Welcoming} from './common';
import { emailChanged,passwordChanged,loginUser,isLogin } from '../actions/AuthActions';
import { connect } from 'react-redux';
import {DARK_GREEN,WHITE} from './StyleConfig';
import {Actions} from 'react-native-router-flux';
import RecoveryPasswordModal from './RecoveryPasswordModal';


class LoginForm extends React.Component{
    state = {
        showModal: false,
        welcome: this.props.welcome || true
    }    

    checkLogin = setInterval(() => this.props.isLogin(),1000);
    
    onEmailChange(email){
        this.props.emailChanged(email);
    }

    onPasswordChange(password){
        this.props.passwordChanged(password);
    }

    onLogin(){
        const {email,password} = this.props;
        this.props.loginUser({email,password});
    }
    renderError(){
        if(this.props.error)
            return(<Text style={styles.errorTextStyle}>{this.props.error}</Text>);
    }
    renderConfirm(){
        if(this.props.confirm)
            return(<Text style={styles.confirmTextStyle}>{this.props.confirm}</Text>);
    }
    renderButton(){
        if(this.props.loading)
            return( <Spinner size="large"/>);
        else{
            return(
                <RegularButton 
                    onPress={this.onLogin.bind(this)}
                    externButtonStyle={styles.darkButtonStyle}
                    externTextStyle={{color:WHITE}}
                >
                    התחבר
                </RegularButton>
            )
        }
    }

    onRagister(){
        this.props.passwordChanged('');
        Actions.ragister();
    }
    onRecovertRquest(){
        this.setState({showModal:true});
    }

    renderWelcome(){
        return(
            <Welcoming/>
        );
    }
    renderForm(){
        return(
            <Card>
                <CardSection>
                <Input
                    label="אימייל"
                    placeholder="user@gmail.com"
                    value={this.props.email}
                    onChangeText={this.onEmailChange.bind(this)}
                />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="סיסמא"
                        placeholder="Password"
                        value={this.props.password}
                        onChangeText={this.onPasswordChange.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Link onPress={this.onRecovertRquest.bind(this)}>שכחת סיסמא?</Link>
                </CardSection>
                {this.renderError()}
                {this.renderConfirm()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                <CardSection>
                <RegularButton 
                    onPress={this.onRagister.bind(this)}
                    externButtonStyle={styles.whiteButtonStyle}
                    externTextStyle={{color:DARK_GREEN}}
                >   
                    הרשם
                </RegularButton>   
                </CardSection>

                <RecoveryPasswordModal
                    visible={this.state.showModal}
                    onChangeModal={() => this.setState({showModal:!this.state.showModal})}
                />    
            </Card>                
        );
    }
    render(){
        {setTimeout(() => {
            clearInterval(this.checkLogin);
            this.setState({welcome:false});
        },5000)}

        return this.state.welcome?this.renderWelcome():this.renderForm();
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
    confirmTextStyle:{
        fontSize: 18,
        alignSelf:'center',
        color: 'green',
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

const mapStateToProps = ({auth}) =>{
    const {email,password,error,loading,confirm} = auth;
    return {email,password,error,loading,confirm};
}
export default connect(mapStateToProps,{emailChanged,passwordChanged,loginUser,isLogin})(LoginForm);