import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Ct from "./Ct.jsx"  // ✅ Added import
import Cookies from "js-cookie"  // ✅ Added import

const Edit = () => {
  let [data, setData] = useState({ "title": "", "desc": "", "cat": "", "price": "" })
  let [img, setImg] = useState(null)
  let { id } = useParams()
  let [f, setF] = useState(false)
  let navigate = useNavigate()
  let obj = useContext(Ct)  // ✅ Added context

  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    // ✅ Load token from cookie if context is empty
    let x = Cookies.get("logininfo")
    if (x != undefined) {
      let y = JSON.parse(x)
      obj.updstate(y)
    }
    axios.get(`http://localhost:5000/getprodbyid/${id}`).then((res) => {
      setData(res.data)
    })
  }, [f])

  let upddet = () => {
    delete data.comm
    delete data.avgrt
    axios.put("http://localhost:5000/updateprod", { ...data }, {
      "headers": { "Authorization": obj.state.token }  // ✅ Token added
    }).then((res) => {
      setF(!f)
    })
  }

  return (
    <div>
      <div>
        <h1>Update Product Details:</h1>
        <input type="text" placeholder="Title" value={data.title} onChange={fun} name="title" /><br />
        <input type="text" placeholder="Description" value={data.desc} onChange={fun} name="desc" /><br />
        <input type="text" placeholder="Category" value={data.cat} onChange={fun} name="cat" /><br />
        <input type="number" placeholder="Price" value={data.price} onChange={fun} name="price" /><br />
        <button onClick={upddet}>Update Product</button>
      </div>
      <div>
        <h1>Update Prod image</h1>
        <input type="file" onChange={(e) => setImg(e.target.files[0])} /><br />
        <button onClick={() => {
          let fd = new FormData()
          fd.append("_id", data._id)
          fd.append("img", img)
          axios.put("http://localhost:5000/updateprodimg", fd, {
            "headers": { "Authorization": obj.state.token }  // ✅ Token added
          }).then((res) => {
            navigate(`/km/${data._id}`)
          })
        }}>Update Image</button>
      </div>
    </div>
  )
}

export default Edit