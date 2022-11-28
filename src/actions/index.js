import { auth, db } from './../firebase';
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc  } from 'firebase/firestore';

export function logOut(){
    return async function(dispatch){
        return await signOut(auth).then(() => {
            dispatch({type: 'LOGOUT_USER'})
        }).catch((error) => {
            console.log(error)
        });
    }
}

export function createAccount(email, password){
    return async function(dispatch){
        return await createUserWithEmailAndPassword(auth, email, password)
        .then((newUser) => dispatch({type: 'CREATE_ACCOUNT', payload: newUser.user}))
        .catch((error) => {
            console.log(error)
        });
    }
}

export function createNewUserDB(user){
    console.log(user)
    let newUser = {
        email: user.email,
        name: user.name,
        description: '',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/post-it-9ca58.appspot.com/o/profile_pipcture.jpeg?alt=media&token=d2de9a32-e393-437f-847f-e6a8abf71025'
    };
    return async function(dispatch){
        return await setDoc(doc(db, 'users', user.email), newUser)
        .then(() => dispatch({type: 'SET_USER', payload: newUser}))
        .catch((error) => {
            console.log(error)
        });
    }
}

export function setUser(user){
    return {type: 'SET_USER', payload: user}
}
