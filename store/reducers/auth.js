import { SET_LOGIN, LOGIN, LOGOUT } from '../actions/auth'

const initialState = {
  isLoggedIn: false,
  userId: null,
  userEmail: null
};

const authReducer = (state = initialState, action) =>{
   switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case LOGIN:
      return {
        ...state,
        isLoggedIn: !!action.userInfor.access_token,
        userId: action.userInfor.userid,
        userEmail: action.userInfor.email,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
};

export default authReducer;
