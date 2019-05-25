import React from 'react';
import { CardSection, RegularButton,Card } from './common';
import {Image,Text,View} from 'react-native';
import {WHITE, DARK_GREEN} from './StyleConfig';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import firebase from '@firebase/app';

class NewbiGuider extends React.Component{
    
    state = {
        sildToShow: 0
    }

    row=[
        {
            title: 'צעד מספר 1',
            sorce: require('../images/add.png')
        },
        {
            title: 'צעד מספר 2',
            sorce: require('../images/arrow2.png')
        },
        {
            title: 'צעד מספר 2',
            sorce: require('../images/arrow2.png')
        },
    ]

    renderView(){
        var index = this.state.sildToShow;
        return(
            <View style={styles.containerViewStyle}>            
                <Image
                source={this.row[index].sorce}
                width={50}
                height={50}
                />
                <Text style={{fontSize: 20, marginTop: 10}}>{this.row[index].title}</Text>
            </View>

        )
    }
    goNextView(){
        if(this.state.sildToShow < this.row.length-1){
            this.setState({sildToShow: this.state.sildToShow +1 })
        }
        else{
            this.changeIsFirstToFalse();
        }
    }

    changeIsFirstToFalse(){
        const {currentUser} = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/isFirst`)
        .set(false);
        this.props.onFinish()
    }

    renderCircles(){
        return this.row.map((el,key) => {
            if(key==this.state.sildToShow){
                return <View style={styles.circleFull}></View>
            }
            return <View style={styles.circleNotFull}></View>
        })

    }

    render(){
        return(
            <Card>
                {this.renderView()}
                <View style={styles.containerStyle}>
                    {this.renderCircles()}
                </View>            
                <CardSection>
                    <RegularButton
                        externButtonStyle={styles.darkButtonStyle}
                        externTextStyle={{color:WHITE}}
                        onPress={this.goNextView.bind(this)}
                    >
                        המשך
                    </RegularButton>
                    <RegularButton
                        externButtonStyle={styles.whiteButtonStyle}
                        externTextStyle={{color:DARK_GREEN}}
                        onPress={this.changeIsFirstToFalse.bind(this)}
                    >
                        בסדר הבנתי
                    </RegularButton>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    whiteButtonStyle:{
        backgroundColor:WHITE,
        borderColor:DARK_GREEN
    },
    darkButtonStyle:{
        backgroundColor:DARK_GREEN,
        borderColor:DARK_GREEN
    },
    circleFull:{
        width: 16,
        height:16,
        borderRadius: 8,
        margin: 2,
        backgroundColor: DARK_GREEN
    },
    circleNotFull:{
        width: 16,
        height:16,
        borderRadius: 8,
        margin: 2,
        backgroundColor: WHITE,
        borderColor: DARK_GREEN,
        borderWidth: 1
    },
    containerStyle: {
        backgroundColor: '#fff',
        padding: 5,
        justifyContect: 'flex-start',
        flexDirection: 'row-reverse',
        position: 'relative',
        alignItems: 'center'
    },
    containerViewStyle: {
        backgroundColor: '#fff',
        padding: 20,
        justifyContect: 'center',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
    }
}




export default NewbiGuider;
