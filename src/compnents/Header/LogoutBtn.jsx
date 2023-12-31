import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

export function LogoutBtn(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = ()=> {
        authService.logout()
        .then(()=> {
            dispatch(logout());
            navigate('/login')
        }).catch((error)=>{
            console.error('error on logout button:', error)
        })
    }    

    return <button onClick={logoutHandler} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
}
