import React from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Linking} from 'react-native';
import {Card,CardSection,Spinner} from './common';
import NevMenu from './NevMenu';
import {fatchList,resetLists,fatchSheredList,agreeShereList} from '../actions';
import ItemList from './ItemList';
import NewbiGuider from './NewbiGuider';
import firebase from '@firebase/app';

class ListsPage extends React.Component{
    
    loading = true;
    loading2 = true;

    constructor(props){
        super(props);
        this.state = {
            userlist:[],
            sheredlist:[],
            isLoading: this.props.isLoading || false,
            isFirst: false,
            isFirst2: false,
        }
        this.handelGetUrl = this.handelGetUrl.bind(this);
        props.resetLists();
    }

    componentDidMount(){
        Linking.addEventListener('url', this.handelGetUrl);

        Linking.getInitialURL().then(url => {
            if (url) {
                var listId = url.split('?')[1];
                if(listId) {
                    agreeShereList(listId);
                    var sheredlist = this.state.sheredlist;
                    if(!sheredlist.includes(listId)) sheredlist.push(listId);
                    this.setState({sheredlist});
                }
            }    
        });
    }

    componentWillMount(){
        const {currentUser} = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/isFirst`)
        .on('value', (snapshot) =>{
            var isFirst = snapshot.val();
            if(isFirst == undefined) isFirst = true;            
            this.setState({isFirst});
        });

        firebase.database().ref(`users/${currentUser.uid}/isFirst2`)
        .on('value', (snapshot) =>{
            var isFirst2 = snapshot.val();
            if(isFirst2 == undefined) isFirst2 = true;            
            this.setState({isFirst2});
        });

    }
    componentWillUnmount(){
        Linking.removeEventListener('url', this.handelGetUrl);
    }

    handelGetUrl(event){
        if (event.url) {
            var listId = event.url.split('?')[1];
            if(listId) {
                agreeShereList(listId);
                var sheredlist = this.state.sheredlist;
                if(!sheredlist.includes(listId)) sheredlist.push(listId);
                this.setState({sheredlist});
            }
        }
    }

    handleDeepLink = (url) => {

  
    };
    componentWillUpdate(nextProps,nextState){

        if(nextProps.ulist.length != nextState.userlist.length){
            if(this.loading){
                nextProps.fatchList(nextProps.ulist)
                .then(snap => {
                    this.setState({userlist:snap});
                });
                this.loading=false;
            }
        }
        else{
            if(!this.loading)
                this.loading = true;
        }

        if(nextProps.slist.length != nextState.sheredlist.length){
            if(this.loading2){
                nextProps.fatchSheredList(nextProps.slist)
                .then(snap => {
                    this.setState({sheredlist:snap});
                });
                this.loading2=false;  
            }
        }
        else{
            if(!this.loading2)
                this.loading2 = true;
        }

    }

    renderList(){
        var listJSX = "";
        if(this.props.ulist.length==0)
            listJSX=<Text style={styles.noticeTextStyle}>אין רשימות</Text>;
        else
            listJSX = this.state.userlist.map(item => <ItemList key={item.key} value={item} shered={false}/>);

        return (
            <View>
                <CardSection style={styles.listContainerStyle}>
                    {listJSX}
                </CardSection>
            </View>
        );
    }


    rendersheredList(){
        var listJSX = "";
        if(this.props.slist.length==0)
            listJSX=<Text style={styles.noticeTextStyle}>אין רשימות</Text>;
        else
            listJSX = this.state.sheredlist.map(item => <ItemList key={item.key} value={item} shered={true}/>);

        return (
            <View>
                <CardSection style={styles.listContainerStyle}>
                    {listJSX}
                </CardSection>
            </View>
        );
    }

    renderloaidng(){
        return(
            <Spinner/>
        )
    }

    renderPage(){
        return(
            <View>
                <NevMenu/>
                <ScrollView style={{marginBottom:70}}> 
                    <Card>
                        <CardSection style={styles.titleContainerStyle}><Text style={styles.userListTitle}>הרשימות שלי</Text></CardSection>                   
                            {(this.props.ulist && this.loading)? this.renderList():<CardSection style={styles.listContainerStyle}><Text style={styles.noticeTextStyle}>טוען רשימות...</Text></CardSection>}
                    </Card>
                    <Card style={{marginTop: 10}}>
                            <CardSection style={styles.titleContainerStyle}><Text style={styles.userListTitle}>הרשימות ששותפו</Text></CardSection>                   
                            {(this.props.slist && this.loading2)? this.rendersheredList():<CardSection style={styles.listContainerStyle}><Text style={styles.noticeTextStyle}>טוען רשימות...</Text></CardSection>}
                    </Card>
                </ScrollView>
            </View>
        )
    }

    renderPageRouter(){
        if(!this.state.isFirst && !this.state.isFirst2){
            if(this.state.isLoading){
                return this.renderloaidng();
            }
            else{
                return this.renderPage();
            }
        }
        if(this.state.isFirst || this.state.isFirst2){
            return <NewbiGuider
                        onFinish={() => this.setState({isFirst: false})}
                        onFinish2={() => this.setState({isFirst2: false})}
                        isFirst = {this.state.isFirst}
                        isFirst2 = {this.state.isFirst2}
                    />
        }

    }
    render(){
        setTimeout(() => this.setState({isLoading: false}),1200);
        return this.renderPageRouter()
    }
}

const mapStateToProps = ({user,lists}) => {
    const {email,ulist,slist,isFirst,isFirst2} = user;
    const {userlist,sheredlist} = lists;
    return {email,ulist,slist,userlist,sheredlist,isFirst,isFirst2};
}


const styles = {
    listContainerStyle:{
        flexDirection: 'column'
    },
    titleContainerStyle:{
        justifyContent: 'center'
    },
    userListTitle:{
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    noticeTextStyle:{
        fontSize: 18,
        paddingTop: 5,
        paddingBottom: 5,
        marginRight: 15,
        marginLeft: 15
    }
}

export default connect(mapStateToProps,{fatchList,resetLists,fatchSheredList,agreeShereList})(ListsPage);
