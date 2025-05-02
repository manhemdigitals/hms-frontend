import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo (3).png'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Logo - left side */}
          <a className="navbar-brand" href="#">
            <img src={Logo} alt="Logo" height="60" />
          </a>
      
          {/* Mobile Toggle Button - right side */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
      
          {/* Desktop center + right content */}
          <div className="collapse navbar-collapse d-none d-lg-flex justify-content-between w-100">
            {/* Center nav links */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-4">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
      
            {/* Right side button */}
            <Link to="/login">
              <button className="btn aptBtn">Patient Login</button>
            </Link>
          </div>
      
          {/* Offcanvas Sidebar for Mobile */}
          <div
            className="offcanvas offcanvas-end d-lg-none"
            tabIndex="-1"
            id="mobileMenu"
            aria-labelledby="mobileMenuLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="mobileMenuLabel">Menu</h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
              </ul>
              <div className="mt-3">
                <Link to="/login">
                  <button className="btn aptBtn w-100">Patient Login</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      

    )
}

export default Navbar