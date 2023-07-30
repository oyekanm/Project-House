import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { GET_User } from "../libs/Queries/GetUser";
import { useQuery } from "@apollo/client";

function Navbar() {
  const [show, setShow] = useState(false);
  const session = sessionStorage.getItem("key")
  const navigate = useNavigate()
  const user = useQuery(GET_User,{variables: { key:session },})
 

  return (
    <nav className="Nav container">
      <NavLink to="/" className="Nav__name">
        O|B
      </NavLink>
      <div
        className={show ? "Navigation show" : "Navigation"}
        onClick={() => setShow(!show)}
      >
        <div className="Nav__button"></div>
        <div className="Nav__button"></div>
        <div className="Nav__button"></div>
      </div>
      <div className={show ? "navbar activ" : "navbar"}>
        <ul className="navbar-nav">
          <li className="Nav__item" onClick={() => setShow(false)}>
            <NavLink to="/" className="Nav__link ">
              Oyekanmi
            </NavLink>
          </li>
          <li className="Nav__item" onClick={() => setShow(false)}>
            <NavLink to="/projects" className="Nav__link">
              Projects
            </NavLink>
          </li>
         {user?.data?.getUser._id && <li className="Nav__item" onClick={() => setShow(false)}>
            <NavLink to="/dashboard" className="Nav__link">
             Dashboard
            </NavLink>
          </li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
