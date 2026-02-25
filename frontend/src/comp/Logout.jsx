import { use, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"    
import Cookies from "js-cookie"
import Ct from "./Ct.jsx"

const Logout = () => {
  let navigate=useNavigate()
  let obj=useContext(Ct)
  useEffect(()=>{
   Cookies.remove("logininfo")
   obj.updstate({"token":"",uid:"","name":"","role":""})

    navigate("/login")
  },[])
    

  return (
    <div>Logout</div>
  )
}

export default Logout