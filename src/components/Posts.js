import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { db } from './../firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { DotsThree, Trash, Export } from 'phosphor-react';

export default function Posts() {

    const navigate = useNavigate();

    const currentUser = useSelector(state => state.user);

    const [allPosts, setAllPosts] = useState([]);

    const [showThoughtMenu, setShowThoughtMenu] = useState([]);

    useEffect(() =>{
        const q = query(collection(db, "posts"), where("userId", "==", currentUser.email));
        onSnapshot(q, (querySnapshot) => {
            let posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
                setShowThoughtMenu(current => [...current, false]);
            });
            setAllPosts(posts);
        });
    }, [])

    function handleShowMenu(e, index){
        // I work on a copy of the state, council of react.
        // I set to false all the states of each post except the one you are clicking on, so the menus don't accumulate. 
        // Then I change the state of the one I'm clicking to the opposite and finally save it in the local state.
        let newShowMenu = [...showThoughtMenu];
        newShowMenu = newShowMenu.map((stateMenu, indexState) => {
            if (index !== indexState ) return stateMenu = false;
            return stateMenu;
        })
        newShowMenu[index] = !newShowMenu[index];
        setShowThoughtMenu(newShowMenu);
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    return (
        <div className='flex flex-col text-white'>
            {allPosts ? allPosts.map((p, i) => 
                <div className='flex gap-2 p-4 border-b-1 border-gray hover:bg-black-light hover:cursor-pointer' key={p.postId} onClick={() => navigate(`thought/${p.postId}`)}>
                    {currentUser.email === p.userId && <img className='w-[50px] h-[50px] object-cover rounded-full shrink-0' src={currentUser.avatar} alt={'user avatar'}/>}
                    <div className='w-full flex flex-col'>
                        <div className='flex items-center gap-4'>
                            <p>{p.userId}</p>
                            <p className='text-sm text-gray'>{p.date}</p>
                        </div>
                        <p>{p.thought}</p>
                    </div>
                    <div className='relative'>
                        <DotsThree className='w-[30px] h-[30px] shrink-0 p-1 rounded-full hover:bg-blue-dark hover:text-blue hover:cursor-pointer duration-200' size={32} onClick={(e) => handleShowMenu(e, i)}/>
                        {showThoughtMenu[i] &&
                            <div className='w-[200px] flex flex-col items-start font-bold font-thin text-sm absolute z-10 bg-black py-2 rounded-3xl border-2 border-black-light shadow-black-light' onClick={() => setShowUserMenu(!showUserMenu)}>
                                <button className='flex items-center gap-2 w-full text-blue text-left p-4 hover:bg-black-light duration-200'>
                                    <Export size={22} />
                                    Copy link to share
                                </button>
                                <button className='flex items-center gap-2 w-full text-red text-left p-4 hover:bg-black-light duration-200'>
                                    <Trash size={22} />
                                    Delete
                                </button>
                            </div>
                        }
                    </div>
                </div>
            )
                :
                <p>No thoughts here...</p>
            }
        </div>
  )
}
