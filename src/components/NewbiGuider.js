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
            title: 'תפריט ניווט ראשי הכולל שני עמודים - תצוגה והוספה, הכפתור הימני ביותר הינו כפתור ניתוק',
            sorce: require('../images/NewbiGuider/phase1.png')
        },
        {
            title: 'עמוד התצוגה מכיל שני רשימות - הראשונה: רשימות שיצרתם',
            sorce: require('../images/NewbiGuider/phase2.png')
        },
        {
            title: 'הרשימה השניה תכיל רשימות שהוספת באמצעות קישור שיתוף',
            sorce: require('../images/NewbiGuider/phase3.png')
        },
        {
            title: 'לצד כל פריט ברשימה ישנו תפריט אפשרויות המכיל את האפשרויות: שיתוף, עריכה ומחיקה',
            sorce: require('../images/NewbiGuider/phase4.png')
        },
        {
            title: 'לחיצה על פריט ברשימה יוביל אתכם לעמוד התצוגה של אותה רשימה',
            sorce: require('../images/NewbiGuider/phase7.png')
        },
        {
            title: 'בעמוד יצירת רשימה תוכלו להוסיף פריטים ע"י לחיצה על כפתור "הוסף פריט", לשמור ולבטל שינויים ברשימה',
            sorce: require('../images/NewbiGuider/phase5.png')
        },
        {
            title: 'עבור כל פריט חדש שנוצר תוכלו לערוך את שם הפריט, כמות והערות נוספות',
            sorce: require('../images/NewbiGuider/phase6.png')
        },
        {
            title: 'לחיצה כפולה על פריט בעמוד העריכה, תפתח מחדש את האפשרות לערוך את הפריט, משיכה ימינה בשורת הפריט תפתח אפשרות מחיקה של הפריט',
            sorce: require('../images/NewbiGuider/phase8.png')
        },
        {
            title: 'בעמוד התצוגה של הרשימה תוכלו לעדכן את הפריטים שכבר הוספתם לעגלה - כל מי ששיתפתם איתו את הרשימה יוכל לראות אונליין את העדכון',
            sorce: require('../images/NewbiGuider/phase9.png')
        },
        {
            title: 'לחיצה על כפתור החץ משמאל לשם הפריט תפתח חלונית עם מידע נוסף אודות הפריט',
            sorce: require('../images/NewbiGuider/phase10.png')
        }
    ]

    renderView(){
        var index = this.state.sildToShow;
        return(
            <View style={styles.containerViewStyle}>            
                <Image
                    source={this.row[index].sorce}
                    style={{width:210, height: 275}}
                />
                <Text style={{fontSize: 20, marginTop: 10, writingDirection:'lrt'}}>{this.row[index].title}</Text>
            </View>

        )
    }
    goNextView(){
        if(this.state.sildToShow < this.row.length-1){
            this.setState({ sildToShow: this.state.sildToShow + 1 })
        }
        else{
            this.changeIsFirstToFalse();
        }
    }
    resetSlideView(){
        this.setState({sildToShow:0});
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

    renderButtons(){
        if(this.state.sildToShow < this.row.length-1){
            return(
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
            );
        }else{
            return(
                <CardSection>

                    <RegularButton
                        externButtonStyle={styles.darkButtonStyle}
                        externTextStyle={{color:WHITE}}
                        onPress={this.changeIsFirstToFalse.bind(this)}
                    >
                        בסדר הבנתי
                    </RegularButton>
                    <RegularButton
                        externButtonStyle={styles.whiteButtonStyle}
                        externTextStyle={{color:DARK_GREEN}}
                        onPress={this.resetSlideView.bind(this)}
                    >
                        חזור להתחלה
                    </RegularButton>
                </CardSection>
            );
        }
    }
    render(){
        return(
            <Card>
                {this.renderView()}
                <View style={styles.containerStyle}>
                    {this.renderCircles()}
                </View>      
                {this.renderButtons()}
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
