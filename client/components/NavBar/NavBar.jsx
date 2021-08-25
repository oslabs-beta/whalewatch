import React from 'react'
import logoNoText from '../../assets/logoNoText.png';
import logoTextOnly from '../../assets/logoTextOnly.png';
import logo from '../../assets/logo.gif';

const NavBar = () => {
  return (
    <div>
      <nav className="vertical-nav" id="sidebar">
        <img src={logo} className='logo-small' />
        <div className="media d-flex">
          <ul className="nav flex-column bg-white mb-0">

            <li className="nav-item">
              <a href="/dashboard" className="menulist"><i className="bi bi-graph-up"></i>  Dashboard</a>
            </li>

            <li className="nav-item">
              <a href="/containers" className="menulist"><i className="bi bi-box"></i>  Containers</a>
            </li>

            <li className="nav-item">
              <a href="/notification" className="menulist"><i className="bi bi-menu-down"></i>  Notification</a>
            </li>

            <li className="nav-item">
              <a href="/login" className="menulist"><i className="bi bi-sliders"></i>  Settings</a>
            </li>

          </ul>
        </div>
        <div className='version'>Version 1.0</div>
      </nav>
    </div>
  )
}

export default NavBar