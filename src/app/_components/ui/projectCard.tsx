import { Project } from '@prisma/client'
import React from 'react'

type Props = {
  item: any
}

export default function ProjectCard({ item }: Props) {
  const {  description, id, name, url,features,categoryId,github,status, stacks } = item
  return (
    <div className='grid relative bg-[rgba(0,0,0,1)] Project__summary overflow-hidden rounded-[10px] h-[250px] shadow-[0_0_10px_rgba(99,99,99,.5)] p-4 px-8'>
      <div>
        <p className='text-[1.8rem] font-semibold uppercase'>{name}</p>
        <p className='text-[1.4rem] font-medium'>{description.slice(0,250)}</p>
      </div>
      <div className="flex flex-wrap gap-6 items-center mt-auto">
        {stacks &&
          stacks.map((skill:any) => {
            return (
              <span key={skill.id} className="text-white text-[1.2rem] font-semibold uppercase p-1 px-4 rounded-[5px] shadow-[0_0_5px_rgba(225,225,225,.8)]">
                {skill.name}
              </span>
            );
          })}
      </div>
      <div className="Project__modal">
        <div>
          <p className='capitalize text-[1.8rem] font-medium'>features</p>
          <div className='grid grid-cols-2 gap-2 flex-wrap mt-3'>
          {
            features.map((feature:any)=>{
              return <span className='text-[1.3rem] font-medium' key={feature}>{feature}</span>
            })            
          }
          </div>
        </div>
       <div className='mt-auto grid grid-cols-2 justify-center items-center'>
       <a href={status === "NOAPP"? url : `/projects/${id}`} target={status === "NOAPP"?"_blank":"_self"} rel="noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#fff"
            className="bi bi-link-45deg"
            viewBox="0 0 16 16"
          >
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
          </svg>
        </a>
        <a href={github} target="_blank" rel="noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#fff"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
       </div>
      </div>
    </div>
  )
}
