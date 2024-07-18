import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header>
        <div>
          <p>Logo</p>
        </div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Shop</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <div>
          <p>Action</p>
        </div>
      </header>
      <banner>
        <img src=".images/logo.png" alt="" />
      </banner>
    </div>
  );
};

export default Header;
