import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import appwriteService from '../../appwrite/configure'
import { Input, Select, RTE, Button} from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function PostForm({post}) {

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const {register, handleSubmit, watch, getValues, setValue, control} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
            authorName: post?.authorName || userData.name
        }
    })


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
                console.log(file);
                const fileID = file.$id
                data.featuredImage = fileID
                const dbPost = await appwriteService.createPost({...data, author: userData.$id, authorName: userData.name })

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const transformSlug = useCallback((value)=> {
        if(value && typeof value === 'string') return value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        
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
    }, [watch, transformSlug, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", transformSlug(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && 
                <div className="w-full mb-4">
                  <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    /> 
                </div>
                    }
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />

            <Input 
            label={post ? 'Updating as: ' : 'Posting as: '}
            value={userData.name}
            readonly
            className='text-left mb-4'
            {...register("authorName", {required: true})}
            />    
            <Button type="submit" bgColor={post ? "bg-green-500" : " text-white bg-blue-400"} className="w-full ">
                {post ? "Update" : "Publish"}
            </Button>
        </div>
    </form>
    )
}
