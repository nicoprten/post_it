import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { logInDB, getUserDB } from './../methods/index';
import { setUser as defineUser } from './../actions/index';

export default function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleLogIn = (e) => {
        e.preventDefault();
        if(currentUser) return;
        logInDB(user.email, user.password);
        getUserDB(user.email)
        .then((user) => dispatch(defineUser(user)))
        .then(() => navigate('/'));
    }

    return(
        <div className='bg-black  text-black p-4 rounded'>
            <form className='flex flex-col w-2/4'>
                <input className='bg-black text-white border-white border-b-2 p-2 focus:outline-0' type='text' name='email' placehoder='Username' onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} />
                <input className='bg-black text-white border-white border-b-2 p-2 focus:outline-0' type='password' name='password' placehoder='Email' onChange={(e) => setUser({...user, [e.target.name]: e.target.value})}/>
                <div className='flex items-center gap-2 mt-4'>
                    <button className='bg-white-dark text-gray-dark p-2 rounded w-2/4' onClick={(e) => handleLogIn(e)}>Log in</button>
                    <button className='bg-white-dark text-gray-dark p-2 rounded w-2/4' onClick={(e) => navigate('/signup')}>Sign Up</button>
                    {currentUser && <p className='text-sm text-black-light'>You are already logged.</p>}
                </div>
            </form>
        </div>
    )
}