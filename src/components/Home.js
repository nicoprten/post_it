
import AddPost from './AddPost';
// import Posts from './Posts';

export default function Home(){

    return(
        <div className='text-white font-rubik'>
            <h1 className='text-3xl p-4'>Home</h1>
            <AddPost />
            {/* <Posts /> */}
        </div>
    )
}