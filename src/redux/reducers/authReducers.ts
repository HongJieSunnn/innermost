import {
    STORE_USER,
    USER_SIGNED_OUT,
    USER_EXPIRED,
    STORE_USER_ERROR,
    LOADING_USER
} from '../actionTypes'

const initialUser={
    user:null,
    isLoadingUser:false
}

export default function(state=initialUser,action:any){
    switch (action.type) {
        case STORE_USER:
          return {
            ...state,
            isLoadingUser: false,
            user: action.payload
          }
        case LOADING_USER:
          return {
            ...state,
            isLoadingUser: true
          }
        case USER_EXPIRED:
        case STORE_USER_ERROR:
        case USER_SIGNED_OUT:
          return {
            ...state,
            user: null,
            isLoadingUser: false
          }
        default:
          return state
      }
}