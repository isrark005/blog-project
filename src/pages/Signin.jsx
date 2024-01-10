import React from 'react'
import { Login as LoginComponent} from '../compnents'
import { useDispatch } from 'react-redux'

export function Signin() {
    

    return (
       <div className=' py-8'>
        <LoginComponent />
       </div>
    )
}
