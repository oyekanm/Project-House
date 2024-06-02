import { Dashboard, DashboardLanguage, DashboardProjects, DashboardStacks } from '@/routes'

export default function SideNav() {
  return (
    <aside className='bg-white min-h-screen h-full  w-full p-4'>
      

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
            Category
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
    </aside>
  )
}
