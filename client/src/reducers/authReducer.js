import { FETCH_USER } from "../actions/types";

// Redux Reducer - Updates state in redux store, checks if user is logged in or not
export default function(state = null, action){ // returns null by default (user unknown)
    switch (action.type){
        case FETCH_USER:
            return action.payload || false; // return user model (user logged in or false if not logged in (empty string))
        default: 
            return state;
    }
    
}