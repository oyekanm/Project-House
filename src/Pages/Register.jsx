import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import CREATE__USER from "../libs/Mutations/CreateUser";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const session = sessionStorage.getItem("key")
  const navigate = useNavigate()

  useEffect(()=>{
    if(session){
    return navigate("/")
    }
},[session])

  const [signUp,{data}] = useMutation(CREATE__USER)

  const onsubmit = (e) => {
    e.preventDefault()
    signUp({
      variables: {
        name: name,
        email:email,
        password:password
      },
    });
    setName("")
    setEmail("")
    setPassword("")
    
  };
  if(data?.SignUp){
    sessionStorage.setItem("key",data?.SignUp.key)
    // console.log(data.SignUp.key);
    navigate("/dashboard")
  }

  return (
    <section className="Login__container">
      <form className="Login__Form" onSubmit={onsubmit}>
        <div className="Dashboard__form--group">
          <label className="Dashboard__label">name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="Dashboard__input"
          />
        </div>
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

export default Register;
