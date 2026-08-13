import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FileText, LayoutDashboard, File, User, Mail, Heart,
  Trash2, Settings, Plus, Sparkles, LogOut, Moon, Sun, ChevronLeft, ChevronRight
} from 'lucide-react';
import { toggleSidebarCollapsed, toggleTheme, openModal } from '../../store/slices/uiSlice';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sidebarCollapsed, sidebarOpen, theme } = useSelector(state => state.ui);
  const { logout } = useAuth();

  const handleCreateNew = () => {
    dispatch(openModal('createDocument'));
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/documents', label: 'My Documents', icon: FileText },
    { to: '/cvs', label: 'CVs & Resumes', icon: User },
    { to: '/cover-letters', label: 'Cover Letters', icon: Mail },
    { to: '/templates', label: 'Templates', icon: Sparkles },
    { to: '/favorites', label: 'Favorites', icon: Heart },
    { to: '/trash', label: 'Trash', icon: Trash2 },
  ];

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${sidebarOpen ? 'openMobile' : ''}`}>
      <div className="sidebarHeader">
        <div className="sidebarBrand">
          <div className="sidebarLogo">
            <FileText size={22} />
          </div>
          {!sidebarCollapsed && <span className="sidebarTitle">WordX</span>}
        </div>
        <button
          className="collapseBtn"
          onClick={() => dispatch(toggleSidebarCollapsed())}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="sidebarAction">
        <button className="createDocBtn" onClick={handleCreateNew}>
          <Plus size={18} />
          {!sidebarCollapsed && <span>New Document</span>}
        </button>
      </div>

      <nav className="sidebarNav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebarNavItem ${isActive ? 'active' : ''}`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon size={18} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebarFooter">
        <NavLink
          to="/settings"
          className={({ isActive }) => `sidebarNavItem ${isActive ? 'active' : ''}`}
          title={sidebarCollapsed ? 'Settings' : undefined}
        >
          <Settings size={18} />
          {!sidebarCollapsed && <span>Settings</span>}
        </NavLink>

        <button
          className="sidebarNavItem themeToggle"
          onClick={() => dispatch(toggleTheme())}
          title={sidebarCollapsed ? `Theme: ${theme}` : undefined}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {!sidebarCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        <button
          className="sidebarNavItem logoutBtn"
          onClick={() => {
            logout();
            navigate('/login');
          }}
          title={sidebarCollapsed ? 'Log out' : undefined}
        >
          <LogOut size={18} />
          {!sidebarCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
