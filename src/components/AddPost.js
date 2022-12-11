import { useState } from 'react';
import { useSelector } from 'react-redux';

import { createPostDB } from './../methods/index';

export default function AddPost() {

    const currentUser = useSelector(state => state.user);

    const [newPost, setNewPost] = useState({
        userId: currentUser.email,
        thought: '',
        // image: ''
    })

    // console.log(newPost)

    async function postIt(){
        createPostDB(newPost);
    }

    return(
        <div className='flex p-4 border-b-2 border-gray'>
            <img className='shrink-0 w-[75px] h-[75px] mr-4 border-2 border-black-light rounded-full object-cover' src={currentUser.avatar} alt='image test' />
            <div className='flex flex-col flex-end gap-2 w-full'>
                <textarea className='bg-black w-full p-2 resize-none focus:outline-0' placeholder='What are you thinking about?' value={newPost.thought} onChange={(e) => setNewPost({...newPost, thought: e.target.value})}/>
                {newPost.thought ?
                    <button className='bg-blue w-20 rounded-3xl py-1 px-4 border-1 border-transparent hover:bg-black hover:border-white duration-200' onClick={() => postIt()}>Post</button>
                    :
                    <button className='bg-blue w-20 rounded-3xl py-1 px-4 border-1 border-transparent hover:bg-black hover:border-white duration-200' disabled>Post</button>
                }
            </div>
        </div>
    )
}