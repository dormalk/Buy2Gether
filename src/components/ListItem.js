import React from 'react';
import {View,Text,TextInput,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import {CardSection,ImageButton,Swipper} from './common';

class ListItem extends React.Component{

    state = {
        title: this.props.title || '',
        quantity: this.props.quantity || '',
        comment: this.props.comment || '',
    }
    
    onChangeText(title){
        this.setState({title});
        const update = {
            ...this.state,
            title
        }
        this.props.onItemUpdate(this.props.ukey,update);
    }


    render(){
        const { textStyle,cardSectionStyle,imageStyle,inputStyle } = styles;
        const btns = [{
            source: require('../images/rubbish-bin.png'),
            backgroundColor: 'red',
            onPress: this.props.onItemDelete.bind(this,this.props.ukey)
        }];
        return(
            <Swipper buttons={btns} numOfBtns={1} >
                <CardSection style={cardSectionStyle}>
                    <TouchableOpacity onPress={this.props.onEditPress.bind(this)}>
                        <Text style={textStyle}>{this.props.title}</Text>
                    </TouchableOpacity>
                </CardSection>
            </Swipper>
       )
    }
}


const styles = {
    textStyle:{
        flex: 2,
        fontSize: 18,
        textAlign:'left',
        paddingLeft: 20,
        paddingRight: 20
    },
    cardSectionStyle:{
        flexDirection: 'row',
        border: 0,
        marginLeft: -5,
        marginRight: -5,
    },
    imageStyle:{
        marginRight:10,
        dimmension:30
    },
    inputStyle: {
        color:'#000',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 0,
        paddingBottom:0,
        fontSize: 22,
        width: 100,
        height: 32,
        flex: 2,
        textAlign: 'right'
    },
}

export default ListItem;