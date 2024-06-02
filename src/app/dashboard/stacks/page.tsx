"use client"

import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { FormSubmitButton } from '@/app/_components/reuseable/formSubmitButton'
import { useForm } from 'react-hook-form'
import { projectStackSchema } from '@/lib/schemas/projectSchema'
import { createStack, deleteStack, updateStack } from '@/actions/stackActions'
import Toast from '@/app/_components/reuseable/toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import DataTable from '@/app/_components/reuseable/dataTable'
import { FetchData } from '@/lib/fetchers/getDatas'

export default function Stacks() {
  const { data } = FetchData("/api/stack")
  const [editing, setEditing] = useState(false)
  const [stackId, setStackId] = useState("")
  const labelClass = "font-semibold text-[2rem] text-slate-700"
  const inputClass = "resize-none rounded-[5px] text-gray-700 p-4 py-2 text-[1.8rem]  !focus-visible:outline-none"
  
  const form = useForm<z.infer<typeof projectStackSchema>>({
    resolver: zodResolver(projectStackSchema),
    defaultValues: {
        name: "",
    },
})

const mutateStack = async (formdata: z.infer<typeof projectStackSchema>) => {
    const result = projectStackSchema.safeParse(formdata)
    // console.log(result)

    if (result.success) {
      if (editing) {
        const response = await updateStack(result.data, stackId)

        // console.log(response)

        // error handling
        if (response?.error) {
          Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
          return;
        }

        // data successfully recieved
        if (response?.data) {
          form.reset()
          setStackId("")
          setEditing(false)
          Toast({ title: "Operation success", description: `${response.data.name} created successfully!!`, className: "bg-green-500" })
        }
    }else{
      const response = await createStack(result.data)

      // console.log(response)

      // error handling
      if (response?.error) {
          Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
          return;
      }

      // data successfully recieved
      if (response?.data) {
          form.reset()
          Toast({ title: "Operation success", description: `${response.data.name} created successfully!!`, className:"bg-green-500" })
      }
    } 
    } else {
        console.log(result.error)
    }
}

const editbtn = (cate: { id: string, name: string }) => {
  setEditing(true)
  form.setValue("name", cate.name)
  setStackId(cate.id)
}

const deleteCate = async (id: string) => {
  const response = await deleteStack(id)


  // error handling
  if (response?.error) {
    Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
    return;
  }

  // data successfully recieved
  if (response?.data) {
    Toast({ title: "Operation success", description: `${response?.data.name} deleted successfully!!` })
  }
}

  return (
    <div>
      <section>
      <div className='flex items-center justify-between bg-white shadow-[0px_0px_5px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] p-8 pb-8 px-8'>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(mutateStack)} className="space-y-8 w-[50%]">
            <FormField
              // control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Stack</FormLabel>
                  <FormControl>
                    <Input className={inputClass} placeholder={"create a stack"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSubmitButton
              // loading={false}
              loading={form.formState.isSubmitting}
              text="Send" />
          </form>
        </Form>
      </div>
    </section>
    <section className='mt-[50px] grid gap-8'>
        <div>
          <p className='text-[2rem] font-bold text-white uppercase'>stacks</p>
        </div>
       
        <DataTable data={data} deleteBtn={deleteCate} editBtn={editbtn} />
      </section>
    </div>
  )
}
