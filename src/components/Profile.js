import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { storage } from './../firebase.js';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

import { ListPlus } from "phosphor-react";

const Profile = () => {

    const currentUser = useSelector(state => state.user);

    const [post, setPost] = useState({
        user: '',        
        image: ''
    })
    const [image, setImage] = useState([])

    function uploadImage(e){
        if(post.image === '') return;
        const imageRef = ref(storage, post.image.name + v4());
        uploadBytes(imageRef, post.image)
        .then((snapshot) => 
            getDownloadURL(snapshot.ref).then((url) => 
                setImage((prev) => [...prev, url])
            )
        )
    }

    useEffect(() => {
        listAll(ref(storage, currentUser.uid))
        .then((r) => r.items.forEach(image => 
            getDownloadURL(image)
            .then(url => setImage((prev) => [...prev, url]))
        ))
        // console.log(imageList)
    }, [])

    return (
        <div className='text-white'>
            <div className='m-auto'>
                <img className='w-[100px] h-[100px] rounded-full' src={currentUser.profile_picture} alt='image test' />
            </div>
            <h2>{currentUser.email}</h2>
            <input type='file' name='image' onChange={(e) => setPost({
                ...post,
                [e.target.name]: e.target.files[0]
            })} />
            <button className='flex items-center gap-4 text-blue border-2 rounded
            p-2' onClick={() => uploadImage()}>
                ADD IMAGE
                <ListPlus size={32} />
            </button>
        </div>
    );
}

export default Profile;