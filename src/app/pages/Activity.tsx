import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle, TrendingUp, Filter } from 'lucide-react';
import { TopNav } from '../components/TopNav';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { recentActivities, projects, type Activity } from '../data/mockData';

export function Activity() {
  const [activities, setActivities] = useState<Activity[]>(recentActivities);
  const [filter, setFilter] = useState<'all' | 'sold' | 'blocked' | 'released'>('all');
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newActivity: Activity = {
          id: `act-${Date.now()}`,
          type: ['sold', 'blocked', 'released'][Math.floor(Math.random() * 3)] as any,
          flatNumber: `${Math.floor(Math.random() * 9) + 1}0${Math.floor(Math.random() * 8) + 1}`,
          agentName: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Gupta', 'Vikram Singh'][Math.floor(Math.random() * 5)],
          timestamp: new Date().toISOString(),
          projectName: projects[Math.floor(Math.random() * projects.length)].name
        };
        setActivities(prev => [newActivity, ...prev]);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(a => a.type === filter);
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'sold':
        return <TrendingUp size={20} className="text-[#DC2626]" />;
      case 'blocked':
        return <Clock size={20} className="text-[#F59E0B]" />;
      case 'released':
        return <CheckCircle size={20} className="text-[#16A34A]" />;
    }
  };
  
  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'sold':
        return 'bg-[#DC2626]/10';
      case 'blocked':
        return 'bg-[#F59E0B]/10';
      case 'released':
        return 'bg-[#16A34A]/10';
    }
  };
  
  const getActivityText = (activity: Activity) => {
    const actions = {
      sold: 'was sold',
      blocked: 'was blocked',
      released: 'was released'
    };
    return actions[activity.type];
  };
  
  return (
    <div>
      <TopNav title="Activity Feed" showLiveIndicator />
      
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="p-6">
              {/* Filters */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#111827]">Live Updates</h2>
                <div className="flex gap-2">
                  {(['all', 'sold', 'blocked', 'released'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-[10px] text-sm font-medium transition-all ${
                        filter === f
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Activity Timeline */}
              <div className="space-y-4">
                {filteredActivities.map((activity, index) => (
                  <div key={activity.id} className="relative">
                    {index !== filteredActivities.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-[#E5E7EB]" />
                    )}
                    
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      
                      <div className="flex-1 pb-6">
                        <div className="bg-[#F9FAFB] rounded-[16px] p-4 border border-[#E5E7EB]">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-[#111827]">
                                <span className="font-semibold">Flat {activity.flatNumber}</span>
                                {' '}{getActivityText(activity)}{' '}
                                by <span className="font-semibold">{activity.agentName}</span>
                              </p>
                              <p className="text-sm text-[#6B7280] mt-1">{activity.projectName}</p>
                            </div>
                            <span className="text-xs text-[#6B7280] whitespace-nowrap">
                              {formatTimestamp(activity.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredActivities.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="text-[#6B7280]" size={24} />
                  </div>
                  <p className="text-[#6B7280]">No activities found for this filter</p>
                </div>
              )}
              
              {filteredActivities.length > 20 && (
                <div className="text-center mt-6">
                  <Button variant="outline">Load More</Button>
                </div>
              )}
            </div>
          </Card>
          
          {/* Activity Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Card>
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-[#DC2626]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="text-[#DC2626]" size={24} />
                </div>
                <div className="text-2xl font-semibold text-[#111827] mb-1">
                  {activities.filter(a => a.type === 'sold').length}
                </div>
                <div className="text-sm text-[#6B7280]">Units Sold Today</div>
              </div>
            </Card>
            
            <Card>
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="text-[#F59E0B]" size={24} />
                </div>
                <div className="text-2xl font-semibold text-[#111827] mb-1">
                  {activities.filter(a => a.type === 'blocked').length}
                </div>
                <div className="text-sm text-[#6B7280]">Units Blocked Today</div>
              </div>
            </Card>
            
            <Card>
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="text-[#16A34A]" size={24} />
                </div>
                <div className="text-2xl font-semibold text-[#111827] mb-1">
                  {activities.filter(a => a.type === 'released').length}
                </div>
                <div className="text-sm text-[#6B7280]">Units Released Today</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
