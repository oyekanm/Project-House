import { createProject } from '@/actions/projectActions'
import ProjectCreateForm from '@/app/_components/reuseable/ProjectCreateForm'
import React from 'react'

export default async function page() {
  
  return (
    <div className=''>
      <ProjectCreateForm mutate={createProject}/>
    </div>
  )
}
