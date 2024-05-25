"use client"

import React from 'react'
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

export default function page() {
  const labelClass = "font-semibold text-[2rem]"
  const inputClass = "resize-none rounded-[5px] text-gray-700 p-4 py-2 text-[1.8rem]  !focus-visible:outline-none"
  
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

  return (
    <section>
      <div className='flex items-center justify-between bg-white shadow-[0px_0px_5px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem] p-4 pb-8 px-8'>
        <Form {...form} >
          <form className="space-y-8 w-[50%]">
            <FormField
              // control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Category</FormLabel>
                  <FormControl>
                    <Input className={inputClass} placeholder={"create a category"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSubmitButton
              loading={false}
              // loading={form.formState.isSubmitting}
              text="Send" />
          </form>
        </Form>
      </div>
    </section>
  )
}
