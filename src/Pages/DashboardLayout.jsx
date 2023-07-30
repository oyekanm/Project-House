import React, { useEffect, useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import DashBoardNav from "../components/DashBoardNav";
import GetUser, { GET_User } from "../libs/Queries/GetUser";

function DashboardLayout() {
  const session = sessionStorage.getItem("key")
  
  // console.log(session);
  const navigate = useNavigate()
  // const user = GetUser(session)
 

  useEffect(()=>{
    if(!session){
    return navigate("/login")
    }
  },[session])

  // useEffect(()=>{
  //   if(session){
  //     if(!user?.data?.getUser._id){
  //       // console.log();
  //       return navigate("/")
  //     }
  //   }
    
  // },[session])
 

  return (
    <main className="Dashboard">
      <DashBoardNav />
      <main className="Outlet">
        <Outlet />
      </main>
    </main>
  );
}

export default DashboardLayout;
