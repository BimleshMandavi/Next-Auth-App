"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SignUppage = () => {
  const [user,setUser] = useState({
    username:"",
    email:"",
    password:""
  })

  const [disable,setDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const signup = async()=>{
    try {
      setLoading(true)
     const response =  await axios.post("api/users/signup",user)
     console.log("signup success",response.data);
     if(response.data.success){
      router.push("/login")
     }
     setLoading(false)
     
    } catch (error:any) {
      console.log("error",error);
      
    }
  }
  useEffect(()=>{
    if(user.username.length > 0 && user.email.length >0 && user.password.length > 0){
      setDisable(false)
    }else{
      setDisable(true)
    }
  },[user])

  return (
    <div>
      {loading ? "Loading..." : "Signup"}

      
    </div>
  )
}

export default SignUppage
