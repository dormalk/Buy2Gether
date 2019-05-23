import React from 'react';
import {connect} from 'react-redux';
import {View,Text,TouchableWithoutFeedback,Share,Linking} from 'react-native';
import {CardSection,ImageButton,Confirm} from './common';
import {removeList,updateUlistUser,updateSlistUser,agreeShereList} from '../actions';
import {Actions} from 'react-native-router-flux';
import ShereListModal from './ShereListModal';

class ItemList extends React.Component{

    state = {
        showModal: false,
        showModal2: false,
        url: ''
    }

    onRemoveRequest(key) {
        if(!this.props.shered){
            this.props.removeList({lid:key})
            .then(() => {
                const new_ulist = this.props.ulist.filter(item => item != key);
                this.props.updateUlistUser(new_ulist);
            })    
        }
        else{
            const new_slist = this.props.slist.filter(item => item != key);
            this.props.updateSlistUser(new_slist);
        }
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

    onChangeShowModal(){
        const showModal = !this.state.showModal;
        this.setState({showModal});
    }
    onViewRequest(){
        Actions.listview({value:this.props.value,onRemoveRequest:this.onRemoveRequest.bind(this),shered:this.props.shered});
    }
    onEditRequet(){
        Actions.editlist({value:this.props.value});
    }

    async onShereRquest(){
        //this.setState({showModal2:true});
        await Share.share({
            message: "שיתפו איתך רשימת קניות חדשה - כנס ללינק על מנת לאשר את השיתוף " + this.state.url+'?'+this.props.value.key,
            url: this.state.url+'?'+this.props.value.key,
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
        const {title,key} = this.props.value;
        const {imageStyle,cardSectionStyle,titleTouchableStyle,imageContainerStyle} = styles;
        return(
            <View>
                <CardSection style={cardSectionStyle}>
                    <TouchableWithoutFeedback
                        onPress={this.onViewRequest.bind(this)}
                    >
                        <Text style={titleTouchableStyle}>{title}</Text>
                    </TouchableWithoutFeedback>
                    {this.onRenderButtons()}
                </CardSection>

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
                    value={this.props.value}
                /> 
        </View>
        )
    }
}

const styles = {
    imageStyle:{
        dimmension:25,
    },
    cardSectionStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleTouchableStyle: {
        color:'#000',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 18,
        textAlign: 'right'
    },
    imageContainerStyle:{
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        paddingTop: 5,
        paddingBottom: 5,
        width:100
    }
}

const mapStartToProps = ({user}) => {
    const {ulist,slist} = user;
    return {ulist,slist};
}
export default connect(mapStartToProps,{removeList,updateUlistUser,updateSlistUser,agreeShereList})(ItemList);