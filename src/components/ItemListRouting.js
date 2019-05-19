import React from 'react';
import ListItem from './ListItem';;
import ListItemEditable from './ListItemEditable';

class ItemListRouting extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen: props.isOpen || false
        }
        this.double = false;
    }
    onEditPress(){
        if(this.double || this.state.isOpen){
            this.setState({isOpen: !this.state.isOpen})
            this.double = false;
            if(this.props.title.length == 0) this.props.onItemDelete(this.props.ukey);
            else if (this.props.isAutoPlus) this.props.onPlusPressed();
        }
        else this.double = true;
        //setTimeout(() => this.double = false,500);
    }
    componentWillUpdate(nextProps,nextState){
        if(nextProps.isOpen != undefined && this.state.isOpen != nextProps.isOpen)
            this.setState({isOpen: nextProps.isOpen});
        this.double = false;
    }
    renderItem(){
        return this.state.isOpen?
                <ListItemEditable {...this.props} onEditPress={this.onEditPress.bind(this)}/>
        :
                <ListItem {...this.props} onEditPress={this.onEditPress.bind(this)}/>
    };

    render(){
        return (this.renderItem())
    }
}

export default ItemListRouting;