import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createNewUser } from './../actions/index';
import { createNewUserDB } from './../methods/index';

export default function CreateAccount(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleCreateAccount = (e) => {
        e.preventDefault();
        if(currentUser || user.name == ' ' | user.email == ' ' || user.password == ' ') return;
        createNewUserDB(user)
        .then((newUser) => dispatch(createNewUser(newUser)))
        .then(() => navigate('/'));
    }

    return(
        <div className='text-black bg-white p-4 rounded'>
            <form className='flex flex-col gap-2 w-2/4'>
                <p>Name</p>
                <input className='border-black-light border-b-2 p-2 focus:outline-0' type='text' name='username' onChange={(e) => setUser({...user, [e.target.name]: e.target.value})}/>
                <p>Email</p>
                <input className='border-black-light border-b-2 p-2 focus:outline-0' type='text' name='email' onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} />
                <p>Password</p>
                <input className='border-black-light border-b-2 p-2 focus:outline-0' type='password' name='password' onChange={(e) => setUser({...user, [e.target.name]: e.target.value})}/>
                <button className='bg-white-dark text-gray-dark p-2 rounded w-2/4' onClick={(e) => handleCreateAccount(e)}>Sign Up</button>
            </form>
        </div>
    )
}