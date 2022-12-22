import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './../actions/index';

import { DotsThree, NotePencil  } from 'phosphor-react';

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
        <div className='flex items-center justify-around gap-2 text-white p-2 border-b-2 border-gray'>
            {currentUser && 
            <Link className='' to='/'>
                <NotePencil className='text-black bg-white-dark p-2 rounded-full hover:bg-blue' size={42} />
            </Link>
            }
            <div className='flex items-center gap-2 bg-black'>
                {(currentUser && currentUser.avatar !== ' ') ?
                    <div className='relative rounded-3xl hover:bg-black-light duration-200'>
                        <button className='flex gap-2 items-center p-2' onClick={() => setShowUserMenu(!showUserMenu)}>
                            <img className='w-[40px] h-[40px] rounded-full object-cover' src={currentUser.avatar} alt={`User profile picture of ${currentUser.name}`} />
                            <div className='flex flex-col items-start'>
                                <p className='font-rubik font-bold text-sm'>@{currentUser.username}</p>
                                <p className='text-gray text-sm'>{currentUser.email}</p>
                            </div>
                            <DotsThree size={32} />
                        </button>
                        {showUserMenu &&
                            <div className='flex flex-col items-start font-bold text-sm absolute z-10 bg-black py-2 rounded-3xl border-2 border-black-light shadow-black-light' onClick={() => setShowUserMenu(!showUserMenu)}>
                                <button className='w-full text-left p-4 hover:bg-black-light duration-200' onClick={() => navigate(`/${currentUser.email}`)}>Profile</button>
                                <button className='p-4 hover:bg-black-light duration-200' onClick={() => handleLogOut()}>Log out @{currentUser.username}</button>
                            </div>
                        }
                    </div>
                    : 
                    <>
                        <button className='border-black border-2 p-2 rounded hover:text-white hover:text-blue' onClick={() => navigate('/login')}>Log in</button>
                        <button className='border-black border-2 p-2 rounded hover:text-white hover:text-blue' onClick={() => navigate('/signup')}>Sign up</button>
                    </>
                }
            </div>
        </div>
    )
}

export default NavBar;