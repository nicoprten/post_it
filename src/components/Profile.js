import { useState } from 'react';
import { useSelector } from 'react-redux';

import EditProfile from './EditProfile';

const Profile = () => {

    const [showEdit, setShowEdit] = useState(false);

    const currentUser = useSelector(state => state.user);

    return (
        <div className='text-white'>
            <div className='m-auto'>
                <img className='w-[100px] h-[100px] rounded-full object-cover' src={currentUser.avatar} alt='image test' />
            </div>
            <h2 className='text-lg'>{currentUser.email}</h2>
            <p className='text-gray'>@{currentUser.username}</p>
            <button className='border-1 border-gray rounded-3xl py-1 px-4 hover:bg-black-light duration-200' onClick={() => setShowEdit(true)}>Edit profile</button>
            {showEdit ? 
                <EditProfile setShowEdit={setShowEdit}/>
            :
                null
            }
        </div>
    );
}

export default Profile;