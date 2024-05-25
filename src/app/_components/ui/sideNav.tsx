import { Dashboard, DashboardLanguage, DashboardProjects, DashboardStacks, Home } from '@/routes'
import React from 'react'

export default function SideNav() {
  return (
    <aside className='bg-white min-h-screen h-full  w-full'>
      <div className='grid gap-16 items-center justify-center'>
        <div>
          <Home.Link className='text-[2.5rem] font-bold text-slate-700'>O|B</Home.Link>
        </div>

      <ul className="grid gap-8">
        <li className="Dashboard__item">
          <Dashboard.Link  className="Dashboard__link  ">
            Dashboard
          </Dashboard.Link >
        </li>
        <li className="Dashboard__item">
          <DashboardProjects.Link  className="Dashboard__link">
            Projects
          </DashboardProjects.Link>
        </li>
        <li className="Dashboard__item">
          <DashboardLanguage.Link  className="Dashboard__link">
            Language
          </DashboardLanguage.Link>
        </li>
        <li className="Dashboard__item">
          <DashboardStacks.Link  className="Dashboard__link">
            Stacks
          </DashboardStacks.Link>
        </li>
        
        <li className="Dashboard__item">
          <span className="Dashboard__link">
            Logout
          </span>
        </li>
      </ul>
      </div>
    </aside>
  )
}
