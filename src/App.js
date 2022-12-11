import { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { getUserDB } from './methods/index';
import { updateUser} from './actions/index';

// COMPONENTS
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Thought from './components/Thought';

import 'tailwindcss/tailwind.css';


export default function App(){

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user);
    console.log(currentUser)
    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to='/login' />;
    }

    useEffect(()=>{
        if(currentUser){
            getUserDB(currentUser.email)
            .then((user) => dispatch(updateUser(user)));
        }
    }, [])

    return(
        <>
            <NavBar />
            <div className='max-w-[600px] font-kanit mx-auto border-l-2 border-r-2 border-gray'>
                <Routes>
                    <Route path={'/'} element={<RequireAuth><Home /></RequireAuth>} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/signup'} element={<SignUp />} />
                    <Route path={'/:userId'} element={<RequireAuth><Profile /></RequireAuth>} />
                    <Route path={'/:userId/thought/:postId'} element={<RequireAuth><Thought /></RequireAuth>} />
                </Routes>
            </div>
        </>
    )
}