import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import CREATE__LOGIN from "../libs/Mutations/CreateLogin";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const session = sessionStorage.getItem("key")
  const navigate = useNavigate()

  useEffect(()=>{
    if(session){
    return navigate("/")
    }
},[session])

const [login,{data}] = useMutation(CREATE__LOGIN)

  const onsubmit = (e) => {
    e.preventDefault()
    login({
      variables: {
        email:email,
        password:password
      },
    });
    setEmail("")
    setPassword("")
    
  };
  if(data?.login){
    sessionStorage.setItem("key",data?.login?.key)
    console.log(data);
    navigate("/dashboard")
  }
  return (
    <section className="Login__container">
      <form className="Login__Form" onSubmit={onsubmit}>
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="Dashboard__input"
          />
        </div>
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="Dashboard__input"
          />
        </div>
        <button type="submit" className="Dashboard__submit">
          save
        </button>
      </form>
    </section>
  );
}

export default Login;
