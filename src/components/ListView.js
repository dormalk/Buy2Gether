import React from 'react'
import {View,Text,ScrollView} from 'react-native'
import {Card,CardSection,ImageButton,Confirm} from './common';
import NevMenu from './NevMenu';
import {removeList,updateItemAtList} from '../actions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ListViewItem from './ListViewItem';
import ShereListModal from './ShereListModal';

class ListView extends React.Component{

    state = {
        showModal: false,
        showModal2: false
    }

    onRemoveRequest(key) {
        this.props.onRemoveRequest(key);
        this.onChangeShowModal();
        Actions.listpage();
    }

    itemChanged(update,index){
        this.props.updateItemAtList({lid:this.props.value.key,update,index});
    }   

    onEditRequet(){
        Actions.editlist({value:this.props.value});
    }

    renderList(){
        if(!this.props.value.items)
            return <CardSection><Text>אין פריטים ברשימה זו</Text></CardSection>
        var i = 0;
        var listJSX = this.props.value.items.map(item => 
            {
                return <ListViewItem key={i} {...item} position={i++} itemChanged={this.itemChanged.bind(this)}/>
            });
        return listJSX;
    }

    onChangeShowModal(){
        const showModal = !this.state.showModal;
        this.setState({showModal});
    }

    onShereRquest(){
        this.setState({showModal2:true});
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
        const {title,items,key} = this.props.value;
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
                    value={this.props.value}
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