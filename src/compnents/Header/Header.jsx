import React, { useEffect, useState } from 'react'
import {LogoutBtn, Logo, Container} from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import authService from '../../appwrite/auth'

export function Header() {
   
    const authStatus = useSelector((state)=> state.auth.status)
  
    
    const navigate = useNavigate()
 

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/create-account",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/blogs",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]


    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Logo width='120px'/>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item)=> 
                        item.active ? <li key={item.slug}>
                            <button 
                            onClick={()=> navigate(item.slug)}
                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                            >{item.name}</button>
                        </li> : null
                        )}
                        {authStatus && ( 
                           <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav> 
            </Container>
        </header>
    )
}
