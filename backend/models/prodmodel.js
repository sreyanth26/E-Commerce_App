let mongoose=require("mongoose")
let prodsch=new mongoose.Schema({
    "_id":String,
    "title":String,
    "desc":String,
    "cat":String,
    "price":Number,
    "img":String,
    "comm":[{"text":String,"rt":Number}]
})
let pm=mongoose.model("prod",prodsch)
module.exports=pm