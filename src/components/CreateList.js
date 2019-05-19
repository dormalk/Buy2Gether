import React from 'react';
import {View,Text,TouchableOpacity,ScrollView,KeyboardAvoidingView} from 'react-native';
import {Card,CardSection,RegularButton,Input,Confirm} from './common';
import { DARK_GREEN,DARK,WHITE,DARK_GREY } from './StyleConfig';
import ItemListRouting from './ItemListRouting';
import {connect} from 'react-redux';
import {createList,updateUlistUser} from '../actions';
import NevMenu from './NevMenu';
import {Actions} from 'react-native-router-flux';

class CreateList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title: '',
            items: [],
            showModal: false
        }
        this.autoPlus = false;
    }

    renderList(){
        const {items} = this.state;
        var val = 0;
        const itemsList =  items.map((item) => 
            <ItemListRouting 
                {...item} 
                key={val} 
                isAutoPlus={this.autoPlus}
                ukey={val++} 
                onItemUpdate={this.onItemUpdate.bind(this)}
                onPlusPressed={this.onPlusPressed.bind(this)}
                onItemDelete={this.onItemDelete.bind(this)}/>
                );
        return(
            <CardSection style={styles.listSectionStyle}>
                {itemsList}
            </CardSection>
        )
    }
    onPlusPressed(){
        var vitems = this.state.items.map((value) => {
            var it = {...value, isOpen:false};
            return it;
        });
        vitems = vitems.filter(value => (value.title.length > 0));
        if(vitems.length != this.state.items.length) this.autoPlus = false;
        const item = {
            title: '',
            quantity: 0,
            comment: '',
            checked: false,
            isOpen: true
        }
        
        this.setState({items: [...vitems,item]});
    }

    onListTitleChanged(title){
        if(title.length <= 15)
            this.setState({title})
    }

    onItemUpdate(index,{title,quantity,comment}){
        var items = this.state.items;
        items[index] = {title,quantity,comment};
        this.setState({items:[...items]}); 
    }

    onItemDelete(index){
        this.autoPlus = false;
        var items = this.state.items;
        var val = 0;
        items = items.filter(() => index!==val++);
        this.setState({items:[...items]}); 
    }

    onAutoPlusMode(){
        this.autoPlus = true;
        this.onPlusPressed()
    }

    onChangeShowModal(){
        this.setState({showModal:!this.state.showModal});
    }

    onSaveList(){
        const newItem = {
            title: this.state.title,
            items: this.state.items
        }
        this.props.createList(newItem)
        .then(snapshot => {
            const new_ulist = [...this.props.ulist,snapshot.key];
            this.props.updateUlistUser(new_ulist);
        });
        Actions.listpage();
    }

    onAcceptModal(){
        this.setState({showModal:!this.state.showModal});
        Actions.listpage()
    }

    onAutoPlusMode(){
        this.autoPlus = true;
        this.onPlusPressed()
    }

    render(){
        const {plusStyle,titleStyle,cardSectionStyle,whiteButtonStyle,darkButtonStyle,plusSectionStyle,TitleTextInputStyle,TitleInputContainerStyle} = styles;
        return(
            <View>
                <NevMenu/>
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={30}>
                    <ScrollView> 
                    <Card>
                        <CardSection style={cardSectionStyle}>
                                <Text style={titleStyle}>צור רשימה חדשה</Text>
                            </CardSection>
                            <CardSection>
                                <Input
                                    placeholder="שם הרשימה"
                                    value={this.state.title}
                                    onChangeText={this.onListTitleChanged.bind(this)}
                                    ViewContainerStyle={TitleInputContainerStyle}
                                    TextInputStyle={TitleTextInputStyle}
                                />
                            </CardSection>

                            {this.renderList()}
                            <TouchableOpacity onPress={this.onAutoPlusMode.bind(this)}>
                                <CardSection style={plusSectionStyle}>
                                        <Text style={plusStyle}>+ הוסף פריט</Text>
                                </CardSection>
                            </TouchableOpacity>

                            <CardSection style={{marginBottom:130}}>
                                <RegularButton
                                    externButtonStyle={whiteButtonStyle}
                                    externTextStyle={{color:DARK_GREEN}}
                                    onPress={this.onChangeShowModal.bind(this)}
                                >
                                    מחק
                                </RegularButton>
                                <RegularButton
                                    externButtonStyle={darkButtonStyle}
                                    externTextStyle={{color:WHITE}}
                                    onPress={this.onSaveList.bind(this)}
                                >
                                    שמור
                                </RegularButton>
                            </CardSection>
                        </Card>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAcceptModal.bind(this)}
                    onDecline={this.onChangeShowModal.bind(this)}
                >
                האם אתה בטוח שאתה רוצה למחוק את הרשימה?
                </Confirm>
            </View>
        )
    }
}

const styles = {
    plusStyle: {
        alignSelf: 'center',
        color: DARK_GREY,
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 5,
        paddingBottom: 5
    },
    plusSectionStyle:{
        backgroundColor: WHITE,
        justifyContent: 'center',
        marginTop: 2,
        marginBottom: 2,
    },
    titleStyle: {
        alignSelf: 'center',
        color: DARK,
        fontSize: 26,
    },
    cardSectionStyle:{
        justifyContent: 'center',
    },
    listSectionStyle:{
        justifyContent:'flex-start',
        flexDirection: 'column',
    },
    whiteButtonStyle:{
        backgroundColor:WHITE,
        borderColor:DARK_GREEN
    },
    darkButtonStyle:{
        backgroundColor:DARK_GREEN,
        borderColor:DARK_GREEN
    },
    TitleInputContainerStyle:{
        alignSelf:'stretch',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    TitleTextInputStyle:{
        backgroundColor: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
        width: 200
    }
}

const mapStateToProps = ({user}) => {
    const {email,ulist,slist} = user;
    return {email,ulist,slist};
}

export default connect(mapStateToProps,{createList,updateUlistUser})(CreateList);