import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/apiServices';
import { FaHome, FaTools, FaProjectDiagram, FaEnvelope, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import '../../styles/AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const admin = authService.getAdmin();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className={isActive('/admin/dashboard')}>
            <FaHome /> <span>Dashboard</span>
          </Link>
          <Link to="/admin/services" className={isActive('/admin/services')}>
            <FaTools /> <span>Services</span>
          </Link>
          <Link to="/admin/projects" className={isActive('/admin/projects')}>
            <FaProjectDiagram /> <span>Projects</span>
          </Link>
          <Link to="/admin/enquiries" className={isActive('/admin/enquiries')}>
            <FaEnvelope /> <span>Enquiries</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`admin-main ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <header className="admin-header">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="admin-info">
            <span>Welcome,Nivas</span>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
