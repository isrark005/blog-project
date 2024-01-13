import React, {useState, useEffect} from 'react'
import {Button, Container, PostCard} from '../compnents'
import appwriteService from '../appwrite/configure'
import headerImage from '../assets/blog-header.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function Home() {
    const [posts, setPosts] = useState([])
    const userData = useSelector(state => state.auth.userData)
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
//   console.log(posts);
    // if (posts.length === 0) {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full">
    //                         <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             Login to read posts
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }
    // return (
    //     <div className='w-full py-8'>
    //         <Container>
    //             <div className='flex flex-wrap'>
    //                 {posts.map((post) => (
    //                     <div key={post.$id} className='p-2 w-1/4'>
    //                         <PostCard {...post} />
    //                     </div>
    //                 ))}
    //             </div>
    //         </Container>
    //     </div>
    // )

    return (
        <div className='w-full '>
            <Container>
                <section className='Header flex text-left items-center gap-10'>
                    <div className='header-left h-full w-6/12 py-10'>
                        <h1 className='text-black text-5xl font-bold'>Lorem ipsum dolor sit amet</h1>
                        <p className='py-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum magnam natus fugit quasi vero mollitia totam quae illum culpa? Laboriosam.</p>
                        <Link to={userData ? '/blogs': '/create-account'}><Button 
                        className=' bg-transparent border-2 rounder-lg'
                        children={userData ? 'All posts' : 'Signup'} /></Link>
                    </div>
                    <div className='header-right w-6/12 py-10 justify-end '>
                    <img src={headerImage} alt="" className='float-right'/>

                    </div>
                    
                </section>
                <section className='py-10'>
                    {userData && <div className='w-full py-8'>
             <Container>
                         <div className='flex flex-wrap'>
                             {posts.map((post) => (
                                 <div key={post.$id} className='p-2 w-1/4'>
                                     <PostCard {...post} />
                                 </div>
                             ))}
                         </div>
                        </Container>
                 </div>}
                </section>
            </Container>
        </div>
    )
}
