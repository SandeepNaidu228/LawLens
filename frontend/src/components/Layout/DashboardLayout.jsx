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
                :root {
                    --bg-dark: #0F172A;
                    --bg-card: #1E293B;
                    --text-main: #F8FAFC;
                    --text-muted: #94A3B8;
                }

                .dashboard-layout {
                    min-height: 100vh;
                    background-color: var(--bg-dark);
                    display: flex;
                }
                
                .main-content {
                    margin-left: 260px; /* Sidebar width */
                    flex: 1;
                    padding: 2.5rem;
                    min-height: 100vh;
                    background-color: var(--bg-dark);
                    color: var(--text-main);
                    position: relative;
                    overflow-x: hidden;
                }

                /* Mobile Responsiveness */
                @media (max-width: 768px) {
                    .main-content {
                        margin-left: 70px; /* Collapsed sidebar width */
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default DashboardLayout;