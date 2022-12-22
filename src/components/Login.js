import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { logInDB, getUserDB } from './../methods/index';
import { updateUser } from './../actions/index';

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
        .then((user) => dispatch(updateUser(user)))
        .then(() => navigate('/'));
    }

    return(
        <div className='bg-black text-black p-4 rounded'>
            <form className='flex flex-col gap-4 w-3/4 mx-auto'>
                <p className='text-white-dark text-sm text-center my-2'>If you already have an account, fill the fields and log in.</p>
                <label className='flex flex-col gap-2 text-gray relative text-[13px] border-1 border-gray p-2 rounded focus-within:border-blue focus-within:text-blue duration-200' htmlFor='email'>
                    Email
                    <input className={'bg-black focus:outline-0 focus-within:h-full focus-within:text-blue ' + (user.email ? 'h-full' : 'h-0')} type='text' name='email' id='email' placehoder='Email' onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} />
                    {/* <input className='h-0 bg-black focus:outline-0 focus-within:h-full focus-within:text-blue' type='text' name='email' id='email' placehoder='Email' onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} /> */}
                </label>

                <label className='flex flex-col gap-2 text-gray relative text-[13px] border-1 border-gray p-2 rounded focus-within:border-blue focus-within:text-blue duration-200' htmlFor='password'>
                    Password
                    <input className={'bg-black focus:outline-0 focus-within:h-full focus-within:text-blue ' + (user.password ? 'h-full' : 'h-0')} type='password' name='password' id='password' placehoder='Password' onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} />
                </label>

                <div className='flex flex-col items-center gap-4 mt-4'>
                    <button className='w-2/4 bg-white-dark text-gray-dark p-2 border-1 border-white-dark rounded-3xl hover:bg-transparent hover:text-white-dark duration-200' onClick={(e) => handleLogIn(e)}>Log in</button>
                    <div className='flex gap-2 items-center'>
                        <p className='text-gray text-sm'>Don't have an account?</p>
                        <button className='text-blue hover:underline' onClick={(e) => navigate('/signup')}>Sign up</button>
                        {currentUser && <p className='text-sm text-black-light'>You are already logged.</p>}
                    </div>
                </div>
            </form>
        </div>
    )
}