import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return <div className="home">
    <div className="smenu">
      <Link to="/">All</Link>
      <Link to="/computers">Computers</Link>
      <Link to="/mobiles">Mobiles</Link>
      <Link to="/electricals">Electricals</Link>
      <Link to="/others">Others</Link>
      <Link to="/search">Search</Link>
    </div>
    <div className="main">
      <h2>Welcome to E-Commerce Application</h2>
      <Outlet/>
      
    </div>

  </div>;
};

export default Home;
