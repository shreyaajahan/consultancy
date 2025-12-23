import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { serviceService, projectService, enquiryService } from '../../services/apiServices';
import { FaTools, FaProjectDiagram, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    ongoingProjects: 0,
    completedProjects: 0,
    totalEnquiries: 0,
    newEnquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      const [servicesRes, projectsRes, enquiriesRes] = await Promise.all([
        serviceService.getAllAdmin(),
        projectService.getAllAdmin(),
        enquiryService.getStats()
      ]);

      const ongoingProjects = projectsRes.data.filter(p => p.status === 'ongoing').length;
      const completedProjects = projectsRes.data.filter(p => p.status === 'completed').length;

      setStats({
        services: servicesRes.count,
        projects: projectsRes.count,
        ongoingProjects,
        completedProjects,
        totalEnquiries: enquiriesRes.data.total,
        newEnquiries: enquiriesRes.data.new
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p className="subtitle">Welcome to Nivas Constructions Admin Panel</p>

        {loading ? (
          <div className="loading">Loading statistics...</div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon services">
                  <FaTools />
                </div>
                <div className="stat-info">
                  <h3>{stats.services}</h3>
                  <p>Total Services</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon projects">
                  <FaProjectDiagram />
                </div>
                <div className="stat-info">
                  <h3>{stats.projects}</h3>
                  <p>Total Projects</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon ongoing">
                  <FaProjectDiagram />
                </div>
                <div className="stat-info">
                  <h3>{stats.ongoingProjects}</h3>
                  <p>Ongoing Projects</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon completed">
                  <FaCheckCircle />
                </div>
                <div className="stat-info">
                  <h3>{stats.completedProjects}</h3>
                  <p>Completed Projects</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon enquiries">
                  <FaEnvelope />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalEnquiries}</h3>
                  <p>Total Enquiries</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon new-enquiries">
                  <FaEnvelope />
                </div>
                <div className="stat-info">
                  <h3>{stats.newEnquiries}</h3>
                  <p>New Enquiries</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <a href="/admin/services" className="action-card">
                  <FaTools />
                  <span>Manage Services</span>
                </a>
                <a href="/admin/projects" className="action-card">
                  <FaProjectDiagram />
                  <span>Manage Projects</span>
                </a>
                <a href="/admin/enquiries" className="action-card">
                  <FaEnvelope />
                  <span>View Enquiries</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
