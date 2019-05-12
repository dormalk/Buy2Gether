import{
    FATCH_ULIST,
    FATCH_SLIST,
    RESET_LISTS,
    REMOVE_LIST    
} from '../actions/types';


const INITIAL_STATE = { 
    userlist: [],
    sheredlist: []
};

export default (state = INITIAL_STATE,action) => {
    switch(action.type){
        case FATCH_ULIST:{
            return{
                ...state,
                userlist: action.userlist
            }
        }
        case FATCH_SLIST:{
            return{
                ...state,
                sheredlist: action.sheredlist
            }
        }
        case RESET_LISTS:{
            return{
                ...state,
                ...INITIAL_STATE
            }
        }
        case REMOVE_LIST:
        return{
            ...state,
            userlist: [this.state.ulist.filter(item => item.key!==action.payload)],
            sheredlist: [this.state.ulist.filter(item => item.key!==action.payload)],
        }
        default:
            return state;
    }
}