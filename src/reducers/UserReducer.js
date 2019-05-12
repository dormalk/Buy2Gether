import{
    FATCH_USER,
    UPDATE_ULIST_USER,
    UPDATE_SLIST_USER,
    REMOVE_USER,
    ADD_NEW_LIST,
    CREATE_USER
} from '../actions/types';


const INITIAL_STATE = { 
    email: '',
    ulist: [],
    slist: []
};

export default (state = INITIAL_STATE,action) => {
    switch(action.type){
        case CREATE_USER:{
            return{
                ...state,
                email: action.payload,
                ulist:[],
                slist:[]
            }
        }
        case FATCH_USER:
            return{
                ...state,
                ...action.payload
            }
        case UPDATE_ULIST_USER:
            return{
                ...state,
                ulist:action.payload
            }
        case UPDATE_SLIST_USER:
        return{
            ...state,
            slist:action.payload
        }
        case REMOVE_USER:
            return{
                ...state,
                ...INITIAL_STATE
            }
        case ADD_NEW_LIST:
            return{
                ...state,
                ulist: action.payload
            }
        default:
            return state;
    }
}