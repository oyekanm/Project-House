"use client"

import { Blog, Dashboard, Home, Projects } from "@/routes";
import React, { useEffect, useState } from "react";


function Navbar() {
  const [show, setShow] = useState(false);
  const session = sessionStorage.getItem("key")
  const navigate:any = ""
  const user:any = "useQuery(GET_User,{variables: { key:session },})"

  const link = "text-[4rem] font-semibold text-slate-800 text-center "
 

  return (
    <nav className="Nav Container py-12">
      <Home.Link  className="text-[2.5rem] font-bold">
        O|B
      </Home.Link>
      <div
        className={show ? "Navigation show" : "Navigation"}
        onClick={() => setShow(!show)}
      >
        <div className="Nav__button"></div>
        <div className="Nav__button"></div>
        <div className="Nav__button"></div>
      </div>
      <div className={show ? "navbar activ" : "navbar"}>
        <ul className="grid gap-12 items-center justify-center text-center">
          <li className="Nav__item" onClick={() => setShow(false)}>
            <Home.Link className={link}>
              Oyekanmi
            </Home.Link>
          </li>
          <li className="Nav__item" onClick={() => setShow(false)}>
            <Projects.Link  className={link}>
              Projects
            </Projects.Link>
          </li>
          <li className="Nav__item" onClick={() => setShow(false)}>
            <Blog.Link  className={link}>
              Blog
            </Blog.Link>
          </li>
          <li className="Nav__item" onClick={() => setShow(false)}>
          <Dashboard.Link className={link}>
             Dashboard
            </Dashboard.Link>
          </li>
         {user?.data?.getUser._id && <li className="Nav__item" onClick={() => setShow(false)}>
            <Dashboard.Link className={link}>
             Dashboard
            </Dashboard.Link>
          </li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
