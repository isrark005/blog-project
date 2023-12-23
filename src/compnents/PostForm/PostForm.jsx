import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import appwriteService from '../../appwrite/configure'
import { Input, Select, RTE, Button} from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function PostForm(post) {
    const {register, handleSubmit, watch, getValues, setValue, control} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async(data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if(file){
                await appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            const file =  await appwriteService.uploadFile(data.image[0])

            if (file) {
                const fileID = file.$id
                data.featuredImage = fileID
                const dbPost = await appwriteService.createPost({...data, author: userData.$id })

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const transformSlug = useCallback((value)=> {
        if(value && typeof value === 'string'){
            return value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        }
        return ''
    }, [])


    useEffect(() => {
        const subscription = watch((value, {name})=>{
            if(name === 'title'){
                setValue('slug', transformSlug(value.title, { shouldValidate: true }))
            }
        })


        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <>
            
        </>
    )
}
