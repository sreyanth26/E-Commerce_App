const um = require("../models/usermodel")
const cm = require("../models/cartmodels")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const nodemailer = require("nodemailer");

let adduser=async(req,res)=>{
    try{
        let data=await um.findById(req.body._id)
        if(data)
        {
            res.json({"msg":"With given email acc exists"})
        }
        else{

            let pwdhash=await bcrypt.hash(req.body.pwd,10)
            let user=new um({...req.body,"pwd":pwdhash})
            await user.save()
            res.json({"msg":"acc reated"})
        }

    }
    catch{
        res.json({"err":"Error in Registration"})
    }
}

let login=async(req,res)=>{
    try{
        let data=await um.findById(req.body._id)
        if(data)
        {
            let f=await bcrypt.compare(req.body.pwd,data.pwd)
            if(f)
            {
                let x=await cm.find({uid:data._id})
                 let count=x.length
                res.json({"token":jwt.sign({"_id":data._id,"role":data.role},"12345"),"uid":data._id,"name":data.name,"role":data.role,"count":count})
            }
            else{
                 res.json({"msg":"check pwd"})

            }

        }
        else{
            res.json({"msg":"check email"})
        }

    }
     catch{
        res.json({"err":"Error in Login"})
    }
}



// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: "sreyanth5941@gmail.com",
    pass: "amtbgdpmuaipxihv",
  },
});

let sendotp=async(req,res)=>{
    try{
    let obj=await um.findById(req.params.eid)
    if(obj)
    {
    let otp=Math.floor(1000 + Math.random() * 9000);
    await um.findByIdAndUpdate(req.params.eid,{"otp":otp})
    let info = await transporter.sendMail({
        from: '"support team" <sreyanth5941@gmail.com>',
        to: req.params.eid,
        subject: "OTP for Password Reset",
        text: `Your OTP for password reset is: ${otp}`
     })
      // Plain-text version of the message
      if(info.accepted.length>0)
      {
    res.json({"msg":"OTP sent"})
      }
      else{
        res.json({"msg":"Error in sending OTP"})
      }

    }
    else{
        res.json({"msg":"No account with given email"})
    }   
}
catch{
    res.json({"err":"Error in sending OTP"})
}
}
let resetpwd=async(req,res)=>{
    try{
        let obj=await um.findById(req.body.eid)
        if(obj)
        {
            if(obj.otp==req.body.otp)
            {
                let pwdhash=await bcrypt.hash(req.body.pwd,10)
                await um.findByIdAndUpdate(req.body.eid,{"pwd":pwdhash,"otp":""})
                res.json({"msg":"Password reset"})
            }  
            else{
                res.json({"msg":"Invalid OTP"})
            }
        }
        else{
            res.json({"msg":"No account with given email"})
        }
    }
    catch{
        res.json({"err":"Error in resetting password"})
    }   
}  

let isLoggedIn=(req,res,next)=>{
    try{
        let token=req.headers.authorization
        if(token)
        {
        jwt.verify(token,"12345")
        next()
        }
        else{
            res.json({"msg":"Please login"})
        }
    }
    catch{
        res.json({"msg":"Please login"})
    }
}

/*let isAdmin=async(req,res,next)=>{
    try{
        let uid=req.headers.uid
        let data=await um.findById(uid)
        if(data.role=="admin")
        {
            next()
        }
        else{
            res.json({"msg":"Admins only"})
        }
    }
    catch{
        res.json({"msg":"Please login"})
    }

}*/

let isAdmin=(req,res,next)=>{
    try{
    let token=req.headers.authorization
    if(token)
    {
    let data=jwt.verify(token,"12345")  
    if(data.role=="admin")
    {
        next()
    }
    else{
        res.json({"msg":"Admins only"})
    }
    }
    else{
        res.json({"msg":"Please login"})
    }   
}
catch{
    res.json({"msg":"Please login"})
}
}



module.exports={login,adduser,sendotp,resetpwd,isLoggedIn,isAdmin}