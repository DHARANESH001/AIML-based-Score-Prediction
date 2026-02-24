import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  User as UserIcon, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
  { icon: Upload, label: 'Student Data Upload', path: '/student-data-upload' },
  { icon: UserIcon, label: 'Profile', path: '/profile' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="sidebar-toggle"
      >
        {isCollapsed ? <Menu /> : <X />}
      </button>

      <div className="sidebar-header">
        <div className="sidebar-logo">
          <LayoutDashboard />
        </div>
        <h2 className="sidebar-title">Menu</h2>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`sidebar-menu-item ${isActive ? 'active' : ''}`}
                >
                  <Icon />
                  <span className="sidebar-menu-text">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link
          to="/login"
          className="sidebar-logout"
        >
          <LogOut />
          <span className="sidebar-logout-text">Logout</span>
        </Link>
      </div>
    </div>
  );
}
