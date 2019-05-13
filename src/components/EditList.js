import React from 'react';
import {View,Text,TouchableOpacity,ScrollView, KeyboardAvoidingView} from 'react-native';
import {Card,CardSection,RegularButton,Input,Confirm} from './common';
import { DARK_GREEN,DARK,WHITE } from './StyleConfig';
import ItemListRouting from './ItemListRouting';
import {connect} from 'react-redux';
import {updateList} from '../actions';
import NevMenu from './NevMenu';
import {Actions} from 'react-native-router-flux';



class EditList extends React.Component{

    state = {
        title: this.props.value.title || '',
        items: this.props.value.items || []
    }

    renderList(){
        const {items} = this.state;
        var val = 0;
        const itemsList =  items.map((item) => {
            return(           
                <ItemListRouting 
                {...item} 
                key={val} 
                ukey={val++} 
                onItemUpdate={this.onItemUpdate.bind(this)}
                onItemDelete={this.onItemDelete.bind(this)}/>
                );
        });
        return itemsList
    }
    onPlusPressed(){
        const vitems = this.state.items.map((value) => {
            var it = {...value, isOpen:false};
            return it;
        });
        const item = {
            title: ' ',
            quantity: 0,
            comment: '',
            checked: false,
            isOpen: true
        }
        
        this.setState({items: [...vitems,item]});
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
        const update = {
            title: this.state.title,
            items: this.state.items
        }
        this.props.updateList({lid: this.props.value.key, update})
        Actions.listpage();
    }
    onDropEdit(){
        Actions.listpage()
    }
    render(){
        const {plusStyle,titleStyle,cardSectionStyle,whiteButtonStyle,darkButtonStyle,plusSectionStyle} = styles;
        return(
            <View>
                <NevMenu/>
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={30}>
                    <ScrollView> 
                        <Card>
                            <CardSection style={cardSectionStyle}>
                                <Text style={titleStyle}>ערוך רשימה</Text>
                            </CardSection>
                            <CardSection>
                                <Input
                                    placeholder="שם הרשימה"
                                    value={this.state.title}
                                    onChangeText={this.onListTitleChanged.bind(this)}
                                />
                            </CardSection>
                            <View>
                                {this.renderList()}
                            </View>
                            <TouchableOpacity onPress={this.onPlusPressed.bind(this)}>
                                <CardSection style={plusSectionStyle}>
                                        <Text style={plusStyle}>+</Text>
                                </CardSection>
                            </TouchableOpacity>
                            <CardSection style={{marginBottom:130}}>
                                <RegularButton
                                    externButtonStyle={whiteButtonStyle}
                                    externTextStyle={{color:DARK_GREEN}}
                                    onPress={this.onDropEdit.bind(this)}
                                >
                                    בטל עריכה
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
            </View>
        )
    }
}

const styles = {
    plusStyle: {
        alignSelf: 'center',
        color: WHITE,
        fontSize: 30,
        fontWeight: '800',
        paddingTop: 5,
        paddingBottom: 5
    },
    plusSectionStyle:{
        backgroundColor: DARK_GREEN,
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
    }
}

const mapStateToProps = ({user}) => {
    const {email,ulist,slist} = user;
    return {email,ulist,slist};
}

export default connect(mapStateToProps,{updateList})(EditList);