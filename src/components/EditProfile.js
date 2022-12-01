import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storage } from './../firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { updateUserDB, getUserDB } from './../methods/index';
import { updateUser} from '../actions/index.js';

import { ListPlus, X, Camera } from "phosphor-react";

const EditProfile = ({ setShowEdit }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);

    const [userUpdated, setUserUpdated] = useState({
        email: currentUser.email,
        avatar: currentUser.avatar,
        description: currentUser.description,
        username: currentUser.username
    })

    console.log(userUpdated)

    function uploadImage(){
        if(userUpdated.image === ' ') return;
        const imageRef = ref(storage, `${currentUser.email}/avatar/profile_picture`);
        uploadBytes(imageRef, userUpdated.image)
        .then((snapshot) => 
            getDownloadURL(snapshot.ref).then((url) =>{
                updateUserDB(currentUser.email, 'avatar', url);
                getUserDB(currentUser.email).then((user) => dispatch(updateUser(user)));
            })
        )
    }

    return (
        <div className='min-w-[600px] text-white absolute bg-black p-4 t-0'>
            <div className='flex justify-between'>
                <button onClick={() => setShowEdit(false)}>
                    <X size={22} />
                </button>
                <h2 className='text-xl' >Edit profile</h2>
                <button className='text-black bg-white rounded-3xl py-1 px-4' >Save</button>
            </div>
            <div className='relative w-[100px]'>
                <img className='w-[100px] h-[100px] rounded-full object-cover' src={currentUser.avatar} alt='image test' />
                <div className='absolute top-0 w-full h-full flex items-center justify-center'>
                    <label htmlFor='file'>
                        <Camera className='bg-black opacity-80 rounded-3xl p-2 hover:cursor-pointer hover:bg-gray duration-100' size={42} />
                    </label>
                    <input className='hidden' type='file' name='avatar' id='file' onChange={(e) => 
                        setUserUpdated({
                            ...userUpdated,
                            [e.target.name]: e.target.files[0]
                        })
                    }/>
                </div>
            </div>
            <div className='flex flex-col gap-6 my-4'>
                <div className='flex flex-col border-1 border-gray p-2 rounded focus-within:border-blue focus-within:text-blue'>
                    <label className='flex flex-col gap-2 text-gray text-[13px] focus-within:text-blue' htmlFor='username'>Username
                        <input className='bg-black text-white text-normal focus:outline-0 focus-within:text-white' id='username' type='text' name='username' value={userUpdated.username} onChange={(e) => 
                            setUserUpdated({
                                ...userUpdated,
                                [e.target.name]: e.target.value
                            })
                        }/>
                    </label>
                </div>
                <div className='flex flex-col border-1 border-gray p-2 rounded focus-within:border-blue focus-within:text-blue'>
                    <label className='flex flex-col gap-2 text-gray text-[13px] focus-within:text-blue' htmlFor='description'>Description
                        <input className='bg-black text-white text-normal focus:outline-0 focus-within:text-white' id='description' type='text' name='username' value={userUpdated.description} onChange={(e) => 
                            setUserUpdated({
                                ...userUpdated,
                                [e.target.name]: e.target.value
                            })
                        }/>
                    </label>
                </div>
            </div>
            <button className='flex items-center gap-4 text-blue border-2 rounded
            p-2' onClick={() => uploadImage()}>
                ADD IMAGE
                <ListPlus size={32} />
            </button>
        </div>
    );
}

export default EditProfile;