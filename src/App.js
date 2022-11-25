import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import { useSelector } from 'react-redux';

// COMPONENTS
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

import 'tailwindcss/tailwind.css';

export default function App(){

    const currentUser = useSelector(state => state.user);
    console.log(currentUser)
    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to='/login' />;
    }

    return(
        <>
            <NavBar />
            <div className='w-60vw font-kanit mt-4 mx-auto border-2 border-gray rounded p-4'>
                <Routes>
                    <Route path={'/'} element={<RequireAuth><Home /></RequireAuth>} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/signup'} element={<SignUp />} />
                    <Route path={'/profile'} element={<RequireAuth><Profile /></RequireAuth>} />

                </Routes>
            </div>
        </>
    )
}