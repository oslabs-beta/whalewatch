import React from 'react'
import {Link} from 'react-router-dom'
import logoNoText from '../../assets/logoNoText.png';
import logoTextOnly from '../../assets/logoTextOnly.png';
import logo from '../../assets/logo.gif';

const NavBar = () => {
  const removeCookies =  () => {
    localStorage.removeItem('validId');
    localStorage.removeItem('validAuth')
  }

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
              <a href="/notification" className="menulist"><i className="bi bi-menu-down"></i>  Notifications</a>
            </li>

            <li className="nav-item">
              <a href="/settings" className="menulist"><i className="bi bi-sliders"></i>  Settings</a>
            </li>

            <li className="nav-item">
              <Link to = "/login" className="menulist" onClick ={removeCookies}><i className="bi bi-sliders"></i>SignOut</Link>
            </li>

          </ul>
        </div>
        <div className='version'>Version 1.0</div>
      </nav>
    </div>
  )
}

export default NavBar