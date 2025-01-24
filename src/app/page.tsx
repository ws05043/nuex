import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import ProjectGrid from '@/components/dashboard/ProjectGrid';
import RecentActivity from '@/components/dashboard/RecentActivity';
import Calendar from '@/components/dashboard/Calendar';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* Metrics Overview - Full Width */}
      <DashboardMetrics />

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left Side - Projects and Activity (2/3 width) */}
        <div className="col-span-2 space-y-4">
          {/* Projects Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-gray-900">
                Active Projects
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View All →
              </button>
            </div>
            <ProjectGrid />
          </div>

          {/* Recent Activity Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-gray-900">
                Recent Activity
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View All →
              </button>
            </div>
            <RecentActivity />
          </div>
        </div>

        {/* Right Side - Calendar (1/3 width) */}
        <div>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
