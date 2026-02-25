import React, {  useEffect,useContext,useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Ct from './Ct.jsx'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
  let [cart,setCart]=useState([])
  let navigate=useNavigate();
  let obj=useContext(Ct);
  let [f,setF]=useState(false);
  useEffect(() => {
    let x=Cookies.get("logininfo")
    if(x!=undefined){
      let y=JSON.parse(x)
      axios.get(`http://localhost:5000/getcartitems/${y.uid}`,{"headers":{"Authorization":y.token}}).then((res)=>{
        setCart(res.data)
        obj.updstate({...y,"count":res.data.length})
        Cookies.set("logininfo",JSON.stringify({...y,"count":res.data.length}))

      })
    }
    else{
      navigate("/login")
    }


  }, [f])
  let inccartqty=(cid)=>{
    axios.get(`http://localhost:5000/inccartqty/${cid}`,{"headers":{"Authorization":obj.state.token}} ).then((res)=>{
      setF(!f)
    })
  }
  let deletecartitem=(cid)=>{
    axios.delete(`http://localhost:5000/deletecartitem/${cid}`,{"headers":{"Authorization":obj.state.token}} ).then((res)=>{
      setF(!f)
    })
  }
  let deccartqty=(cid,qty)=>{
    if(qty>1){
    axios.get(`http://localhost:5000/deccartqty/${cid}`,{"headers":{"Authorization":obj.state.token}} ).then((res)=>{  
      setF(!f)
    })
    }
    else{
      deletecartitem(cid)
    } 
  }


     
  return (
    <div>
      {cart.length==0&&<h2 style={{"color":"orangered"}}>Your Cart is Empty</h2>}
      {cart.length>0&&<div className='cartcon'>
      {cart.map((item)=>{
        return(<div className="cartitem" key={item._id}>
          <img src={`http://localhost:5000/pimgs/${item.img}`} alt={item.title} />  
          <div className="info">
            <h3>{item.title}</h3>
            <p>Price:{item.price}</p>
            <p><button onClick={()=>deccartqty(item._id,item.qty)}>-</button>{item.qty}<button onClick={()=>inccartqty(item._id)}>+</button> </p>
            <p>Total:{item.price*item.qty}</p>
          </div>
          <button onClick={()=>deletecartitem(item._id)}>Remove</button>

        </div>)
      })}
      </div>}

      {cart.length>0&&<div className='carttotal'>
        <h2>Cart Total:{cart.reduce((prev,item)=>{
          return prev+item.price*item.qty 

        },0)}</h2>

        </div>}
    
     
    </div>
  )
}

export default Cart