import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

export function LogoutBtn(props) {
    const dispatch = useDispatch()
    
    const logoutHandler = ()=> {
        authService.logout()
        .then(()=> {
            dispatch(logout())
        }).catch((error)=>{
            console.error('error on logout button:', error)
        })
    }    

    return <button onClick={logoutHandler} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
}
