import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct.jsx'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Addprod = () => {
  let [data, setData] = useState({ "title": "", "cat": "", "price": "", "desc": "", "img": "" })
  let [msg, setMsg] = useState("")
  let obj = useContext(Ct)
  let navigate = useNavigate()

  useEffect(() => {
    let info = Cookies.get("logininfo")
    if (info == undefined) {
      navigate("/login")
    }
    else {
      info = JSON.parse(info)
      obj.updstate(info)
      if (info.role != "admin") {
        navigate("/")
      }
    }
  }, [])

  let fun = (e) => {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  let fun1 = (e) => {
    setData({ ...data, "img": e.target.files[0] })
  }

  let addprod = async () => {
    let formdata = new FormData()
    for (let key in data) {
      formdata.append(key, data[key])
    }
    try {
      let res = await axios.post("http://localhost:5000/addprod", formdata, {
        headers: {
          "Authorization": obj.state.token  // ✅ Already correct
        }
      })
      setMsg(res.data.msg)
    }
    catch (err) {
      setMsg("Error in Adding Product")
    }
  }

  return (
    <div className='form'>
      <h2 style={{ "color": "green" }}>{msg}</h2>
      <input type="text" placeholder='Enter Title' name='title' onChange={fun} value={data.title} />
      <input type="text" placeholder='Enter Price' name='price' onChange={fun} value={data.price} />
      <textarea name='desc' onChange={fun} value={data.desc} placeholder='Enter Description'></textarea>
      <select name='cat' onChange={fun} value={data.cat}>
        <option value="" disabled>Select Category</option>
        <option value="computers">Computers</option>
        <option value="mobiles">Mobiles</option>
        <option value="electrical">Electrical</option>
        <option value="others">Others</option>
      </select>
      <input type="file" name='img' onChange={fun1} />
      <button onClick={addprod}>Add Product</button>
    </div>
  )
}

export default Addprod