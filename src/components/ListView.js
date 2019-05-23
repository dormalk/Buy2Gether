import React from 'react'
import {View,Text,ScrollView,Share, Linking} from 'react-native'
import {Card,CardSection,ImageButton,Confirm} from './common';
import NevMenu from './NevMenu';
import {removeList,updateItemAtList,fetchListInterval} from '../actions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ListViewItem from './ListViewItem';
import ShereListModal from './ShereListModal';
import firebase from '@firebase/app';

class ListView extends React.Component{

    state = {
        showModal: false,
        showModal2: false,
        url: '',
        value: this.props.value || []
    }

    checkLogin = setInterval(function(){
        var lid = this.state.value.key;
        firebase.database().ref(`lists/${lid}/items`)
        .once('value')
        .then((snapshot) => {
            var value = this.state.value;
            value.items = [...snapshot.val()];
            this.setState({ state: this.state });
        })
        .catch(() => { return Promise.reject(); }); 
    }.bind(this),1000);

    onRemoveRequest(key) {
        this.props.onRemoveRequest(key);
        this.onChangeShowModal();
        Actions.listpage();
    }

    componentDidMount() {
        Linking.getInitialURL().then((url) => {
            if (url) {
              url = url.split('?')[0];
              if(!url.startsWith('exp://'))
                  url = "https://tinyurl.com/y392wvsw"
              this.setState({url});
            }
          }).catch(err => console.error('An error occurred', err));
    }

    itemChanged(update,index){
        this.props.updateItemAtList({lid:this.state.value.key,update,index});
    }   

    onEditRequet(){
        Actions.editlist({value:this.state.value,src:'view',onRemoveRequest:this.props.onRemoveRequest.bind(this)});
    }

    renderList(){

        if(!this.state.value.items)
            return <CardSection><Text>אין פריטים ברשימה זו</Text></CardSection>
        var i = 0;
        var listJSX = this.state.value.items.map(item => 
            {  
                return <ListViewItem key={i} {...item} position={i++} itemChanged={this.itemChanged.bind(this)}/>
            });
        return listJSX;
    }

    onChangeShowModal(){
        const showModal = !this.state.showModal;
        this.setState({showModal});
    }

    async onShereRquest(){
        //this.setState({showModal2:true});
        await Share.share({
            message: "שיתפו איתך רשימת קניות חדשה - כנס ללינק על מנת לאשר את השיתוף " + this.state.url+'?'+this.state.value.key,
            url: this.state.url+'?'+this.state.value.key,
            title: 'קונים ביחד - אפליקציית קניות חברתית',
          })
          .then((result) =>{
            console.log(result)
              if(result === 'dismissedAction'){
                return
              }
          })
          .catch((error) => console.log(error));
    }

    onRenderButtons(){
        if(!this.props.shered){
            return(
                <View style={styles.imageContainerStyle}>
                    <ImageButton
                        {...styles.imageStyle}
                        source={require('../images/delete.png')}
                        onPress={this.onChangeShowModal.bind(this)}
                    />
                    <ImageButton
                        {...styles.imageStyle}
                        source={require('../images/edit.png')}
                        onPress={this.onEditRequet.bind(this)}
                    />
                    <ImageButton
                        {...styles.imageStyle}
                        source={require('../images/share.png')}
                        onPress={this.onShereRquest.bind(this)}
                    />
                </View>
            )
        }
        else{
            return(
                <View style={styles.imageContainerStyle}>
                    <ImageButton
                        {...styles.imageStyle}
                        source={require('../images/delete.png')}
                        onPress={this.onChangeShowModal.bind(this)}
                    />
                </View>
            ) 
        }
    }

    render(){
        const {title,items,key} = this.state.value;
        const {imageStyle,cardSectionStyle,titleTouchableStyle,imageContainerStyle} = styles;
        return(
            <View>
                <NevMenu/>
                <ScrollView style={{marginBottom:70}}> 
                <Card>
                    <CardSection style={cardSectionStyle}>
                        <Text style={titleTouchableStyle}>{title}</Text>
                        {this.onRenderButtons()}
                    </CardSection>
                        {this.renderList()}
                    </Card>     
                </ScrollView>  
                <Confirm
                visible={this.state.showModal}
                onAccept={this.onRemoveRequest.bind(this,key)}
                onDecline={this.onChangeShowModal.bind(this)}
                >
                    האם אתה בטוח שאתה רוצה למחוק את הרשימה?
                </Confirm>   
                <ShereListModal
                    visible={this.state.showModal2}
                    onChangeModal={() => this.setState({showModal2:!this.state.showModal2})}
                    value={this.state.value}
                />  
            </View>
        )
    }
}


const styles = {
    imageStyle:{
        dimmension:28,
    },
    cardSectionStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleTouchableStyle: {
        color:'#000',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 24,
        textAlign: 'right'
    },
    imageContainerStyle:{
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        paddingTop: 5,
        marginLeft: 15,
        width:110
    }
}

const mapStartToProps = ({user}) => {
    const {ulist} = user;
    return {ulist};
}
export default connect(mapStartToProps,{removeList,updateItemAtList})(ListView);