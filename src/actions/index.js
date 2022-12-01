import { auth } from './../firebase';
import { signOut } from "firebase/auth";

export function logOut(){
    return async function(dispatch){
        return await signOut(auth).then(() => {
            dispatch({type: 'LOGOUT_USER'})
        }).catch((error) => {
            console.log(error)
        });
    }
}

export function createNewUser(newUser){
    return {type: 'SET_USER', payload: newUser}
}

export function updateUser(user){
    return {type: 'SET_USER', payload: user}
}
