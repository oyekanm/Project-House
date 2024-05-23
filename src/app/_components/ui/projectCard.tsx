import React from 'react'

type Props ={
    item:{
        id: number;
        author: string;
        description: string;
        name: string;
        language: string[];
        category: string;
        url: string;
        Github: string;
    }
}

export default function ProjectCard({item}:Props) {
  const {Github,author,category,description,id,language,name,url} = item
  return (
    <div className='rounded-[10px] shadow-[0_0_10px_rgba(99,99,99,.5)] p-4'>
      <p>{name}</p>
      <p>{description}</p>
      <p>{category}</p>
    </div>
  )
}
