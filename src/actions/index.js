import { auth, db } from './../firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';

export function logIn(email, password){
    return async function(dispatch){
        return await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => dispatch({type: 'LOG_USER', payload: userCredential.user}))
        .catch((error)=>
            console.log(error)
        )
    }
}

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
        profile_picture: 'https://firebasestorage.googleapis.com/v0/b/post-it-9ca58.appspot.com/o/profile_pipcture.jpeg?alt=media&token=d2de9a32-e393-437f-847f-e6a8abf71025'
    };
    return async function(dispatch){
        return await setDoc(doc(db, 'users', user.uid), newUser)
        .then(() => dispatch({type: 'SET_USER', payload: newUser}))
        .catch((error) => {
            console.log(error)
        });
    }
}

export function getUserDB(userId){
    let docRef = doc(db, 'users', userId);
    return async function(dispatch){
        return await getDoc(docRef)
        .then((r) => r.data())
        .then((newUser) => dispatch({type: 'SET_USER', payload: newUser}))
        .catch((error) => {
            console.log(error)
        });
    }
}
