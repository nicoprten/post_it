import { auth, db, storage } from './../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';

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

export const updateUserDB = async function(user, userUpdated){
    const ref = doc(db, 'users', user);
    console.log(userUpdated)
    await updateDoc(ref, {
        avatar: userUpdated.avatar,
        username: userUpdated.username,
        description: userUpdated.description
    });
}

export const getUserDB = async function(email){
    let ref = doc(db, 'users', email);
    let userUpdated = await getDoc(ref)
    .then(r => r.data())
    .catch((error) => {
        console.log(error)
    });
    return userUpdated;
}

export const updateImageDB = async function(email, imageFile){
    const imageRef = ref(storage, `${email}/avatar/profile_picture`);
    let url = await uploadBytes(imageRef, imageFile)
    .then((snapshot) => 
        getDownloadURL(snapshot.ref).then(url => url)
    )
    return url;
}

export const createPostDB = async function (dataPost){

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const date = dd + '/' + mm + '/' + yyyy;

    const postId = v4();

    const ref = doc(db, 'posts', postId);
    await setDoc(ref, {
        thought: dataPost.thought,
        postId: postId,
        userId: dataPost.userId,
        date: date
    });
}