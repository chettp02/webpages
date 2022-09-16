import React, { ReactFragment, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="navbar-nav ms-auto">
          <li className="nav-item, mx-2">
            <Link to={"/"} className="nav-link">
              Home Page
            </Link>
          </li>
          <li className="nav-item, mx-2">
            <Link to={"/aboutMe"} className="nav-link">
              About Me
            </Link>
          </li>
          <li className="nav-item, mx-2">
            <Link to={"/Projects"} className="nav-link">
              Projects
            </Link>
          </li>
          <li className="nav-item, mx-2">
            <Link to={"/birdBingo"} className="nav-link">
              Bird Bingo
            </Link>
          </li>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
