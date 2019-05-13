import React from 'react';
import { View, Text,PanResponder,StyleSheet,Animated,Easing,Image,TouchableOpacity } from 'react-native';
import { auth } from 'firebase';


class Swipper extends React.Component<Props>{
    constructor(props){
        super(props);
        this.state={
            width: 0,
            buttons: props.buttons || [],
        }
        this.max = 60*props.numOfBtns;
        this.animatedValue = new Animated.Value(0);

        this.panDiff = 10;
        this.isOpen = false;
        
        this.animatedValue.addListener((width) => {
            this.setState({width: width.value})
        });

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event,getsureState) => true,
            onPanResponderMove: (event,getsureState) => {
                this.setState({release: true});
                if(getsureState.dy < this.panDiff && getsureState.dy > -this.panDiff){
                    if(!this.isOpen && getsureState.dx > 0 && getsureState.dx < this.max){
                        this.setState({width:getsureState.dx});
                    }
                    if(this.isOpen && getsureState.dx < 0 && getsureState.dx > -this.max){
                        this.setState({width: this.max + getsureState.dx});
                    }
    
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                if(this.state.width > this.max*0.5) this.setIsMax();
                else this.setIsEmpty();
            }
        });
    }
    setIsMax(){
        this.isOpen = true;
        this.animatedValue.setValue(this.state.width);
        Animated.timing(this.animatedValue, {
            toValue: this.max,
            duration: 200,
            easing: Easing.linear,
          }).start();
    }

    setIsEmpty(){
        this.isOpen = false;
        this.animatedValue.setValue(this.state.width);
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
          }).start();
    }
    renderButtons(){
        return this.state.buttons.map((btn,index) =>(
            <TouchableOpacity onPress={btn.onPress}>
                <View key={index} style={[styles.btnsUnit,{backgroundColor:btn.backgroundColor}]}>
                    <Image source={btn.source} style={styles.btnImg}/>
                </View>
            </TouchableOpacity>                
        ));
    }

    render(){
        return(
            <View style={styles.parent} {...this._panResponder.panHandlers}>
                <View style={styles.child}>
                    {this.props.children || <Text></Text>}
                </View>
                <View style={[styles.btns,{width:this.state.width}]}>
                    {this.renderButtons()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent:{
        flexDirection: 'row',
        overflow: 'hidden',
    },
    child:{
        display: 'flex',
        flex: 1
    },
    btns:{
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'row-reverse',        
        backgroundColor: 'white'
    },
    btnsUnit:{
        width: 60, 
        flex:1, 
        justifyContent:'center',
        overflow:'hidden'
    },
    btnImg:{
        width: 25, 
        height: 25,
        marginLeft: 'auto',
        marginRight: 'auto'
    }

});
export {Swipper};