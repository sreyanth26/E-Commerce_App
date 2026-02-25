import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Reg = () => {
  let [data,setData]=useState({"name":"","_id":"","pwd":"","phno":""})
 let [msg,setMsg]=useState("")
 let navigate=useNavigate()
  let fun=(e)=>{
    let {name,value}=e.target
    setData({...data,[name]:value})
  }
  let reg=async()=>{
    try{
      let res=await axios.post("http://localhost:5000/reg",data)
      if(res.data.msg=="acc reated")
      {
        navigate("/login")
      }
      else{
      setMsg(res.data.msg)   
      }
     }
      catch(err){
        setMsg("Error in Registration")
      }
  }


  return (
    <div className='form'>
      <h2 style={{"color":"orangered"}}>{msg}</h2>
      <input type="text" placeholder='Enter Name' name='name' onChange={fun} value={data.name} />
      <input type="text" placeholder='Enter Email' name='_id' onChange={fun} value={data._id} />
      <input type="password" placeholder='Enter Password' name='pwd' onChange={fun} value={data.pwd} />
      <input type="text" placeholder='Enter Phone' name='phno' onChange={fun} value={data.phno} />
      <button onClick={reg}>Register</button>
    </div>
  )
}

export default Reg