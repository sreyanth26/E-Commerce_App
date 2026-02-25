let multer=require("multer")
let pm=require("../models/prodmodel")
let {v4:uuidv4}=require("uuid")
let fs=require("fs")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './prodimgs')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
  }
})

const upload = multer({ storage: storage })
let addprod=async(req,res)=>{
  try{
   
    let prod=new pm({...req.body,img:req.file.filename,"_id":uuidv4()})   
    await prod.save()
    res.status(201).json({"msg":"Product Added"})
  }
  catch(err){
    res.status(500).json({"err":"error in adding product"})
  }

  
  
}
let getprods=async(req,res)=>{
  try{
    let prods=await pm.find() 
    res.status(200).json(prods)
  }   
  catch(err){
    res.status(500).json({"err":"error in getting products"})
  }
}
let getprodbyid=async(req,res)=>{
  try{
    let prod=await pm.findById(req.params.id)
    let data=await pm.aggregate([
      {$match:{"_id":req.params.id}},
      {$unwind:"$comm"},  
      {$group:{
        "_id":"$_id",
        "avgrt":{$avg:"$comm.rt"}
      }}
    ])
    res.status(200).json({...prod._doc,"avgrt":data.length>0?data[0].avgrt:0})
  } 
  catch(err){
    res.status(500).json({"err":"error in getting product by id"})
  }
}
let getprodbycat=async(req,res)=>{
  try{
    let prods=await pm.find({"cat":req.params.cat})
    res.status(200).json(prods)
  } 
  catch(err){
    res.status(500).json({"err":"error in getting product by category"})
  } 
}
let searchprod=async(req,res)=>{
  try{
    let prods=await pm.find({"title":new RegExp(req.params.title,"i")})
    res.status(200).json(prods)
  }
  catch(err){
    res.status(500).json({"err":"error in searching product"})
  }
}
let updateprod=async(req,res)=>{
  try{
    await pm.findByIdAndUpdate({"_id":req.body._id},req.body)  
    res.status(200).json({"msg":"Product detailes Updated"})
  }
  catch(err){
    res.status(500).json({"err":"error in updating product"})
  } 
}
let updateprodimg=async(req,res)=>{
  try{
    let data=await pm.findByIdAndUpdate({"_id":req.body._id},{"img":req.file.filename})
    fs.rm(`./prodimgs/${data.img}`,()=>{})

    res.status(200).json({"msg":"Product Image Updated"})
  } 
  catch(err){
    res.status(500).json({"err":"error in updating product image"})
  }
}
let deleteprod=async(req,res)=>{
  try{
    let data=await pm.findByIdAndDelete({"_id":req.params.id})  
    fs.rm(`./prodimgs/${data.img}`,()=>{})
    res.status(200).json({"msg":"Product Deleted"})
  }
  catch(err){
    res.status(500).json({"err":"error in deleting product"})
  }
}

let addrev=async(req,res)=>{
  try{
    await pm.findByIdAndUpdate({"_id":req.body.pid},{$push:{"comm":{"text":req.body.text,"rt":req.body.rt}}})
    res.status(200).json({"msg":"Review Added"})
  } 
  catch(err){
    res.status(500).json({"err":"error in adding review"})
  }
}
module.exports={addprod,upload,getprods,getprodbyid,getprodbycat,searchprod,updateprod,updateprodimg,deleteprod,addrev}