import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: 'blue' | 'green' | 'orange' | 'cyan' | 'pink' | 'teal';
}

const colorClasses = {
  blue: {
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/30',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  green: {
    gradient: 'from-green-500 to-green-600',
    shadow: 'shadow-green-500/30',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
  },
  orange: {
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/30',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
  },
  cyan: {
    gradient: 'from-cyan-500 to-cyan-600',
    shadow: 'shadow-cyan-500/30',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
  },
  pink: {
    gradient: 'from-pink-500 to-pink-600',
    shadow: 'shadow-pink-500/30',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
  },
  teal: {
    gradient: 'from-teal-500 to-teal-600',
    shadow: 'shadow-teal-500/30',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30',
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
}) => {
  const colors = colorClasses[color];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  trend.positive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-slate-500 text-xs">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center shadow-lg ${colors.shadow}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};
