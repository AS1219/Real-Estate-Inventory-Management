import React, { useEffect, useState } from 'react';
import { Filter, Download, Search } from 'lucide-react';
import { TopNav } from '../components/TopNav';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { getFlats } from '../api/client';
import type { Flat } from '../types';

export function Inventory() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'blocked' | 'sold'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [flats, setFlats] = useState<Flat[]>([]);

  useEffect(() => {
    getFlats()
      .then(setFlats)
      .catch(() => setFlats([]));
  }, []);

  const filteredFlats = flats.filter((flat) => {
    const matchesStatus = filterStatus === 'all' || flat.status === filterStatus;
    const matchesSearch = searchQuery === '' ||
      flat.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flat.projectName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return `₹${(price / 10000000).toFixed(2)}Cr`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div>
      <TopNav title="Inventory Management" />

      <div className="p-4 md:p-8">
        <Card>
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
                  <input
                    type="text"
                    placeholder="Search by flat number or project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="flex gap-2 md:gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 md:px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-sm md:text-base"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="blocked">Blocked</option>
                  <option value="sold">Sold</option>
                </select>

                <Button variant="outline" className="hidden sm:flex">
                  <Filter size={18} />
                  <span className="hidden md:inline">More Filters</span>
                </Button>

                <Button>
                  <Download size={18} />
                  <span className="hidden md:inline">Export</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-[#F9FAFB] rounded-[16px]">
                <div className="text-2xl font-semibold text-[#111827] mb-1">{flats.length}</div>
                <div className="text-sm text-[#6B7280]">Total Units</div>
              </div>
              <div className="p-4 bg-[#16A34A]/10 rounded-[16px]">
                <div className="text-2xl font-semibold text-[#16A34A] mb-1">
                  {flats.filter((f) => f.status === 'available').length}
                </div>
                <div className="text-sm text-[#6B7280]">Available</div>
              </div>
              <div className="p-4 bg-[#F59E0B]/10 rounded-[16px]">
                <div className="text-2xl font-semibold text-[#F59E0B] mb-1">
                  {flats.filter((f) => f.status === 'blocked').length}
                </div>
                <div className="text-sm text-[#6B7280]">Blocked</div>
              </div>
              <div className="p-4 bg-[#DC2626]/10 rounded-[16px]">
                <div className="text-2xl font-semibold text-[#DC2626] mb-1">
                  {flats.filter((f) => f.status === 'sold').length}
                </div>
                <div className="text-sm text-[#6B7280]">Sold</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Flat No.</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Project</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Building</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Floor</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Area</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Agent</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFlats.slice(0, 50).map((flat) => (
                    <tr
                      key={flat.id}
                      className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#111827]">{flat.number}</span>
                      </td>
                      <td className="py-3 px-4 text-[#6B7280]">{flat.projectName || '-'}</td>
                      <td className="py-3 px-4 text-[#6B7280]">{flat.buildingName || '-'}</td>
                      <td className="py-3 px-4 text-[#6B7280]">{flat.floor}</td>
                      <td className="py-3 px-4 text-[#6B7280]">{flat.type}</td>
                      <td className="py-3 px-4 text-[#6B7280]">{flat.area} sq.ft</td>
                      <td className="py-3 px-4 font-medium text-[#111827]">{formatPrice(flat.price)}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={flat.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-[#6B7280]">{flat.assignedAgent || '-'}</td>
                      <td className="py-3 px-4 text-[#6B7280] text-sm">{formatDate(flat.lastUpdated)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-[#6B7280]">
                Showing {Math.min(50, filteredFlats.length)} of {filteredFlats.length} units
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
