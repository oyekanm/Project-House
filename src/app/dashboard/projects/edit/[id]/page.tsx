"use client"

import { updateProject } from '@/actions/projectActions'
import ProjectCreateForm from '@/app/_components/reuseable/ProjectCreateForm'
import { FetchData } from '@/lib/fetchers/getDatas'
import React from 'react'

type Props = {
    params: { id: string }
}

export default function page({ params }: Props) {
    const { id } = params
    const { data } = FetchData(`/api/products?id=${id}`)

    console.log(data)

    return (
        <div className=''>
            <ProjectCreateForm data={data} editing mutate={updateProject} />
        </div>
    )
}
