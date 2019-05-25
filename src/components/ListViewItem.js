import React from 'react'
import {Card,CardSection,ImageButtonNoFeedback} from './common'
import {Text,View,Image} from 'react-native';
class ListViewItem extends React.Component{

    state = {
        checked: this.props.checked,
        index: this.props.position,
        isOpen: false
    }
    componentWillReceiveProps(nextProps) {
        // only update chart if the data has changed
        if (nextProps.checked != this.state.checked) {
            this.setState({checked: nextProps.checked})
        }
    }
    renderOpenItem(){
        if(this.state.isOpen){
            return(
                <View style={{flexDirection: 'column',paddingTop: 5, paddingBottom: 5,marginRight: 20}}>
                    <Text style={styles.extendsTextStyle}>כמות: {this.props.quantity}</Text>
                    <Text style={styles.extendsTextStyle}>הערה: {this.props.comment}</Text>
                </View>
            )
        }
    }

    onCheckChange(){
        const update = {
            checked: !this.state.checked
        }
        this.props.itemChanged(update,this.state.index);
        this.setState({checked:!this.state.checked})
    }

    renderCheckBox(){
        if(this.state.checked){
            return (
                <ImageButtonNoFeedback
                    {...styles.checkBoxStyle}
                    source={require('../images/checked.png')}
                    onPress={() => this.onCheckChange()}
                />
            )
        }
        return (
            <ImageButtonNoFeedback
                {...styles.checkBoxStyle}
                source={require('../images/unchecked.png')}
                onPress={() => this.onCheckChange()}
            />
        )

    }

    renderTitleItem(){
        if(this.state.checked){
            return <Text style={styles.checkedTitle}>{this.props.title}</Text>
        }
        return <Text style={styles.uncheckedTitle}>{this.props.title}</Text>
    }

    render(){
        return(
            <CardSection style={styles.itemContainerStyle}>
                <View style={styles.itemTopContainerStyle}>
                    <View style={{flexDirection:'row-reverse'}}>
                        {this.renderTitleItem()}
                        {this.renderCheckBox()}
                    </View>
                    <ImageButtonNoFeedback
                        {...styles.imageStyle}
                        source={require('../images/arrow2.png')}
                        onPress={() => this.setState({isOpen: !this.state.isOpen})}
                    /> 
                </View>
                {this.renderOpenItem()}
            </CardSection>
        )
    }
}

const styles = {
    itemContainerStyle:{
        flexDirection:'column'
    },
    itemTopContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10
    },
    checkBoxStyle:{
        dimmension:28,
        marginRight: 10
    },
    imageStyle:{
        dimmension:20
    },
    checkedTitle:{
        fontSize: 22,
        textDecorationLine: 'line-through',
        marginBottom: 2
    },
    uncheckedTitle:{
        fontSize: 22,
        textDecorationLine: 'none',
        marginBottom: 2
    },
    extendsTextStyle:{
        fontSize: 22,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 25,
        paddingLeft: 25,
        alignText: 'right',
        flexDirection: 'row'
    },
    itemImageStyle:{
        width:100,
        height:100,
        alignSelf: 'center'
    }
    

}
export default ListViewItem;