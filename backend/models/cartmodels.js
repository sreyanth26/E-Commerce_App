let mongoose=require("mongoose")
let cartSchema=new mongoose.Schema({
    "_id":String,
    "title":String,
    "price":Number,
    "img":String,
    "qty":Number,
    "uid":String,
    "pid":String
})
let cm=mongoose.model("cartitems",cartSchema)
module.exports=cm