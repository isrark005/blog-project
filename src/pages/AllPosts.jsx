import React, { useState, useEffect} from 'react'
import appwriteService from "../appwrite/configure"
import { Container, PostCard} from '../compnents'


export function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts)=> {
            if (posts) {
                setPosts(posts.documents)
            }

        }).catch((error)=>{
            console.error('Error fetching posts:', error);
        })
    }, [])
    return (
        <div className='py-8'>
            <Container>
            <div className='flex flex-wrap'>
                {posts && posts.map((post)=> (
                   <div key={post.$id} className='p-2 w-1/4'>
                   <PostCard {...post} />
               </div>
                ))}
                </div>
            </Container>
        </div>
    )
}
