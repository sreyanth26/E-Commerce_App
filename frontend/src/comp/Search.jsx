import axios from "axios";
import React, { useContext, useState } from "react";
import Ct from "./Ct.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Search = () => {
  let [prods, setProds] = useState([])
  let [query, setQuery] = useState("")
  let [searched, setSearched] = useState(false)  // ✅ tracks if search was actually run
  let obj = useContext(Ct);
  let navigate = useNavigate();
  let [msg, setMsg] = useState("");
  let [f, setF] = useState(false);

  let search = () => {
    if (query.trim() == "") return
    axios.get(`http://localhost:5000/searchprod/${query}`).then((res) => {
      setProds(res.data)
      setSearched(true)  // ✅ only true after search runs
    })
  }

  let del = (id) => {
    axios.delete(`http://localhost:5000/delprod/${id}`, {
      "headers": { "Authorization": obj.state.token }
    }).then(() => {
      setProds(prods.filter(p => p._id !== id))
    })
  }

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
        "headers": { "Authorization": obj.state.token }
      }).then((res) => {
        setMsg(res.data.msg)
        setF(true)
        setTimeout(() => {
          setF(false)
        }, 2000)
      })
    }
  }

  return <div>
    <div style={{ "display": "flex", "gap": "10px", "padding": "10px" }}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setSearched(false)  // ✅ reset when user types again
        }}
        onKeyDown={(e) => e.key == "Enter" && search()}
      />
      <button onClick={search}>Search</button>
    </div>

    {/* ✅ Only show "No products found" after search has actually run */}
    {searched && prods.length == 0 && <h3 style={{ "color": "orangered" }}>No products found for "{query}"</h3>}

    <div className="search-bar">
      {prods.map((item) => {
        return (<div className="prod" key={item._id}>
          <img src={`http://localhost:5000/pimgs/${item.img}`} alt={item.title} />
          <div className="info">
            <h3>{item.title}</h3>
            <p>Cat:{item.cat}</p>
            <p>Price:{item.price}</p>
            <button onClick={() => navigate(`/km/${item._id}`)}>Know More</button>
            <button onClick={() => add(item)}>Add to Cart</button>
            {obj.state.role == "admin" && <>
              <button onClick={() => navigate(`/updprod/${item._id}`)}>Edit</button>
              <button onClick={() => del(item._id)}>Delete</button>
            </>}
          </div>
        </div>)
      })}
    </div>

    {f && <div className="msgpop">{msg}</div>}
  </div>;
};

export default Search;