import { auth, db } from './../firebase';
import { doc, getDoc, updateDoc, setDoc  } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export async function createNewUserDB(user){
    let newUser = {
        email: user.email,
        username: user.username,
        description: '',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/post-it-9ca58.appspot.com/o/profile_pipcture.jpeg?alt=media&token=d2de9a32-e393-437f-847f-e6a8abf71025'
    };
    await createUserWithEmailAndPassword(auth, user.email, user.password);
    await setDoc(doc(db, 'users', user.email), newUser)
    .catch((error) => {
        console.log(error)
    });
    return newUser;
}

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