import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Building2, MapPin, Calendar, X, User, Square, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import { TopNav } from '../components/TopNav';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { projects, generateAllFlats, type Flat } from '../data/mockData';
import { toast } from 'sonner';

export function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);
  
  const [selectedBuilding, setSelectedBuilding] = useState(project?.buildings[0].id || '');
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'buildings' | 'inventory'>('buildings');
  
  if (!project) {
    return <div>Project not found</div>;
  }
  
  const building = project.buildings.find(b => b.id === selectedBuilding);
  const allFlats = generateAllFlats(project.id, project.buildings.length);
  const flatsInFloor = allFlats.filter(f => f.buildingId === selectedBuilding && f.floor === selectedFloor);
  
  const handleStatusChange = (flatId: string, newStatus: 'sold' | 'blocked' | 'available') => {
    // Simulate status change
    toast.success(`Flat ${selectedFlat?.number} marked as ${newStatus}`);
    setSelectedFlat(prev => prev ? { ...prev, status: newStatus } : null);
  };
  
  const breadcrumbs = [
    { label: 'Projects', path: '/projects' },
    { label: project.name }
  ];
  
  return (
    <div>
      <TopNav title={project.name} breadcrumbs={breadcrumbs} showLiveIndicator />
      
      <div className="p-8">
        {/* Project Header */}
        <Card className="mb-6">
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full md:w-32 h-32 rounded-[16px] object-cover"
              />
              
              <div className="flex-1 w-full">
                <h2 className="text-xl md:text-2xl font-semibold text-[#111827] mb-2">{project.name}</h2>
                
                <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-[#6B7280] mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Started {new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 size={16} />
                    <span>{project.buildings.length} Towers</span>
                  </div>
                </div>
                
                <p className="text-[#6B7280] mb-4">{project.description}</p>
                
                <div className="flex gap-6">
                  <div>
                    <div className="text-2xl font-semibold text-[#111827]">{project.totalUnits}</div>
                    <div className="text-sm text-[#6B7280]">Total Units</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-[#16A34A]">{project.availableUnits}</div>
                    <div className="text-sm text-[#6B7280]">Available</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-[#F59E0B]">{project.blockedUnits}</div>
                    <div className="text-sm text-[#6B7280]">Blocked</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-[#DC2626]">{project.soldUnits}</div>
                    <div className="text-sm text-[#6B7280]">Sold</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['overview', 'buildings', 'inventory'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-[10px] font-medium transition-all ${
                activeTab === tab
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-[#6B7280] hover:bg-[#F3F4F6]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        {activeTab === 'buildings' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Building Selector */}
            <div>
              <Card>
                <div className="p-4">
                  <h3 className="font-semibold text-[#111827] mb-4">Select Building</h3>
                  <div className="space-y-2">
                    {project.buildings.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBuilding(b.id)}
                        className={`w-full text-left px-4 py-3 rounded-[10px] transition-all ${
                          selectedBuilding === b.id
                            ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]'
                            : 'bg-[#F9FAFB] text-[#111827] hover:bg-[#F3F4F6]'
                        }`}
                      >
                        <div className="font-medium">{b.name}</div>
                        <div className="text-xs mt-1 opacity-75">
                          {b.floors} floors • {b.totalFlats} units
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {building && (
                    <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                      <h4 className="font-semibold text-[#111827] mb-3">Select Floor</h4>
                      <div className="grid grid-cols-5 gap-2">
                        {Array.from({ length: building.floors }, (_, i) => i + 1).map((floor) => (
                          <button
                            key={floor}
                            onClick={() => setSelectedFloor(floor)}
                            className={`aspect-square rounded-[10px] text-sm font-medium transition-all ${
                              selectedFloor === floor
                                ? 'bg-[#2563EB] text-white'
                                : 'bg-[#F9FAFB] text-[#111827] hover:bg-[#F3F4F6]'
                            }`}
                          >
                            {floor}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            
            {/* Floor Plan View */}
            <div className="lg:col-span-3">
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-[#111827]">
                        {building?.name} - Floor {selectedFloor}
                      </h3>
                      <p className="text-sm text-[#6B7280] mt-1">
                        {flatsInFloor.length} units on this floor
                      </p>
                    </div>
                    
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#16A34A] rounded" />
                        <span className="text-[#6B7280]">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#F59E0B] rounded" />
                        <span className="text-[#6B7280]">Blocked</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#DC2626] rounded" />
                        <span className="text-[#6B7280]">Sold</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive Floor Plan */}
                  <div className="relative bg-[#F9FAFB] rounded-[16px] p-8 min-h-[500px]">
                    <svg width="100%" height="500" className="overflow-visible">
                      {flatsInFloor.map((flat) => {
                        const colors = {
                          available: '#16A34A',
                          blocked: '#F59E0B',
                          sold: '#DC2626'
                        };
                        
                        return (
                          <g key={flat.id}>
                            <rect
                              x={flat.position!.x}
                              y={flat.position!.y}
                              width={flat.position!.width}
                              height={flat.position!.height}
                              fill={colors[flat.status]}
                              opacity="0.15"
                              stroke={colors[flat.status]}
                              strokeWidth="2"
                              rx="8"
                              className="cursor-pointer hover:opacity-30 transition-all"
                              onClick={() => setSelectedFlat(flat)}
                            />
                            <text
                              x={flat.position!.x + flat.position!.width / 2}
                              y={flat.position!.y + flat.position!.height / 2}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-lg font-semibold pointer-events-none"
                              fill={colors[flat.status]}
                            >
                              {flat.number}
                            </text>
                            <text
                              x={flat.position!.x + flat.position!.width / 2}
                              y={flat.position!.y + flat.position!.height / 2 + 20}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-sm pointer-events-none"
                              fill="#6B7280"
                            >
                              {flat.type}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'overview' && (
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#111827] mb-4">Buildings Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.buildings.map((building) => (
                  <div
                    key={building.id}
                    className="p-4 bg-[#F9FAFB] rounded-[16px] border border-[#E5E7EB]"
                  >
                    <h4 className="font-semibold text-[#111827] mb-3">{building.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Total Flats</span>
                        <span className="font-medium">{building.totalFlats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Available</span>
                        <span className="font-medium text-[#16A34A]">{building.availableFlats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Blocked</span>
                        <span className="font-medium text-[#F59E0B]">{building.blockedFlats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Sold</span>
                        <span className="font-medium text-[#DC2626]">{building.soldFlats}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
        
        {activeTab === 'inventory' && (
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#111827] mb-4">All Units</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Flat</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Building</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Floor</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Area</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFlats.slice(0, 20).map((flat) => (
                      <tr key={flat.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                        <td className="py-3 px-4 font-medium">{flat.number}</td>
                        <td className="py-3 px-4 text-[#6B7280]">
                          {project.buildings.find(b => b.id === flat.buildingId)?.name}
                        </td>
                        <td className="py-3 px-4 text-[#6B7280]">{flat.floor}</td>
                        <td className="py-3 px-4 text-[#6B7280]">{flat.type}</td>
                        <td className="py-3 px-4 text-[#6B7280]">{flat.area} sq.ft</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={flat.status} size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}
      </div>
      
      {/* Flat Details Side Panel */}
      {selectedFlat && (
        <div className="fixed inset-0 bg-black/20 z-50 flex justify-end" onClick={() => setSelectedFlat(null)}>
          <div
            className="w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#111827]">Flat {selectedFlat.number}</h3>
              <button
                onClick={() => setSelectedFlat(null)}
                className="p-2 hover:bg-[#F3F4F6] rounded-[10px] transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <StatusBadge status={selectedFlat.status} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#6B7280] mb-1">
                    <Square size={16} />
                    <span className="text-sm">Area</span>
                  </div>
                  <p className="text-lg font-semibold">{selectedFlat.area} sq.ft</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-[#6B7280] mb-1">
                    <DollarSign size={16} />
                    <span className="text-sm">Price</span>
                  </div>
                  <p className="text-lg font-semibold">₹{(selectedFlat.price / 10000000).toFixed(2)}Cr</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-[#6B7280] mb-1">
                    <Building2 size={16} />
                    <span className="text-sm">Type</span>
                  </div>
                  <p className="text-lg font-semibold">{selectedFlat.type}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-[#6B7280] mb-1">
                    <Building2 size={16} />
                    <span className="text-sm">Floor</span>
                  </div>
                  <p className="text-lg font-semibold">{selectedFlat.floor}</p>
                </div>
              </div>
              
              {selectedFlat.assignedAgent && (
                <div>
                  <div className="flex items-center gap-2 text-[#6B7280] mb-2">
                    <User size={16} />
                    <span className="text-sm">Assigned Agent</span>
                  </div>
                  <p className="font-medium">{selectedFlat.assignedAgent}</p>
                </div>
              )}
              
              {selectedFlat.buyerName && (
                <div className="p-4 bg-[#F9FAFB] rounded-[16px]">
                  <p className="text-sm text-[#6B7280] mb-1">Buyer Details</p>
                  <p className="font-semibold text-[#111827]">{selectedFlat.buyerName}</p>
                </div>
              )}
              
              <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
                <h4 className="font-semibold text-[#111827]">Actions</h4>
                
                {selectedFlat.status === 'available' && (
                  <>
                    <Button
                      className="w-full"
                      onClick={() => handleStatusChange(selectedFlat.id, 'sold')}
                    >
                      <CheckCircle size={18} />
                      Mark as Sold
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleStatusChange(selectedFlat.id, 'blocked')}
                    >
                      <Clock size={18} />
                      Block Unit
                    </Button>
                  </>
                )}
                
                {selectedFlat.status === 'blocked' && (
                  <>
                    <Button
                      className="w-full"
                      onClick={() => handleStatusChange(selectedFlat.id, 'sold')}
                    >
                      <CheckCircle size={18} />
                      Mark as Sold
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleStatusChange(selectedFlat.id, 'available')}
                    >
                      <XCircle size={18} />
                      Release Block
                    </Button>
                  </>
                )}
                
                {selectedFlat.status === 'sold' && (
                  <div className="p-4 bg-[#16A34A]/10 rounded-[16px] text-center">
                    <CheckCircle className="mx-auto mb-2 text-[#16A34A]" size={24} />
                    <p className="text-sm font-medium text-[#16A34A]">This unit has been sold</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}