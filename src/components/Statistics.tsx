import { CheckCircle, Clock, TrendingUp } from 'lucide-react';
import type { TodoStatistics } from '../types';

interface StatisticsProps {
  statistics: TodoStatistics;
}

export const Statistics = ({ statistics }: StatisticsProps) => {
  const completionRate = statistics.total > 0
    ? Math.round((statistics.completed / statistics.total) * 100)
    : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: statistics.total,
      icon: TrendingUp,
      color: 'bg-gray-100 text-gray-600',
      iconColor: 'text-gray-600',
    },
    {
      label: 'Completed',
      value: statistics.completed,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      iconColor: 'text-green-600',
    },
    {
      label: 'Pending',
      value: statistics.pending,
      icon: Clock,
      color: 'bg-red-100 text-red-600',
      iconColor: 'text-red-600',
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Completion Rate</h3>
          <span className="text-2xl font-bold text-red-600">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {statistics.completed} of {statistics.total} tasks completed
        </p>
      </div>
    </div>
  );
};
