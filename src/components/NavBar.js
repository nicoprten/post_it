import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './../actions/index';

import { DotsThree  } from 'phosphor-react';

function NavBar(){

    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogOut = () => {
        dispatch(logOut())
        .then(() => localStorage.removeItem('user'))
        .then(() => navigate('/login'));
    }

    return (
        <div className='flex items-center justify-around gap-2 text-white p-2 rounded-b border-b-2 border-gray'>
            <Link className='font-bold' to='/'>Post It</Link>
            <div className='flex items-center gap-2 bg-black rounded-3xl hover:bg-black-light duration-200'>
                {(currentUser && currentUser.avatar !== ' ') ?
                    <div className='relative'>
                        <button className='flex gap-2 items-center p-2' onClick={() => setShowUserMenu(!showUserMenu)}>
                            <img className='w-[40px] h-[40px] rounded-full object-cover' src={currentUser.avatar} alt={`User profile picture of ${currentUser.name}`} />
                            <div className='flex flex-col items-start'>
                                <p className='font-rubik font-bold text-sm'>@{currentUser.username}</p>
                                <p className='text-gray text-sm'>{currentUser.email}</p>
                            </div>
                            <DotsThree size={32} />
                        </button>
                        {showUserMenu &&
                            <div className='flex flex-col items-start font-bold text-sm absolute bg-black py-2 rounded-3xl border-2 border-black-light shadow-black-light' onClick={() => setShowUserMenu(!showUserMenu)}>
                                <button className='w-full text-left p-4 hover:bg-black-light duration-200' onClick={() => navigate('/profile')}>Profile</button>
                                <button className='p-4 hover:bg-black-light duration-200' onClick={() => handleLogOut()}>Log out @{currentUser.username}</button>
                            </div>
                        }
                    </div>
                    : 
                    <>
                        <button className='border-black border-2 p-2 rounded hover:text-white hover:bg-black' onClick={() => navigate('/login')}>Log In</button>
                        <button className='border-black border-2 p-2 rounded hover:text-white hover:bg-black' onClick={() => navigate('/signup')}>Sign Up</button>
                    </>
                }
            </div>
        </div>
    )
}

export default NavBar;