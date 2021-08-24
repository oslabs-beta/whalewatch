import React from 'react'
import logoNoText from '../../assets/logoNoText.png';
import logoTextOnly from '../../assets/logoTextOnly.png';

const NavBar = () => {
  return (
    <div>
      <nav className="vertical-nav" id="sidebar">
        <img src={logoNoText} className='logo-no-text' />
        <div className="media d-flex">
          <ul className="nav flex-column bg-white mb-0">

            <li className="nav-item">
              <a href="/login" className="menulist"><i className="bi bi-graph-up"></i>  Dashboard</a>
            </li>

            <li className="nav-item">
              <a href="/login" className="menulist"><i className="bi bi-box"></i>  Containers</a>
            </li>

            <li className="nav-item">
              <a href="/login" className="menulist"><i className="bi bi-menu-down"></i>  Notification</a>
            </li>

            <li className="nav-item">
              <a href="/login" className="menulist"><i className="bi bi-sliders"></i>  Settings</a>
            </li>

          </ul>
        </div>
        <img src={logoTextOnly} className='logo-text-only' />
      </nav>
    </div>
  )
}

export default NavBar
