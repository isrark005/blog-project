import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { Button, Container, Input } from '../compnents'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import appwriteService from '../appwrite/auth'


export function MyProfile() {

    const { userID } = useParams()
    const userInfo = useSelector(state => state.auth.userData)
    const fullName = userInfo.name.split(' ')
    const firstName = fullName[0]
    const {register, handleSubmit} = useForm()
    const [pfname, setPfName] = useState(userInfo.name)


    const nameChange = async(name) => {
      try {
        return await appwriteService.updateName(name.updateName)
        .then((updatedName)=>(
            setPfName(updatedName.name)
        ))
      } catch (error) {
        console.log(error);
      }

}

    return (
       <Container>
        <div className=' py-8'>
            <div className=' w-10/12 text-left'>
                <h1>Welcome, {pfname}</h1>
            </div>
            <div className=' w-10/12'>
            <form onSubmit={handleSubmit(nameChange)}>
                <Input 
                label="update name: "
                type="text"
                {...register("updateName", {required: true})}
                />
                <Button 
                bgColor='bg-green-600'
                textColor='#fff'
                type='submit'
                children={'change name'}
                className='w-full'
                />
            </form>
            </div>
        </div>
       </Container>
    )
}
