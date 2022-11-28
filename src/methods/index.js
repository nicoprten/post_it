import { auth, db } from './../firebase';
import { doc, getDoc, updateDoc  } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";


export const logInDB = async function(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => userCredentials.user)
    .catch((error)=>
        console.log(error)
    )
}

export const updateUserDB = async function(user, field, value){
    const ref = doc(db, 'users', user);
    await updateDoc(ref, {
        [field]: value
    });
}

export const getUserDB = async function(email){
    let ref = doc(db, 'users', email);
    const userUpdated = await getDoc(ref)
    .then(r => r.data())
    .catch((error) => {
        console.log(error)
    });
    return userUpdated;
}