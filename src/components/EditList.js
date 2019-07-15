import React from 'react';
import {View,Text,TouchableOpacity,ScrollView, KeyboardAvoidingView} from 'react-native';
import {Card,CardSection,RegularButton,Input,Confirm} from './common';
import { DARK_GREEN,DARK,WHITE,DARK_GREY, OCEAN_BLUE } from './StyleConfig';
import ItemListRouting from './ItemListRouting';
import {connect} from 'react-redux';
import {updateList} from '../actions';
import NevMenu from './NevMenu';
import {Actions} from 'react-native-router-flux';



class EditList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title: this.props.value.title || '',
            items: this.props.value.items || []
        }
        this.autoPlus = false;
        this.imageDeleteList = [];
    }

    addToDeleteList(imageId){
        if(!this.imageDeleteList.includes(imageId))
            this.imageDeleteList.push(imageId);
    }

    deleteAllImages(){
        this.imageDeleteList.forEach((item) => {
            try{
                firebase.storage().ref().child(item).delete()
                .then(() => console.log('delete success!'))
                .catch((error) => console.log(error))
            }
            catch{
                console.log('error with delete')
            }
        })
    }

    renderList(){
        const {items} = this.state;
        var val = 0;
        const itemsList =  items.map((item) => {
            return(           
                <ItemListRouting 
                    {...item} 
                    isAutoPlus={this.autoPlus}
                    key={val} 
                    ukey={val++} 
                    onItemUpdate={this.onItemUpdate.bind(this)}
                    onItemDelete={this.onItemDelete.bind(this)}
                    onPlusPressed={this.onPlusPressed.bind(this)}/>
                );
        });
        return(
            <CardSection style={styles.listSectionStyle}>
                {itemsList}
            </CardSection>
        )
    }
    onPlusPressed(){
        // var vitems = this.state.items.map((value) => {
        //     var it = {...value, isOpen:false};
        //     return it;
        // });
        var vitems = this.state.items.filter(value => (value.title.length > 0));
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

    onAutoPlusMode(){
        this.autoPlus = true;
        this.onPlusPressed()
    }

    onListTitleChanged(title){
        if(title.length <= 16)
            this.setState({title})
    }

    onItemUpdate(index,{title,quantity,comment,unit,pic,imageId}){
        var items = this.state.items;
        if(items[index].imageId != imageId){
            this.addToDeleteList(imageId);
        }
        items[index] = {title,quantity,comment,unit,pic,imageId};
        this.setState({items:[...items]}); 
    }

    onItemDelete(index){
        this.autoPlus = false;
        var items = this.state.items;
        var val = 0;
        items = items.filter(() => index !== val++);
        this.setState({items:[...items]}); 
    }

    onChangeShowModal(){
        this.setState({showModal:!this.state.showModal});
    }

    onSaveList(){
        this.deleteAllImages();
        var itemList = this.state.items.filter((item) => item.title != '');
        var title = this.state.title != ''? this.state.title : 'רשימה חדשה'; 
        const update = {
            title,
            items: itemList
        }
        this.props.updateList({lid: this.props.value.key, update})
        if(this.props.src!=undefined)
            Actions.listview({value:this.props.value,onRemoveRequest:this.props.onRemoveRequest.bind(this),shered:false});
        else 
            Actions.listpage();
    }
    
    onDropEdit(){
        Actions.listpage()
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
                                <Text style={titleStyle}>ערוך רשימה</Text>
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
        color: OCEAN_BLUE,
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
        width: 200,
        height: 35
    }
}

const mapStateToProps = ({user}) => {
    const {email,ulist,slist} = user;
    return {email,ulist,slist};
}

export default connect(mapStateToProps,{updateList})(EditList);