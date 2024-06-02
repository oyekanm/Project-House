"use client"

import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { projectInputs } from '../inputs/projectInputs'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogClose, } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Dropdown from './dropdown'
import { Switch } from '@/components/ui/switch'
import { projectSchema } from '@/lib/schemas/projectSchema'
import { X } from 'lucide-react'
import { FetchData } from '@/lib/fetchers/getDatas'
import { getApiStack } from '@/routes'
import { Checkbox } from '@/components/ui/checkbox'
import { FormSubmitButton } from './formSubmitButton'
import Toast from './toast'
import UploadImage from './uploadImage'
import UploadVideo from './uploadVideo'
import { CreateImage, CreateVideo } from '@/actions/imageActions'
import { createApplication } from '@/actions/projectActions'


type Props = {
    mutate: any;
    data?:any;
    editing?: boolean
}




export default function ProjectCreateForm({ mutate, data, editing }: Props) {
    const { data: category } = FetchData("/api/category")
    const { data: Stacks, error, isLoading } = FetchData("/api/stack")
    const [features, setFeatures] = useState([""])
    const [stacks, setStacks] = useState<string[]>([])
    const [categoryId, setCategoryId] = useState("")
    const [appUrl, setAppUrl] = useState("")
    const [open, setOpen] = useState(false)
    const [openVideo, setOpenVideo] = useState(false)
    const [app, setApp] = useState(false)
    const labelClass = "font-semibold text-[2rem] text-slate-700"
    const inputClass = "resize-none border-2 p-4 rounded-[5px] text-[1.8rem] text-gray-700 !focus-visible:outline-none"
    // form initialization
    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            url: "",
            features: [],
            github: "",
            stacks: [],
            application: undefined,
            status: "NOAPP"
        },


    })

    console.log(form.getValues())

    useEffect(() => {
        if (data) {
            const { categoryId, description, features, github, name, stacks, status, url, application } = data
            const filteredStacks = stacks.map((s:any) => s.id)
            form.setValue('url', url)
            form.setValue('status', status)
            form.setValue('name', name)
            form.setValue('stacks', filteredStacks)
            form.setValue('description', description)
            form.setValue('features', features)
            form.setValue('github', github)
            form.setValue('categoryId', categoryId)
            form.setValue('application', application)
            setFeatures(features)
            setStacks(filteredStacks)
            setCategoryId(categoryId)
            if (status === 'APP') {
                setApp(true)
            }
        }
    }, [data])

    const addFeature = () => {
        setFeatures((prev: any) => {
            return [...prev, ""]
        })
    }

    console.log(form.getValues())

    const onChange = (bool: boolean) => {
        setApp(bool)
        // console.log(bool)
        if (bool) {
            form.setValue("status", "APP")
        } else {
            form.setValue("status", "NOAPP")
        }

    }

    const onchangeText = (e: any, index: number) => {
        // console.log(e.target.value, index)
        const newFeatures = [...features];
        newFeatures[index] = e.target.value;

        // set features value on the form
        form.setValue("features", newFeatures)

        // console.log(newFeatures, newFeatures[index])

        setFeatures(newFeatures)
    }

    const deleteInput = (i: number) => {
        const newFeatures = features.filter((feat, index) => index !== i)

        // set features value on the form
        form.setValue("features", newFeatures)

        setFeatures(newFeatures)
    }

    const setCategoryIds = (id: string) => {
        form.setValue("categoryId", id)
        // console.log(id, "id")
        setCategoryId(id)
    }

    const onChecked = (bool: boolean | string, id: string) => {
        console.log(bool, id)
        if (bool) {
            const newStack = [...stacks, id]
            setStacks(newStack)
            form.setValue("stacks", newStack)
        } else {
            const newStack = stacks.filter(stack => stack !== id)
            setStacks(newStack)
            form.setValue("stacks", newStack)
        }
    }

    const handleSubmit = async (values: z.infer<typeof projectSchema>) => {
        console.log({ values });
        const result = projectSchema.safeParse(values)

        console.log(result)
        if (result.success) {
            if (editing) {
                const response = await mutate(result.data, data!?.id)


                // error handling
                if (response?.error) {
                    Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
                    return;
                }

                // data successfully recieved
                if (response?.data) {
                    form.reset()
                    setFeatures([])
                    setStacks([])
                    setCategoryId("")
                    Toast({ title: "Operation success", description: `${response.data.name} was updated successfully!!`, className: "bg-green-500" })
                }
            } else {
                const response = await mutate(result.data)


                // error handling
                if (response?.error) {
                    Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
                    return;
                }

                // data successfully recieved
                if (response?.data) {
                    await createApplication(result.data,response?.data.id)
                    form.reset()
                    setFeatures([])
                    setStacks([])
                    setCategoryId("")
                    Toast({ title: "Operation success", description: `${response.data.name} created successfully!!`, className: "bg-green-500" })
                }
            }
        } else {
            console.log(result.error)
        }
    };

    const createImage = async (imageData: any) => {
        const response = await CreateImage(imageData)

        // error handling
        if (response?.error) {
            Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
            return;
        }

        // data successfully recieved
        if (response?.data) {
            const data = response.data
            console.log(data,"data")
            form.setValue("application.image", data)
            Toast({ title: "Operation success", description: `Image created Successfully`, className: "bg-green-500" })
        }
    }
    const createVideo = async (imageData: any) => {
        const response = await CreateVideo(imageData)

        // error handling
        if (response?.error) {
            Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
            return;
        }

        // data successfully recieved
        if (response?.data) {
            const data = response.data
            Toast({ title: "Operation success", description: `Image created Successfully`, className: "bg-green-500" })
        }
    }

    const changeUrl = (e: any,) => {
        setAppUrl(e.target.value)
        form.setValue("application.url", e.target.value)
    }

    return (
        <div className='bg-white  shadow-[0px_0px_5px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] p-8'>
            <Form {...form}>
                <form
                    // action={mutateMenu} 
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8 grid  gap-12">
                    <div className="space-y-8 grid grid-cols-2 gap-12">
                        <div className='grid gap-8 max-h-fit h-fit'>
                            {
                                projectInputs.map(menu => {
                                    return <>
                                        {
                                            menu.name === "description" ?
                                                <FormField
                                                    key={menu.id}
                                                    // control={form.control}
                                                    name={menu.name}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={labelClass} >{menu.label}</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder={menu.placeholder} rows={5} {...field} className={inputClass} />
                                                                {/* <Input type={menu.type} placeholder={menu.placeholder} {...field} /> */}
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                /> :
                                                <FormField
                                                    key={menu.id}
                                                    // control={form.control}
                                                    name={menu.name}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={labelClass}>{menu.label}</FormLabel>
                                                            <FormControl>
                                                                <Input className={inputClass} type={menu.type} placeholder={menu.placeholder} {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                        }
                                    </>
                                })
                            }
                            <div className="flex items-center space-x-2">
                                <Switch checked={app} onCheckedChange={onChange} id="airplane-mode" />
                                <FormLabel className={`${labelClass} cursor-pointer`} htmlFor="airplane-mode">Mobile Application</FormLabel>
                            </div>
                        </div>
                        <div className='pt-4 grid gap-4 max-h-fit h-fit'>
                            <div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className='text-[1.8rem] font-bold text-slate-700 p-6'>Choose your Stacks for this Project </Button>
                                    </DialogTrigger>
                                    <DialogContent className='h-[70%] max-w-[800px]'>
                                        <DialogDescription className='row-span-1'>
                                            <p className='text-[1.9rem] text-slate-700 '>
                                                Choose your prefferred stacks
                                            </p>
                                        </DialogDescription>
                                        <div className={`grid row-span-10 overflow-y-auto grid-cols-2 justify-start w-full !mt-[1rem]`}>
                                            {Stacks?.map((stack: { id: string, name: string }) => {
                                                return <div key={stack.id} className='flex items-center gap-4'>
                                                    <Checkbox id={stack.id} className='h-8 w-8 rounded-[5px] border-2' checked={stacks.includes(stack.id)} onCheckedChange={(bool) => onChecked(bool, stack.id)} />
                                                    <FormLabel htmlFor={stack.id} className='text-[1.8rem] capitalize font-medium text-slate-700 p-2'>{stack.name}</FormLabel>
                                                </div>
                                            })}

                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className='sm:w-1/2'>
                                <p className={labelClass}>Category</p>
                                <Dropdown
                                    btnTitle='pick a category'
                                    emptyText='There are no categories at the moment'
                                    data={category}
                                    setFunction={setCategoryIds}
                                    defaultValue={categoryId}
                                />
                            </div>
                            <div>
                                <p className={labelClass}>Add Project features</p>
                                <div className='grid gap-8'>
                                    {features.map((feat, index) => {
                                        return (
                                            <div key={index} className='flex gap-8 items-center'>
                                                <FormControl className='flex-5'>
                                                    <Input className={inputClass} type={"text"} value={feat} onChange={(e) => onchangeText(e, index)} placeholder={"add a feature..."} />
                                                </FormControl>
                                                <Button onClick={() => deleteInput(index)} className='flex-1 p-4 py-6' variant={'ghost'}><X className='h-12 w-12 ' color='black' /></Button>
                                            </div>)
                                    })}
                                    <Button type='button' onClick={addFeature} className='sm:w-[50%] text-[1.8rem] font-bold text-slate-700 p-6' variant="outline">Add more feature </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {app &&
                            <>
                                <div className='grid grid-cols-5 gap-8'>
                                    <FormControl className='col-span-3'>
                                        <Input className={inputClass} type={"text"} value={appUrl} onChange={(e) => changeUrl(e)} placeholder={"add app url"} />
                                    </FormControl>
                                    <Button type='button' onClick={() => setOpen(true)} className='text-[1.8rem] font-bold p-12'>Upload Images</Button>
                                    <Button type='button' onClick={() => setOpenVideo(true)} className='text-[1.8rem] font-bold p-12'>Upload Video</Button>
                                </div>
                                <UploadImage open={open} setOpen={setOpen} fileUpload={createImage} />
                                <UploadVideo open={openVideo} setOpen={setOpenVideo} fileUpload={createVideo} />
                            </>
                        }

                    </div>
                    <div className='w-[70%] mx-auto'>
                        <FormSubmitButton className='w-full' loading={form.formState.isSubmitting} text="Send" />
                    </div>
                </form>
            </Form>
        </div>
    )
}


