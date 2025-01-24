import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import ProjectGrid from '@/components/dashboard/ProjectGrid';
import RecentActivity from '@/components/dashboard/RecentActivity';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          {/* Search input */}
        </div>
        {/* Quick Filters */}
      </div>

      {/* Rest of the dashboard content */}
      <DashboardMetrics />
      {/* Projects Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-black">
          Active Projects
        </h2>
        <ProjectGrid />
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-black">
          Recent Activity
        </h2>
        <RecentActivity />
      </div>
    </div>
  );
}
