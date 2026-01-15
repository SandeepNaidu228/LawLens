import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>

            <style>{`
        .dashboard-layout {
          min-height: 100vh;
          background: var(--color-background);
        }
        
        .main-content {
          margin-left: 260px; /* Sidebar width */
          padding: var(--spacing-xl);
          min-height: 100vh;
        }
      `}</style>
        </div>
    );
};

export default DashboardLayout;
