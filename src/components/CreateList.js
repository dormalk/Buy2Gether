import React from 'react';
import {View,Text,TouchableOpacity,ScrollView} from 'react-native';
import {Card,CardSection,RegularButton,Input,Confirm} from './common';
import { DARK_GREEN,DARK,WHITE } from './StyleConfig';
import ItemListRouting from './ItemListRouting';
import {connect} from 'react-redux';
import {createList,updateUlistUser} from '../actions';
import NevMenu from './NevMenu';
import {Actions} from 'react-native-router-flux';

class CreateList extends React.Component{

    state = {
        title: '',
        items: [],
        showModal: false
    }

    renderList(){
        const {items} = this.state;
        var val = 0;
        const itemsList =  items.map((item) => 
            <ItemListRouting 
                {...item} 
                key={val} 
                ukey={val++} 
                onItemUpdate={this.onItemUpdate.bind(this)}
                onItemDelete={this.onItemDelete.bind(this)}/>
                );
        return(
            <CardSection style={styles.listSectionStyle}>
                {itemsList}
            </CardSection>
        )
    }
    onPlusPressed(){
        const item = {
            title: '',
            quantity: 0,
            comment: '',
            checked: false
        }
        this.setState({items: [...this.state.items,item]});
    }

    onListTitleChanged(title){
        this.setState({title})
    }

    onItemUpdate(index,{title,quantity,comment}){
        var items = this.state.items;
        items[index] = {title,quantity,comment};
        this.setState({items:[...items]}); 
    }

    onItemDelete(index){
        var items = this.state.items;
        var val = 0;
        items = items.filter(() => index!==val++);
        this.setState({items:[...items]}); 
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
    render(){
        const {plusStyle,titleStyle,cardSectionStyle,whiteButtonStyle,darkButtonStyle} = styles;
        return(
            <View>
                <NevMenu/>
                <ScrollView style={{marginBottom:70}}> 
                <Card>
                    <CardSection style={cardSectionStyle}>
                            <Text style={titleStyle}>צור רשימה חדשה</Text>
                        </CardSection>
                        <CardSection>
                            <Input
                                placeholder="שם הרשימה"
                                value={this.state.title}
                                onChangeText={this.onListTitleChanged.bind(this)}
                            />
                        </CardSection>

                        {this.renderList()}

                        <CardSection style={cardSectionStyle}>
                            <TouchableOpacity onPress={this.onPlusPressed.bind(this)}>
                                <Text style={plusStyle}>+</Text>
                            </TouchableOpacity>
                        </CardSection>

                        <CardSection>
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
        color: DARK_GREEN,
        fontSize: 35,
        fontWeight: '800',
        paddingTop: 10,
        paddingBottom: 10
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
    }
}

const mapStateToProps = ({user}) => {
    const {email,ulist,slist} = user;
    return {email,ulist,slist};
}

export default connect(mapStateToProps,{createList,updateUlistUser})(CreateList);