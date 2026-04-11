import React from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Building2, Home, ArrowRight } from 'lucide-react';
import { TopNav } from '../components/TopNav';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { projects } from '../data/mockData';

export function Projects() {
  const navigate = useNavigate();
  
  return (
    <div>
      <TopNav title="Projects" />
      
      <div className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <p className="text-[#6B7280]">{projects.length} active projects</p>
          <Button>
            <Building2 size={18} />
            <span className="hidden sm:inline">New Project</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project) => (
            <Card key={project.id} hover onClick={() => navigate(`/projects/${project.id}`)}>
              <div className="overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#111827] mb-2">{project.name}</h3>
                
                <div className="flex items-center gap-2 text-[#6B7280] text-sm mb-4">
                  <MapPin size={16} />
                  <span>{project.location}</span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Total Units</span>
                    <span className="font-semibold text-[#111827]">{project.totalUnits}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Available</span>
                    <span className="font-semibold text-[#16A34A]">{project.availableUnits}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Blocked</span>
                    <span className="font-semibold text-[#F59E0B]">{project.blockedUnits}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Sold</span>
                    <span className="font-semibold text-[#DC2626]">{project.soldUnits}</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                    <span>Progress</span>
                    <span>{Math.round((project.soldUnits / project.totalUnits) * 100)}% Sold</span>
                  </div>
                  <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-[#16A34A]"
                      style={{ width: `${(project.availableUnits / project.totalUnits) * 100}%` }}
                    />
                    <div
                      className="h-full bg-[#F59E0B]"
                      style={{ width: `${(project.blockedUnits / project.totalUnits) * 100}%` }}
                    />
                    <div
                      className="h-full bg-[#DC2626]"
                      style={{ width: `${(project.soldUnits / project.totalUnits) * 100}%` }}
                    />
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/projects/${project.id}`);
                  }}
                >
                  View Details
                  <ArrowRight size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}