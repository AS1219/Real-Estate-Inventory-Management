import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Building2, Home, CheckCircle, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { TopNav } from '../components/TopNav';
import { MetricCard, Card } from '../components/Card';
import { Button } from '../components/Button';
import { getActivities, getProjects } from '../api/client';
import type { Activity, Project } from '../types';

export function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    getProjects().then(setProjects).catch(() => setProjects([]));
    getActivities().then(setActivities).catch(() => setActivities([]));
  }, []);

  const totalProjects = projects.length;
  const totalFlats = projects.reduce((sum, p) => sum + p.totalUnits, 0);
  const availableFlats = projects.reduce((sum, p) => sum + p.availableUnits, 0);
  const blockedFlats = projects.reduce((sum, p) => sum + p.blockedUnits, 0);
  const soldFlats = projects.reduce((sum, p) => sum + p.soldUnits, 0);

  const formatRelativeTime = (timestamp: string) => {
    const now = Date.now();
    const time = new Date(timestamp).getTime();
    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div>
      <TopNav title="Dashboard" showLiveIndicator />

      <div className="p-4 md:p-8 space-y-6 md:space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          <MetricCard
            title="Total Projects"
            value={totalProjects}
            icon={<Building2 size={24} />}
            color="primary"
          />
          <MetricCard
            title="Total Flats"
            value={totalFlats}
            icon={<Home size={24} />}
            color="primary"
          />
          <MetricCard
            title="Available"
            value={availableFlats}
            icon={<CheckCircle size={24} />}
            color="success"
            trend={{ value: '+12% this month', isPositive: true }}
          />
          <MetricCard
            title="Blocked"
            value={blockedFlats}
            icon={<Clock size={24} />}
            color="warning"
          />
          <MetricCard
            title="Sold"
            value={soldFlats}
            icon={<TrendingUp size={24} />}
            color="danger"
            trend={{ value: '+24% this month', isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#111827]">Recent Projects</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/projects')}
                  >
                    View All
                    <ArrowRight size={16} />
                  </Button>
                </div>

                <div className="space-y-4">
                  {projects.slice(0, 4).map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center gap-4 p-4 rounded-[16px] border border-[#E5E7EB] hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-all cursor-pointer"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-16 h-16 rounded-[10px] object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#111827] mb-1">{project.name}</h3>
                        <p className="text-sm text-[#6B7280]">{project.location}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-2">
                          <span className="text-sm text-[#16A34A] font-medium">
                            {project.availableUnits} available
                          </span>
                        </div>
                        <div className="text-xs text-[#6B7280]">
                          {project.soldUnits}/{project.totalUnits} sold
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#111827]">Live Activity</h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" />
                    <span className="text-sm text-[#16A34A] font-medium">Live</span>
                  </div>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {activities.map((activity) => {
                    const icons: Record<string, JSX.Element> = {
                      sold: <TrendingUp size={16} className="text-[#DC2626]" />,
                      blocked: <Clock size={16} className="text-[#F59E0B]" />,
                      released: <CheckCircle size={16} className="text-[#16A34A]" />
                    };

                    const colors: Record<string, string> = {
                      sold: 'bg-[#DC2626]/10',
                      blocked: 'bg-[#F59E0B]/10',
                      released: 'bg-[#16A34A]/10'
                    };

                    return (
                      <div key={activity.id} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colors[activity.type]}`}>
                          {icons[activity.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#111827]">
                            <span className="font-medium">Flat {activity.flatNumber}</span> {activity.type} by{' '}
                            <span className="font-medium">{activity.agentName}</span>
                          </p>
                          <p className="text-xs text-[#6B7280] mt-1">
                            {activity.projectName} • {formatRelativeTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#111827] mb-6">Inventory Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Available Inventory</span>
                  <span className="text-sm font-semibold text-[#16A34A]">
                    {totalFlats ? Math.round((availableFlats / totalFlats) * 100) : 0}%
                  </span>
                </div>
                <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#16A34A] rounded-full transition-all duration-500"
                    style={{ width: `${totalFlats ? (availableFlats / totalFlats) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Blocked Units</span>
                  <span className="text-sm font-semibold text-[#F59E0B]">
                    {totalFlats ? Math.round((blockedFlats / totalFlats) * 100) : 0}%
                  </span>
                </div>
                <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
                    style={{ width: `${totalFlats ? (blockedFlats / totalFlats) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Sold Units</span>
                  <span className="text-sm font-semibold text-[#DC2626]">
                    {totalFlats ? Math.round((soldFlats / totalFlats) * 100) : 0}%
                  </span>
                </div>
                <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#DC2626] rounded-full transition-all duration-500"
                    style={{ width: `${totalFlats ? (soldFlats / totalFlats) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
