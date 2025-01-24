import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import ProjectGrid from '@/components/dashboard/ProjectGrid';
import RecentActivity from '@/components/dashboard/RecentActivity';
import Calendar from '@/components/dashboard/Calendar';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Quick Filters */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium">
            All Projects
          </button>
          <button className="px-4 py-2 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium hover:bg-gray-100">
            In Progress
          </button>
          <button className="px-4 py-2 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium hover:bg-gray-100">
            Planning
          </button>
        </div>
      </div>

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
