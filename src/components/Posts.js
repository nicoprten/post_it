import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { db } from './../firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Posts() {

    const currentUser = useSelector(state => state.user);

    const [allPosts, setAllPosts] = useState([]);

    useEffect(() =>{
        const q = query(collection(db, "posts"), where("userId", "==", currentUser.email));
        onSnapshot(q, (querySnapshot) => {
            let posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            setAllPosts(posts);
        });
    }, [])

    return (
        <div className='text-white'>
            {allPosts ? allPosts.map(p => 
                <div>
                    <p>{p.userId}</p>
                    <p>{p.thought}</p>
                    <p>{p.date}</p>
                </div>
            )
                :
                <p>No thoughts here...</p>
            }
        </div>
  )
}
