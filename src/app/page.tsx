import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import ProjectGrid from '@/components/dashboard/ProjectGrid';
import RecentActivity from '@/components/dashboard/RecentActivity';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* iOS-style header */}
      <div className="sticky top-0 z-10 bg-white/80 ios-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-black">
              NueX
            </h1>
            <button className="ios-button">
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
        {/* Metrics Overview */}
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
    </div>
  );
}
