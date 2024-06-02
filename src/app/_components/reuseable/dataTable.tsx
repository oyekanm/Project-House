import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'


type Props = {
    data:{ id: string, name: string }[],
    editBtn:any,
    deleteBtn:any
}

export default function DataTable({data,deleteBtn,editBtn}:Props) {
  return (
    <div className='grid gap-8 bg-white shadow-[0px_0px_5px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] p-8 pb-8 px-8'>
          {data?.map((cate: { id: string, name: string }) => {
            return (
              <div key={cate.id} className='flex items-center justify-between'>
                <p className='text-[1.6rem] font-medium text-slate-700 capitalize'>{cate.name}</p>
                <Popover>
                  <PopoverTrigger>
                    <span><MoreHorizontal className='h-12 w-12' color='black' /> </span>
                  </PopoverTrigger>
                  <PopoverContent className='grid gap-4 p-4' >
                    <Button onClick={() => editBtn(cate)} variant={'ghost'} className='text-[1.6rem] font-semibold text-slate-700 w-full'>Edit</Button>
                    <Button onClick={() => deleteBtn(cate.id)} variant={'destructive'} className='text-[1.6rem] font-semibold text-slate-700 w-full'>Delete</Button>
                  </PopoverContent>
                </Popover>
              </div>
            )
          })}
        </div>
  )
}
