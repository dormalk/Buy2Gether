import React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import {CardSection,Input,ImageButton, RegularButton, Spinner} from './common';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { WHITE, DEEP_RED, DARK_GREEN } from './StyleConfig';
import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/storage';



class ListItemEditable extends React.Component{

    state = {
        title: this.props.title || '',
        quantity: this.props.quantity || '',
        unit: this.props.unit || '',
        comment: this.props.comment || '',
        pic: this.props.pic || '',
        imageId: this.props.imageId || '',
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        cameraOn: false,
        loadingPic: false
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

    onUnitChange(unit){
        this.setState({unit});
        const update = {
            ...this.state,
            unit
        }
        this.props.onItemUpdate(this.props.ukey,update);
    }

    generateButtonLable(){
        if(this.state.loadingPic) return "נא להמתין";
        return this.state.title.length == 0? "סגור" : "אישור";
    }
    
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    snapPhoto() { 
        if (this.camera) {
           const options = { quality: 1, base64: true, fixOrientation: true, exif: true};
            this.camera.takePictureAsync(options)
           .then(photo => {
                this.setState({cameraOn:false,loadingPic: true})      
                photo.exif.Orientation = 1;
                this.uploadImage(photo.uri);
            }).catch(error => {
                this.setState({loadingPic: false});
                console.log(error);
            });     
         }
    }
    uniqueId() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    };

    uploadImage = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var uuid = this.uniqueId();
        var ref = firebase.storage().ref().child(uuid);
        ref.put(blob).then(snapshot=>{
            ref.getDownloadURL().then((url) => {
                this.setState({pic:url,loadingPic: false});
                const update = {
                    ...this.state,
                    pic: url,
                    imageId: uuid
                }
                this.props.onItemUpdate(this.props.ukey,update);
            }).catch(error => {
                this.setState({loadingPic: false});
                console.log(error)
            })
        }).catch(error => {
            this.setState({loadingPic: false});
            console.log(error)});
      }

    openCamera(){
        this.setState({cameraOn: true});
    }

    renderCameraButton(){
        if(this.state.cameraOn){
            return(<View></View>)
        }
        if(this.state.loadingPic){
            return <Spinner size='small'/>
        }
        else if(this.state.pic != ''){
            return(
                <TouchableOpacity onPress={this.openCamera.bind(this)}>
                    <Image
                        style={{width: 150, height: 150}}
                        source={{uri:this.state.pic}}
                    />
                </TouchableOpacity>
            )
        }
        else{
            return(
                <TouchableOpacity onPress={this.openCamera.bind(this)}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={require('../images/camera.png')}
                    />
                </TouchableOpacity>
            )
        }
    }

    render(){
        const {title, quantity,comment,unit} = this.state;
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
                        autoFocus={true}
                    />
                </CardSection>
                
                <CardSection>
                    <Input
                        label="כמות"
                        placeholder= {"0"}
                        onChangeText = {this.onQuantityChange.bind(this)}
                        value={quantity.toString()}
                        style={inputStyle}
                        LabelInputStyle={{flex: 0}}
                    />
                    <Input
                        label="יחידה"
                        placeholder= {"ליטר/גרם/קג..."}
                        onChangeText = {this.onUnitChange.bind(this)}
                        value={unit}
                        style={inputStyle}
                        LabelInputStyle={{flex:0}}
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
                <CardSection style={{justifyContent: 'center',paddingTop: 5}}>
                    {this.renderCameraButton()}
                </CardSection>
                {!!this.state.cameraOn &&
                    <CardSection style={{width: '100%',flex:1}}>
                        <Camera
                            ref={ (ref) => {this.camera = ref} }
                            type={this.state.type}
                            style={{flex:1,justifyContent:'center',alignItems: 'center',marginLeft:5}}>

                            <TouchableOpacity 
                                style={{flex:1,margin: 50, opacity: 0.5}}
                                onPress={this.snapPhoto.bind(this)}>
                                <Image
                                    source={require('../images/focus.png')}
                                />
                                <Text style={{color:WHITE,fontSize: 16, alignSelf:'center',paddingTop: 5}}>לחץ לצילום</Text>
                            </TouchableOpacity>
                        </Camera>
                        <View style={{justifyContent: 'center', flexDirection: 'column'}}>
                            <RegularButton
                                onPress={() => {this.setState({loadingPic:false, cameraOn: false})}}
                                externButtonStyle={{backgroundColor: DEEP_RED,borderColor:DEEP_RED,alignItems:'center',flex:1, justifyContent:'center'}}
                                externTextStyle={{color:WHITE,fontSize:14,padding: 10}}
                            >
                                סגור צילום
                            </RegularButton>
                            {!!this.state.pic && <RegularButton
                                onPress={() => {
                                        const update = {
                                            ...this.state,
                                            pic: '',
                                            imageId: ''
                                        }
                                        this.props.onItemUpdate(this.props.ukey,update);                        
                                        this.setState({pic:'',imageId:'',loadingPic:false, cameraOn: false});
                                }}
                                externButtonStyle={{backgroundColor: WHITE,borderColor:DEEP_RED, marginTop: 4,alignItems:'center',flex:1, justifyContent:'center'}}
                                externTextStyle={{color:DEEP_RED,fontSize:14,padding: 10}}
                            >
                                מחק צילום
                            </RegularButton>}
                        </View>
                    </CardSection>
                }
                <CardSection style={closeButtonStyle}>
                    <RegularButton
                        onPress={!this.state.loadingPic?this.props.onEditPress.bind(this):console.log('notfinish')}
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