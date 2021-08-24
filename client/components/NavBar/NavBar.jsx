import React from 'react'
import logoNoText from '../../assets/logoNoText.png';
import logoTextOnly from '../../assets/logoTextOnly.png';

const NavBar = () => {
    return (
        <div>
<nav className="vertical-nav" id="sidebar">
    <img src={logoNoText} className='logo-no-text'/>
    <div class="media d-flex">
      <ul class="nav flex-column bg-white mb-0">

      <li class="nav-item">
      <a href="/login" className="menulist"><i class="bi bi-graph-up"></i>  Dashboard</a>
    </li>

      <li class="nav-item">
      <a href="/login" className="menulist"><i class="bi bi-box"></i>  Containers</a>
    </li>

    <li class="nav-item">
    <a href="/login" className="menulist"><i class="bi bi-menu-down"></i>  Notification</a>
    </li>

    <li class="nav-item">
    <a href="/login" className="menulist"><i class="bi bi-sliders"></i>  Settings</a>
    </li>

  </ul>
  </div>
  <img src={logoTextOnly} className='logo-text-only'/>
</nav>
</div>
    )
}

export default NavBar;
