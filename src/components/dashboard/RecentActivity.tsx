import { FC } from 'react';

const RecentActivity: FC = () => {
  const activities = [
    {
      id: 1,
      user: 'Sarah Chen',
      action: 'completed task',
      target: 'Floor Plan Review',
      project: 'Modern Loft Renovation',
      time: '2 hours ago',
      color: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      user: 'Mike Wilson',
      action: 'added comment on',
      target: 'Kitchen Layout',
      project: 'Minimalist Studio Design',
      time: '4 hours ago',
      color: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ];

  return (
    <div className="bg-gray-50 rounded-3xl">
      <div className="divide-y divide-gray-100">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-100/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-2xl ${activity.color} ${activity.textColor} flex items-center justify-center font-medium`}>
                  {activity.user.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                  {' '}in{' '}
                  <span className={activity.textColor}>{activity.project}</span>
                </p>
                <p className="text-sm text-gray-400 mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
