import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Ct from "./Ct.jsx"

const Km = () => {
  let { id } = useParams()
  let [data, setData] = useState(null)
  let obj = useContext(Ct);
  let [text, setText] = useState("")
  let [value, setValue] = useState(5)
  let [f, setF] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:5000/getprodbyid/${id}`).then((res) => {
      setData(res.data)
    })
  }, [f])

  let sub = () => {
    let pdata = { "pid": id, "uid": obj.state.uid, "text": text, "rt": value }
    axios.post("http://localhost:5000/addrev", pdata, {
      "headers": { "Authorization": obj.state.token }  // ✅ Token added
    }).then((res) => {
      setText("")
      setValue(5)
      setF(!f)
    })
  }

  return (<>
    {data != null && <div className="km-container">
      <img src={`http://localhost:5000/pimgs/${data.img}`} alt="Product Image" />
      <p>Tile:{data.title}</p>
      <p>Desc:{data.desc}</p>
      <p>Category:{data.cat}</p>
      <p>Price:{data.price}</p>
      <div><Rating name="read-only" value={data.avgrt} readOnly precision={0.5} />({data.avgrt}/{data.comm.length})</div>
      <button>Add to Cart</button>
    </div>}
    {data == null && <h2 style={{ "color": "orangered" }}>Loading...</h2>}

    {
      data != null && data.comm.map((v, i) => <div key={i} style={{ "border": "1px solid black", "margin": "10px", "padding": "10px" }}>
        <p>Review:{v.text}</p>
        <Rating name="read-only" value={v.rt} readOnly precision={0.5} />
      </div>)
    }

    {
      obj.state.token != "" && <div className="review-box">
        <input type="text" placeholder="Enter Review" onChange={(e) => setText(e.target.value)} value={text} />
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <button onClick={sub}>Submit Review</button>
      </div>
    }
  </>)
}

export default Km