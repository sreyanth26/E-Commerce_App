import React, { useContext } from 'react'
import axios from 'axios'
import Ct from './Ct.jsx'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const Login = () => {
  let [data,setData]=React.useState({"_id":"","pwd":""})
  let [msg,setMsg]=React.useState("")
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let fun=(e)=>{
    let {name,value}=e.target
    setData({...data,[name]:value})
  }
  let login=async()=>{
    try
    {
    let res=await axios.post("http://localhost:5000/login",data)
    if(res.data.token!=undefined)
    {
      Cookies.set("logininfo",JSON.stringify(res.data),{expires:2})
      obj.updstate(res.data)
      navigate("/")

    }
    else{
      
      setMsg(res.data.msg)
    }
  }
  catch(err){
    setMsg("Error in Login")
  }
  }
  return (
    <div className='form'>
      <h2 style={{"color":"red"}}>{msg}</h2>
      <input type="text" placeholder='Enter Email' name='_id' value={data._id} onChange={fun} />
      <input type="password" placeholder='Enter Password' name='pwd' value={data.pwd} onChange={fun} />
      <button onClick={login}>Login</button>
      <Link to="/resetpwd">Forgot Password?</Link>

    </div>
  )
}

export default Login