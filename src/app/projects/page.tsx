import React from 'react'
import ProjectCard from '../_components/ui/projectCard'

const projects = [
  {
    id: 23,
    author: "Oyekanmi",
    description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!",
    name: "eko360 react",
    language: ["react", "css", "bootstrap"],
    category: "react",
    url: "http://eko360-react.vercel.app/",
    Github: "https://github.com/oyekanm/Eko360-React",
  },
  {
    id: 14,
    author: "Oyekanmi",
    description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!",
    name: "fake review comment ",
    language: ["nextjs", "css"],
    category: "nextjs",
    url: "http://my-app-oyekanm.vercel.app/",
    Github: "https://github.com/oyekanm/my-app",
  },

]


export default function page() {
  return (
    <div className="Container">
      <section className='sm:grid grid-cols-3 gap-8'>
      {
        projects.map(project=>{
          return <ProjectCard item={project} />
        })
      }
      </section>
    </div>
  )
}
