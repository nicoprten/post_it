import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storage } from './../firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { updateUserDB, getUserDB } from './../methods/index';
import { setUser } from '../actions/index.js';

import { ListPlus } from "phosphor-react";

const Profile = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);

    const [image, setImage] = useState({})



    function uploadImage(){
        if(image === ' ') return;
        const imageRef = ref(storage, `${currentUser.email}/avatar/profile_picture`);
        uploadBytes(imageRef, image)
        .then((snapshot) => 
            getDownloadURL(snapshot.ref).then((url) =>{
                updateUserDB(currentUser.email, 'avatar', url);
                getUserDB(currentUser.email).then((user) => dispatch(setUser(user)));
            })
        )
        
    }

    return (
        <div className='text-white'>
            <div className='m-auto'>
                <img className='w-[100px] h-[100px] rounded-full object-cover' src={currentUser.avatar} alt='image test' />
            </div>
            <h2>{currentUser.email}</h2>
            <input type='file' name='image' onChange={(e) => 
                setImage(e.target.files[0])
            } />
            <button className='flex items-center gap-4 text-blue border-2 rounded
            p-2' onClick={() => uploadImage()}>
                ADD IMAGE
                <ListPlus size={32} />
            </button>
        </div>
    );
}

export default Profile;