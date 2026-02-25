import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Ct from "./Ct.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Electricals = () => {
  let [prods, setProds] = useState([])
  let obj = useContext(Ct);
  let navigate = useNavigate();
  let [msg, setMsg] = useState("");
  let [f, setF] = useState(false);

  useEffect(() => {
    let x = Cookies.get("logininfo")
    if (x != undefined) {
      let y = JSON.parse(x)
      obj.updstate(y)
    }
    axios.get("http://localhost:5000/getprodbycat/electrical").then((res) => {
      setProds(res.data);
    });
  }, []);

  let add = (item) => {
    if (obj.state.token == "") {
      navigate("/login")
    }
    else {
      let pdata = {
        "uid": obj.state.uid,
        "pid": item._id,
        "title": item.title,
        "price": item.price,
        "img": item.img
      }
      axios.post("http://localhost:5000/addcart", pdata, {
        "headers": { "Authorization": obj.state.token }  // ✅ Token added
      }).then((res) => {
        setMsg(res.data.msg)
        setF(true)
        setTimeout(() => {
          setF(false)
        }, 2000)
      })
    }
  }

  return <div className="prodcon">
    {prods.map((item) => {
      return (<div className="prod" key={item._id}>
        <img src={`http://localhost:5000/pimgs/${item.img}`} alt={item.title} />
        <div className="info">
          <h3>{item.title}</h3>
          <p>Cat:{item.cat}</p>
          <p>Price:{item.price}</p>
          <button onClick={() => navigate(`/km/${item._id}`)}>Know More</button>
          <button onClick={() => add(item)}>Add to Cart</button>
          {obj.state.role == "admin" && <><button onClick={() => navigate(`/updprod/${item._id}`)}>Edit</button>
            <button onClick={() => {
              axios.delete(`http://localhost:5000/delprod/${item._id}`, {
                "headers": { "Authorization": obj.state.token }  // ✅ Token added
              }).then(() => {
                setProds(prods.filter(p => p._id !== item._id))
              })
            }}>Delete</button></>}
        </div>
      </div>)
    })}

    {f && <div className="msgpop">{msg}</div>}
  </div>;
};

export default Electricals;