import React from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Linking} from 'react-native';
import {Card,CardSection,Spinner} from './common';
import NevMenu from './NevMenu';
import {fatchList,resetLists,fatchSheredList,agreeShereList} from '../actions';
import ItemList from './ItemList';


class ListsPage extends React.Component{
    
    loading = true;
    loading2 = true;

    
    state = {
        userlist:[],
        sheredlist:[],
        isLoading: this.props.isLoading || false 
    }

    constructor(props){
        super(props);
        props.resetLists();
    }

    componentDidMount(){
        Linking.getInitialURL().then((url) => {
            if (url) {
                let { queryParams } = Expo.Linking.parse(url);
                if(queryParams.listId)
                    this.props.agreeShereList(queryParams.listId);
            }
        }).catch(err => console.error('An error occurred', err));
    }

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
    render(){
        setTimeout(() => this.setState({isLoading: false}),1200);
        return this.state.isLoading?this.renderloaidng():this.renderPage();
    }
}

const mapStateToProps = ({user,lists}) => {
    const {email,ulist,slist} = user;
    const {userlist,sheredlist} = lists;
    return {email,ulist,slist,userlist,sheredlist};
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
