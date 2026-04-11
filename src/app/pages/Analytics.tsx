import React from 'react';
import { TrendingUp, DollarSign, Home, Target } from 'lucide-react';
import { TopNav } from '../components/TopNav';
import { Card, MetricCard } from '../components/Card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { salesByFloor, revenueByBuilding, salesTrends, projects } from '../data/mockData';

export function Analytics() {
  const totalRevenue = revenueByBuilding.reduce((sum, item) => sum + item.revenue, 0);
  const totalSold = projects.reduce((sum, p) => sum + p.soldUnits, 0);
  const totalUnits = projects.reduce((sum, p) => sum + p.totalUnits, 0);
  const conversionRate = ((totalSold / totalUnits) * 100).toFixed(1);
  
  const statusData = [
    { name: 'Available', value: projects.reduce((sum, p) => sum + p.availableUnits, 0), color: '#16A34A' },
    { name: 'Blocked', value: projects.reduce((sum, p) => sum + p.blockedUnits, 0), color: '#F59E0B' },
    { name: 'Sold', value: projects.reduce((sum, p) => sum + p.soldUnits, 0), color: '#DC2626' }
  ];
  
  return (
    <div>
      <TopNav title="Analytics & Reports" />
      
      <div className="p-8 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value={`₹${(totalRevenue / 10000000).toFixed(0)}Cr`}
            icon={<DollarSign size={24} />}
            color="primary"
            trend={{ value: '+15% from last month', isPositive: true }}
          />
          <MetricCard
            title="Units Sold"
            value={totalSold}
            icon={<TrendingUp size={24} />}
            color="success"
            trend={{ value: '+8% from last month', isPositive: true }}
          />
          <MetricCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={<Target size={24} />}
            color="primary"
          />
          <MetricCard
            title="Avg. Unit Price"
            value={`₹${((totalRevenue / totalSold) / 10000000).toFixed(2)}Cr`}
            icon={<Home size={24} />}
            color="warning"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales by Floor */}
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#111827] mb-6">Sales by Floor Range</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesByFloor}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="floor" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sold" fill="#DC2626" name="Sold" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="blocked" fill="#F59E0B" name="Blocked" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="available" fill="#16A34A" name="Available" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Revenue by Building */}
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#111827] mb-6">Revenue by Building</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueByBuilding} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" stroke="#6B7280" />
                  <YAxis type="category" dataKey="name" stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value: number) => `₹${(value / 10000000).toFixed(0)}Cr`}
                  />
                  <Bar dataKey="revenue" fill="#2563EB" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trends */}
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#111827] mb-6">Sales Trends (Last 6 Months)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#2563EB"
                    strokeWidth={3}
                    dot={{ fill: '#2563EB', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Inventory Status Distribution */}
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#111827] mb-6">Inventory Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        {/* Project Performance */}
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#111827] mb-6">Project Performance</h3>
            <div className="space-y-4">
              {projects.map((project) => {
                const soldPercentage = (project.soldUnits / project.totalUnits) * 100;
                const availablePercentage = (project.availableUnits / project.totalUnits) * 100;
                const blockedPercentage = (project.blockedUnits / project.totalUnits) * 100;
                
                return (
                  <div key={project.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-[#111827]">{project.name}</h4>
                        <p className="text-sm text-[#6B7280]">{project.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#111827]">{soldPercentage.toFixed(0)}% Sold</p>
                        <p className="text-sm text-[#6B7280]">{project.soldUnits}/{project.totalUnits} units</p>
                      </div>
                    </div>
                    <div className="h-3 bg-[#E5E7EB] rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-[#16A34A] transition-all duration-500"
                        style={{ width: `${availablePercentage}%` }}
                        title={`Available: ${availablePercentage.toFixed(0)}%`}
                      />
                      <div
                        className="h-full bg-[#F59E0B] transition-all duration-500"
                        style={{ width: `${blockedPercentage}%` }}
                        title={`Blocked: ${blockedPercentage.toFixed(0)}%`}
                      />
                      <div
                        className="h-full bg-[#DC2626] transition-all duration-500"
                        style={{ width: `${soldPercentage}%` }}
                        title={`Sold: ${soldPercentage.toFixed(0)}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
