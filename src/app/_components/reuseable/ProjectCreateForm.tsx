"use client"

import React, { useState } from 'react'
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



export default function ProjectCreateForm() {
    const [features, setFeatures] = useState([])
    const [open, setOpen] = useState(false)
    const labelClass = "font-semibold text-[2rem]"
    const inputClass = "resize-none border-2 p-4 rounded-[5px] text-[1.8rem] text-gray-700 !focus-visible:outline-none"
    // form initialization
    const form = useForm({
        // resolver: zodResolver(),
        // defaultValues: {
        //     name: "",
        //     price: 0,
        //     description: "",
        //     categoryId: "",
        //     menuImageId: "",
        //     resturantId: "clw281od90001jtop932t2w45"
        // },
    })

    const addFeature = ()=>{
        setFeatures((prev)=>{
            return [...prev, {id:1+1,value:""}]
        })
    }

    console.log(features)

    return (
        <div className='bg-white  shadow-[0px_0px_5px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem] p-8'>
            <Form {...form}>
                <form
                    // action={mutateMenu} 
                    // onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8 grid grid-cols-2 gap-12">
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
                    </div>
                    <div>
                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Choose yuor Stacks for this Project </Button>
                                </DialogTrigger>
                                <DialogContent className='h-[60%] max-w-[600px]'>
                                    <DialogHeader className='text-left'>
                                        <DialogTitle className='text-[2rem]'>Upload your image</DialogTitle>
                                        <DialogDescription className='text-[1.6rem]'>
                                            Upload your image
                                        </DialogDescription>
                                        <div className={`flex justify-start w-full h-[50%] !mt-[2rem]`}>

                                        </div>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className='sm:w-1/2'>
                            <p className={labelClass}>Category</p>
                            <Dropdown
                                btnTitle='pick a category'
                                emptyText='There are no categories at the moment'
                                data={undefined}
                                setFunction={() => ""}
                                defaultValue={"collectionId"}
                            />
                        </div>
                        <div>
                            <p className={labelClass}>Add Project features</p>
                            <div className='grid gap-8'>
                                {features.map((feat, index) => {
                                    return <FormControl>
                                        <Input className={inputClass} type={"text"}  value={feat} placeholder={"add a feature..."} />
                                    </FormControl>
                                })}
                                    <Button type='button' onClick={addFeature} className='sm:w-[30%]' variant="outline">Add more feature </Button>
                            </div>
                        </div>
                    </div>

                    {/* <FormSubmitButton loading={form.formState.isSubmitting} text="Send" /> */}
                </form>
            </Form>
        </div>
    )
}
