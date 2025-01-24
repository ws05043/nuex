import { FC } from 'react';

const ProjectGrid: FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Modern Loft Renovation',
      progress: 75,
      dueDate: '2024-04-15',
      status: 'In Progress',
      members: 5,
      tasks: { total: 24, completed: 18 },
    },
    {
      id: 2,
      title: 'Minimalist Studio Design',
      progress: 45,
      dueDate: '2024-05-01',
      status: 'Planning',
      members: 3,
      tasks: { total: 18, completed: 8 },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-gray-50 rounded-3xl p-6 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-medium text-gray-900">
              {project.title}
            </h3>
            <span className={`px-3 py-1 text-xs rounded-full ${
              project.status === 'In Progress' 
                ? 'bg-blue-50 text-blue-600' 
                : 'bg-purple-50 text-purple-600'
            }`}>
              {project.status}
            </span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all group-hover:bg-blue-600"
              style={{ width: `${project.progress}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
            <span className="font-medium">{project.tasks.completed}/{project.tasks.total} Tasks</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
