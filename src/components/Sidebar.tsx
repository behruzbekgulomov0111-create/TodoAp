import { List, CheckCircle, Clock, BarChart3 } from 'lucide-react';

interface SidebarProps {
  activeFilter: 'all' | 'completed' | 'pending';
  onFilterChange: (filter: 'all' | 'completed' | 'pending') => void;
}

export const Sidebar = ({ activeFilter, onFilterChange }: SidebarProps) => {
  const menuItems = [
    { id: 'all' as const, label: 'All Tasks', icon: List },
    { id: 'completed' as const, label: 'Completed', icon: CheckCircle },
    { id: 'pending' as const, label: 'Pending', icon: Clock },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="space-y-2">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Filters
          </h2>
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeFilter === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-red-50 text-red-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-6 mt-6 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 text-gray-700">
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Statistics</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
