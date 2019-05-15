import React from 'react';
import {View,Text,Image} from 'react-native';
import {CardSection,Input,ImageButton, RegularButton} from './common';
import { WHITE } from './StyleConfig';


class ListItemEditable extends React.Component{

    state = {
        title: this.props.title || '',
        quantity: this.props.quantity || '',
        comment: this.props.comment || '',
    }

    onTitleChange(title){
        if(title.length < 16){
            this.setState({title});
            const update = {
                ...this.state,
                title
            }
            this.props.onItemUpdate(this.props.ukey,update);
        }
    }

    onCommentChange(comment){
        this.setState({comment});
        const update = {
            ...this.state,
            comment
        }
        this.props.onItemUpdate(this.props.ukey,update);
    }

    onQuantityChange(quantity){
        if(!isNaN(quantity)){
            this.setState({quantity});
            const update = {
                ...this.state,
                quantity
            }    
            this.props.onItemUpdate(this.props.ukey,update);
        }
    }
    generateButtonLable(){
        return this.state.title.length == 0? "סגור" : "אישור";
    }
    render(){
        const {title, quantity,comment} = this.state;
        const { cardSectionStyle,inputStyle,closeButtonStyle } = styles;
        return(
            <CardSection style={cardSectionStyle}>
                <CardSection>                
                    <Input
                        label="שם הפריט"
                        placeholder = {'שם הפריט'}
                        onChangeText = {this.onTitleChange.bind(this)}
                        value={title}
                        style={inputStyle}
                    />
                </CardSection>
                
                <CardSection>
                    <Input
                        label="כמות"
                        placeholder= {"0"}
                        onChangeText = {this.onQuantityChange.bind(this)}
                        value={quantity.toString()}
                        style={inputStyle}
                    />                
                </CardSection>
                
                <CardSection>                
                    <Input
                        label="הערה"
                        placeholder = {'רשום כאן'}
                        onChangeText = {this.onCommentChange.bind(this)}
                        value={comment}
                        style={inputStyle}
                    />
                </CardSection>
                <CardSection style={closeButtonStyle}>
                    <RegularButton
                        onPress={this.props.onEditPress.bind(this)}
                        externButtonStyle={styles.applyButtonStyle}
                        externTextStyle={{color:WHITE}}
                    >
                        {this.generateButtonLable()}
                    </RegularButton>
                </CardSection>
            </CardSection>
       )
    }
}


const styles = {
    cardSectionStyle:{
        flexDirection: 'column',
        borderBottomWidth: 2
    },
    closeButtonStyle:{
        borderBottomWidth: 0,
        marginTop: 2,
        paddingTop:2,
    },
    applyButtonStyle:{
        backgroundColor: '#4e8bed',
        borderColor: '#4e8bed'
    }
}

export default ListItemEditable;