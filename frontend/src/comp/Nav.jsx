import { useContext } from "react";
import { Link } from "react-router-dom";
import Ct from "./Ct.jsx";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
const Nav = () => {
  let obj = useContext(Ct);
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      {obj.state.token == "" ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/reg">Register</Link>
        </>
      ) : (
        <>
          <Link to="/cart">Cart<button>{obj.state.count}</button></Link>
          {obj.state.role == "admin" && <Link to="/addprod">Add Product</Link>}

          <Link to="/logout">Logout</Link>

          <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24 }}>
            {obj.state.name[0].toUpperCase()}
          </Avatar>
        </>
      )}
    </div>
  );
};

export default Nav;
