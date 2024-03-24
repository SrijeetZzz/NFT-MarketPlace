import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/signup');
  };


  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white' }}>NFTSearch</h1>
        </Link>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search products..."  />
        <i className="fa fa-search"></i>
      </div>

      <div className="spacer"></div>
      <div className="right">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkBtn">
          <i className="fa fa-bars" />
        </label>
        <ul className="list">
          <li>
            <Link to="/stats">Stats</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
          {auth ? (
            <li>
              <Link onClick={logout} to="/signup">
                <button>Logout</button>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signup">
                  <button>Signup</button>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button>Login</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
