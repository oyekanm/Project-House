"use client"

import { deleteProject } from '@/actions/projectActions'
import DataTable from '@/app/_components/reuseable/dataTable'
import Toast from '@/app/_components/reuseable/toast'
import { Button } from '@/components/ui/button'
import { FetchData } from '@/lib/fetchers/getDatas'
import { projectSchema } from '@/lib/schemas/projectSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function ProjectDashboard() {
  const { data } = FetchData("/api/products")
  const route = useRouter()


  const editbtn = ({ id }: { id: string, name: string }) => {
    route.push(`projects/edit/${id}`)
  }

  const deleteBtn = async (id: string) => {
    const response = await deleteProject(id)


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
      <section className='grid gap-8'>
        <div className='flex justify-between items-center'>
          <p className='text-[2rem] font-bold text-white uppercase'>projects</p>
          <Button onClick={()=> route.push("projects/add-new")} className='h-16 text-[2rem] font-bold capitalize' variant={'ghost'}>add new project</Button>
        </div>

        <DataTable data={data} deleteBtn={deleteBtn} editBtn={editbtn} />
      </section>
    </div>
  )
}
