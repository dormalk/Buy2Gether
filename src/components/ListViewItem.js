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
                    {!!this.props.quantity && <Text style={styles.extendsTextStyle}>כמות: {this.props.quantity}</Text>}
                    {!!this.props.unit && <Text style={styles.extendsTextStyle}>יחידה: {this.props.unit}</Text>}
                    {!!this.props.comment && <Text style={styles.extendsTextStyle}>הערה: {this.props.comment}</Text>}
                    {!!this.props.pic && <Image style={{width: 150, height: 150, alignSelf:'center'}} source={{uri:this.props.pic}}/>}
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
                    {(!!this.props.quantity || !!this.props.unit || !!this.props.comment || !!this.props.pic) &&
                        <ImageButtonNoFeedback
                            {...styles.imageStyle}
                            source={require('../images/arrow2.png')}
                            onPress={() => this.setState({isOpen: !this.state.isOpen})}
                        />
                    } 
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
        paddingTop: 2,
        paddingBottom: 2,
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
        fontSize: 18,
        textDecorationLine: 'line-through',
        marginBottom: 2
    },
    uncheckedTitle:{
        fontSize: 18,
        textDecorationLine: 'none',
        marginBottom: 2
    },
    extendsTextStyle:{
        fontSize: 16,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 25,
        paddingLeft: 25,
        textAlign: 'left',
        flexDirection: 'row'
    },
    itemImageStyle:{
        width:100,
        height:100,
        alignSelf: 'center'
    }
    

}
export default ListViewItem;