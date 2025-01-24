import React from 'react';
import TodoList from './TodoList';
import Calendar from './Calendar';
import RecentActivity from './RecentActivity';
import DashboardMetrics from './DashboardMetrics';
import ProjectGrid from './ProjectGrid';

const Dashboard = () => {
  return (
    <div className="p-6 relative min-h-screen">
      {/* Stats section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <DashboardMetrics />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="col-span-3">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Active Projects</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">View All →</button>
              </div>
              <ProjectGrid />
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">View All →</button>
              </div>
              <RecentActivity />
            </div>
          </div>
        </div>

        {/* Main Calendar */}
        <div className="col-span-6">
          <Calendar />
        </div>

        {/* Right Sidebar - Todo List */}
        <div className="col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <TodoList />
          </div>
        </div>
      </div>

      {/* Version indicator - add this at the bottom */}
      <div className="fixed bottom-2 right-2 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-full shadow-sm border border-gray-100">
        v0.0.3
      </div>
    </div>
  );
};

export default Dashboard; 