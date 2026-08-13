import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Bell, HelpCircle, User, Menu } from 'lucide-react';
import { toggleSidebar, setSearchQuery } from '../../store/slices/uiSlice';
import Input from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import './TopBar.css';

export default function TopBar() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="topbar">
      <div className="topbarLeft">
        <button
          className="mobileMenuBtn"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>
        <div className="searchWrapper">
          <Input
            type="search"
            placeholder="Search documents, CVs, templates..."
            value={searchVal}
            onChange={handleSearch}
            icon={Search}
            className="topbarSearch"
          />
        </div>
      </div>

      <div className="topbarRight">
        <button className="topbarActionBtn" title="Help & Support">
          <HelpCircle size={18} />
        </button>
        <button className="topbarActionBtn" title="Notifications">
          <Bell size={18} />
          <span className="notifBadge" />
        </button>
        <div className="userProfileBtn">
          <div className="userAvatar">
            {user?.firstName?.[0]?.toUpperCase() || <User size={16} />}
          </div>
          <span className="userName">{user?.firstName || 'User'}</span>
        </div>
      </div>
    </header>
  );
}
