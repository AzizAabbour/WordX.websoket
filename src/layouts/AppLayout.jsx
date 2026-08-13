import { Outlet } from 'react-router-dom';
import Sidebar from '../features/dashboard/Sidebar';
import TopBar from '../features/dashboard/TopBar';
import { useSelector } from 'react-redux';
import './AppLayout.css';

export default function AppLayout() {
  const { sidebarOpen, sidebarCollapsed } = useSelector(state => state.ui);

  return (
    <div className={`appLayout ${sidebarCollapsed ? 'collapsed' : ''} ${!sidebarOpen ? 'sidebarHidden' : ''}`}>
      <Sidebar />
      <div className="appMain">
        <TopBar />
        <main className="appContent">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
