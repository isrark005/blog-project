import React, {useState, useEffect} from 'react'
import {Container, PostCard} from '../compnents'
import appwriteService from '../appwrite/configure'

export function Home() {
    const [allPosts, setAllPosts] = useState(null)

    useEffect(() => {
        appwriteService.getPosts().then((posts)=> (
            setAllPosts(posts)
        ))
        .catch((error)=>{
            console.error('error while fetching posts: ', error)
        })
    }, [])


    return (
       <div className='py-8'>
       <Container>
        <h1>Welcome to my Blogging site</h1>
        <div className=' py-4'>
            {allPosts ? <div className=' flex flex-wrap w-10/12 mx-auto'>
                {allPosts.map((post)=> (
                    <div className=' w-4/12 m-3' key={post.$id}>
                        <PostCard post={post}/>
                    </div>
                ))}
            </div> : null}
        </div>
        </Container>
       </div>
    )
}
