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
                    background: var(--color-bg-dark, #080B14);
                    display: flex;
                }
                
                .main-content {
                    margin-left: 280px;
                    flex: 1;
                    padding: 2.5rem 3rem;
                    min-height: 100vh;
                    background: var(--color-bg-dark, #080B14);
                    color: var(--color-text-primary, #F8FAFC);
                    position: relative;
                    overflow-x: hidden;
                }

                @media (max-width: 768px) {
                    .main-content {
                        margin-left: 72px;
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default DashboardLayout;
