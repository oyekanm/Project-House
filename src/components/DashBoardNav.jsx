import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function DashBoardNav() {
  const navigate = useNavigate()

  const click =()=>{
    sessionStorage.clear()
    navigate("/")
  }
  return (
    <aside>
      <ul className="Dashboard__nav">
        <li className="Dashboard__item">
          <NavLink to="/dashboard" className="Dashboard__link ">
            Dashboard
          </NavLink>
        </li>
        <li className="Dashboard__item">
          <NavLink to="/dashboard/category" className="Dashboard__link">
            Category
          </NavLink>
        </li>
        <li className="Dashboard__item">
          <NavLink to="/dashboard/language" className="Dashboard__link">
            Language
          </NavLink>
        </li>
        <li className="Dashboard__item">
          <span onClick={click} className="Dashboard__link">
            Logout
          </span>
        </li>
      </ul>
    </aside>
  );
}

export default DashBoardNav;
