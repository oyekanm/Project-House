import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Scroll from "../components/Scroll";

import { useQuery } from "@apollo/client";
import { GET_User } from "../libs/Queries/GetUser";

function SharedLayout({ scroll }) {
  const session = sessionStorage.getItem("key")
  const navigate = useNavigate()
  const user = useQuery(GET_User,{variables: { key:session },})
  

  // useEffect(()=>{
  //   if(session){
  //     if(!user?.data?.getUser._id){
  //       // console.log();
  //       return navigate("/")
  //     }
  //   }
    
  // },[session])
  return (
    <>
      <Navbar />
      <Outlet />
      <Scroll scroll={scroll} />
      <Footer />
    </>
  );
}

export default SharedLayout;
