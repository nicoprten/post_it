import { useState } from 'react';
import { useSelector } from 'react-redux';

import EditProfile from './EditProfile';

import { ArrowLeft } from 'phosphor-react';

const Profile = () => {

    const [showEdit, setShowEdit] = useState(false);

    const currentUser = useSelector(state => state.user);

    return (
        <>
            <div className='flex items-center gap-8 border-b-1 border-gray px-4 py-2'>
                <ArrowLeft className='text-white' size={22} />
                <div>
                    <p className='text-white text-xl'>{currentUser.username}</p>
                    <p className='text-gray text-sm'>0 thoughts</p>
                </div>
            </div>
            <div className='flex justify-between items-center m-auto px-4'>
                <img className='w-[100px] h-[100px] mt-[-20px] border-4 border-black rounded-full object-cover' src={currentUser.avatar} alt='image test' />
                <button className='text-white border-1 border-gray rounded-3xl py-1 px-4 hover:bg-black-light duration-200' onClick={() => setShowEdit(true)}>Edit profile</button>
            </div>
            <div className='p-4'>
                <h2 className='text-white text-lg'>{currentUser.email}</h2>
                <p className='text-gray'>@{currentUser.username}</p>
                <p className='text-white text-normal font-helvetica my-4'>{currentUser.description}</p>
            </div>
            {showEdit ? 
                <EditProfile setShowEdit={setShowEdit}/>
            :
                null
            }
        </>
    );
}

export default Profile;