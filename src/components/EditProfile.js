import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateUserDB, getUserDB, updateImageDB } from './../methods/index';
import { updateUser} from '../actions/index.js';

import { ListPlus, X, Camera } from "phosphor-react";

const EditProfile = ({ setShowEdit }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);

    const [url, setUrl] = useState('')

    const [userUpdated, setUserUpdated] = useState({
        email: currentUser.email,
        avatar: currentUser.avatar,
        description: currentUser.description,
        username: currentUser.username
    })

    console.log(userUpdated)

    async function update(){
        updateUserDB(currentUser.email, userUpdated);
        getUserDB(currentUser.email).then((user) => dispatch(updateUser(user)));
    }

    return (
        <div className='min-w-[600px] text-white rounded absolute bg-black p-4 top-[90px]'>
            <div className='flex justify-between'>
                <button onClick={() => setShowEdit(false)}>
                    <X className='hover:opacity-80 duration-100' size={22} />
                </button>
                <h2 className='text-xl' >Edit profile</h2>
                <button className='text-black bg-white rounded-3xl py-1 px-4 hover:opacity-80 duration-100' onClick={() => update()}>Save</button>
            </div>
            <div className='relative w-[100px]'>
                <img className='w-[100px] h-[100px] rounded-full object-cover' src={currentUser.avatar} alt='image test' />
                {url && <p className='text-blue text-sm absolute bottom-0 left-[110px] w-[100px]'>Image charged...</p>}
                <div className='absolute top-0 w-full h-full flex items-center justify-center'>
                    <label htmlFor='file'>
                        <Camera className='bg-black opacity-80 rounded-3xl p-2 hover:cursor-pointer hover:bg-gray duration-100' size={42} />
                    </label>
                    <input className='hidden' type='file' name='avatar' id='file' onChange={async (e) => {
                        let url = await updateImageDB(userUpdated.email, e.target.files[0]);
                        console.log(url)
                        setUrl(url);
                        setUserUpdated({
                            ...userUpdated,
                            avatar: url
                        })
                    }}/>
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
                        <input className='bg-black text-white text-normal focus:outline-0 focus-within:text-white' id='description' type='text' name='description' value={userUpdated.description} onChange={(e) => 
                            setUserUpdated({
                                ...userUpdated,
                                [e.target.name]: e.target.value
                            })
                        }/>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;