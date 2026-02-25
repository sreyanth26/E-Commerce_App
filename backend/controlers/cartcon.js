let cm=require("../models/cartmodels")
let {v4:uuidv4}=require("uuid")
let addcart=async(req,res)=>{
    try{
        let data=await cm.find({"uid":req.body.uid,"pid":req.body.pid})
        if(data.length==0){
            let cdata=new cm({...req.body,"_id":uuidv4(),"qty":1})
            await cdata.save()
            let x=await cm.find({"uid":req.body.uid})
             let count=x.length
            res.status(201).json({"msg":"Item added to cart","count":count })
          
        }
        else{
            await cm.findByIdAndUpdate(data[0]._id,{$inc:{"qty":1}})
            res.status(200).json({"msg":"Item quantity increased in cart"})
        }   
    }
    catch(err){
        res.status(500).json({"err":"errror in adding to cart"})
    }
}
let getcartitems=async(req,res)=>{
    try{
        let data=await cm.find({"uid":req.params.uid})
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({"err":"error in fetching cart items"})
    }
}
let inccartqty=async(req,res)=>{
    try{
        await cm.findByIdAndUpdate(req.params.cid,{$inc:{"qty":1}})
        res.status(200).json({"msg":"cart item quantity increased"})
    }
    catch(err){
        res.status(500).json({"err":"error in increasing cart item quantity"})
    }   
}
let deccartqty=async(req,res)=>{
    try{    
        let data=await cm.findByIdAndUpdate(req.params.cid,{$inc:{"qty":-1}})
        res.status(200).json({"msg":"cart item quantity decreased"})
    }
    catch(err){
        res.status(500).json({"err":"error in decreasing cart item quantity"})
    }
}
let deletecartitem=async(req,res)=>{
    try{
        await cm.findByIdAndDelete(req.params.cid)
        res.status(200).json({"msg":"cart item deleted"})
    }
    catch(err){
        res.status(500).json({"err":"error in deleting cart item"})
    }
}
module.exports={addcart,getcartitems,inccartqty,deccartqty,deletecartitem}