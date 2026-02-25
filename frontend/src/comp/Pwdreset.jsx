import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Pwdreset = () => {
    let [eid,setEid]=React.useState("")
    let [f,setF]=React.useState(true)
    let [f1,setF1]=React.useState(false)
    let [otp,setOtp]=React.useState("")
    let [pwd,setPwd]=React.useState("")
    let naigate=useNavigate()
    let resetpwd=()=>{
        axios.post("http://localhost:5000/resetpwd",{eid,otp,pwd}).then((res)=>{
            alert(res.data.msg)
            if(res.data.msg=="Password reset")
            {
                naigate("/login")
            }
        })
    }
    let sendotp=()=>{
        setF(false)
        axios.get(`http://localhost:5000/sendotp/${eid}`).then((res)=>{
            alert(res.data.msg)
            if(res.data.msg=="OTP sent")
            {
                setF1(true)
                   setTimeout(()=>{
                setF(true)
            },100000)
            }
            else{
                setF(true)
            }   
         
        })
    }

  return (
    <div className='form'>
        <input type="text" placeholder='Enter your registered email' onChange={(e)=>setEid(e.target.value)}  readOnly={f1}/>
       {f&& <button onClick={sendotp}>send otp</button>}
       {f1&& <div>
         <input type="text" placeholder='Enter OTP' onChange={(e)=>setOtp(e.target.value)} />
            <input type="password" placeholder='Enter new password' onChange={(e)=>setPwd(e.target.value)} />
            <button onClick={resetpwd}>Reset Password</button>

       </div>}
    </div>
  )
}

export default Pwdreset