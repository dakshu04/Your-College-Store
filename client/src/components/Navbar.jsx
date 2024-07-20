// import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'
export const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='navbar-left'>
            <Link to="/" className='navbar-brand'>Book Store</Link>
        </div>
        <div className='navbar-right'>
            <Link to="/books" className='navbar-link'>Books</Link>
            <Link to="/addstudent" className='navbar-link'>Add Student</Link>
            <Link to="/dashboard" className='navbar-link'>Dashboard</Link>
            <Link to="/Login" className='navbar-link'>Login</Link>
        </div>
    </nav>
  )
}
