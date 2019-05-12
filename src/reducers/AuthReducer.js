import{
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_USER,
    RAGISTER_SUCCESS,
    RAGISTER_FAIL,
    RAGISTER_USER,
    AUTH_PASSWORD_CHANGED,
    RAGISTER_FAIL_NOT_FIT_PASSWORDS,
    CLEAR_FORM,
    RECOVERY_FAIL,
    RECOVERY_PASSWORD,
    RECOVERY_SUCCESS,
    LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = { 
    email: '',
    password: '',
    authPassword: '',
    user: null,
    error: '',
    loading: false,
    confirm: ''
 };

export default (state = INITIAL_STATE,action) => {
    switch(action.type){
        case EMAIL_CHANGED:
            return{
                ...state,
                email: action.payload
            }
        case PASSWORD_CHANGED:
            return{
                ...state,
                password: action.payload
            }
        case AUTH_PASSWORD_CHANGED:
            return{
                ...state,
                authPassword: action.payload
            }
        case LOGOUT_USER:
            return{
                ...state,
                ...INITIAL_STATE
            }
        case LOGIN_FAIL:
            return{
                ...state,
                confirm: '',
                error: 'אימות נכשל',
                password: '',
                loading: false
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                ...INITIAL_STATE,
                user: action.payload,
                loading: false
            }
        case LOGIN_USER:
            return{
                ...state,
                loading: true
            }
        case RAGISTER_SUCCESS:
            return{
                ...state,
                ...INITIAL_STATE,
                user: action.payload,
                loading: false
            }
        case RAGISTER_FAIL:
            return{
                ...state,
                confirm: '',
                error: 'רישום נכשל',
                password: '',
                authPassword: '',
                loading: false
            }
        case RAGISTER_FAIL_NOT_FIT_PASSWORDS:
            return{
                ...state,
                confirm: '',
                error: 'סיסמאות לא זהות',
                password: '',
                authPassword: '',
                loading: false
            }
        case RAGISTER_USER:{
            return{
                ...state,
                loading:true
            }
        }
        case CLEAR_FORM:{
            return{
                ...state,
                ...INITIAL_STATE
            }
        }
        case RECOVERY_FAIL:{
            return{
                ...state,
                confirm: '',
                error: 'לא ניתן לבצע שיחזור',
                loading: false
            }
        }
        case RECOVERY_PASSWORD:{
            return{
                ...state,
                password: '',
                loading: true
            }
        }
        case RECOVERY_SUCCESS: {
            return{
                confirm: 'נשלח מייל לאיפוס',
                error: '',
                password: '',
                loading: false
            }
        }
        default:
            return state;
    }
}