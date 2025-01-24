import { FC } from 'react';

const DashboardMetrics: FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { label: 'Active Projects', value: '12', trend: '+2', color: 'bg-blue-50', valueColor: 'text-blue-600' },
        { label: 'Tasks Due Today', value: '8', trend: '-3', color: 'bg-purple-50', valueColor: 'text-purple-600' },
        { label: 'Team Members', value: '24', trend: '+1', color: 'bg-green-50', valueColor: 'text-green-600' },
        { label: 'Completed This Week', value: '18', trend: '+7', color: 'bg-orange-50', valueColor: 'text-orange-600' },
      ].map((metric, index) => (
        <div
          key={index}
          className={`${metric.color} rounded-3xl p-6 transition-all hover:scale-[1.02] cursor-default`}
        >
          <p className="text-sm font-medium text-gray-500 mb-4">
            {metric.label}
          </p>
          <div className="flex items-end justify-between">
            <p className={`text-4xl font-bold ${metric.valueColor}`}>
              {metric.value}
            </p>
            <span 
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                metric.trend.startsWith('+') 
                  ? 'text-green-600 bg-green-100/70' 
                  : 'text-red-600 bg-red-100/70'
              }`}
            >
              {metric.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
