import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Input } from '../compnents'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'


export function MyProfile() {

    const { userID } = useParams()
    const userInfo = useSelector(state => state.auth.userData)
    const fullName = userInfo.name.split(' ')
    const firstName = fullName[0]
    return (
       <Container>
        <div className=' py-8'>
            <div className=' w-10/12 text-left'>
                <h1>Welcome, {firstName}</h1>
            </div>
            <div className=' w-10/12'>
                <Input 
                label="Reset password:"
                type="password"

                />
            </div>
        </div>
       </Container>
    )
}
