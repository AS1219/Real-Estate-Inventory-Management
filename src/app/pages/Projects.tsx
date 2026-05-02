import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Building2, ArrowRight, Plus } from 'lucide-react';
import { TopNav } from '../components/TopNav';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';
import type { Project } from '../types';
import { createProject, getProjects } from '../api/client';

const initialFormState = {
  name: '',
  location: '',
  description: '',
  imageUrl: '',
  startDate: '',
  buildingCount: 3,
  availableUnits: 48,
  blockedUnits: 24,
  soldUnits: 48
};

const getDefaultUnitBreakdown = (buildingCount: number) => {
  const totalUnits = buildingCount * 40;
  const availableUnits = Math.floor(totalUnits * 0.4);
  const blockedUnits = Math.floor(totalUnits * 0.2);
  const soldUnits = totalUnits - availableUnits - blockedUnits;

  return { availableUnits, blockedUnits, soldUnits };
};

export function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsLoading(true);
    getProjects()
      .then(setProjects)
      .catch((error) => toast.error(error.message || 'Unable to load projects'))
      .finally(() => setIsLoading(false));
  }, []);

  const totalUnits = useMemo(() => formState.buildingCount * 40, [formState.buildingCount]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formState.name) nextErrors.name = 'Project name is required';
    if (!formState.location) nextErrors.location = 'Location is required';
    if (!formState.description) nextErrors.description = 'Description is required';
    if (!formState.imageUrl) nextErrors.imageUrl = 'Image URL is required';
    if (!formState.startDate) nextErrors.startDate = 'Start date is required';

    const totalProvided = Number(formState.availableUnits) + Number(formState.blockedUnits) + Number(formState.soldUnits);
    if (totalProvided !== totalUnits) {
      nextErrors.unitTotals = `Available + Blocked + Sold must equal ${totalUnits}`;
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const project = await createProject({
        name: formState.name,
        location: formState.location,
        description: formState.description,
        imageUrl: formState.imageUrl,
        startDate: formState.startDate,
        buildingCount: Number(formState.buildingCount),
        availableUnits: Number(formState.availableUnits),
        blockedUnits: Number(formState.blockedUnits),
        soldUnits: Number(formState.soldUnits)
      });

      setProjects((prev) => [project, ...prev]);
      setIsDialogOpen(false);
      setFormState(initialFormState);
      toast.success('Project created successfully');
    } catch (error) {
      toast.error((error as Error).message || 'Unable to create project');
    }
  };

  return (
    <div>
      <TopNav title="Projects" />

      <div className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <p className="text-[#6B7280]">
            {isLoading ? 'Loading projects...' : `${projects.length} active projects`}
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus size={18} />
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Project Name"
                value={formState.name}
                onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                error={errors.name}
              />
              <Input
                label="Location"
                value={formState.location}
                onChange={(event) => setFormState({ ...formState, location: event.target.value })}
                error={errors.location}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Image URL"
                value={formState.imageUrl}
                onChange={(event) => setFormState({ ...formState, imageUrl: event.target.value })}
                error={errors.imageUrl}
              />
              <Input
                label="Start Date"
                type="date"
                value={formState.startDate}
                onChange={(event) => setFormState({ ...formState, startDate: event.target.value })}
                error={errors.startDate}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#111827]">Description</label>
              <textarea
                value={formState.description}
                onChange={(event) => setFormState({ ...formState, description: event.target.value })}
                className="w-full mt-2 p-4 bg-white border border-[#E5E7EB] rounded-[10px] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                rows={4}
              />
              {errors.description && <p className="text-sm text-[#DC2626] mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="Buildings"
                  type="number"
                  min={1}
                  value={formState.buildingCount}
                  onChange={(event) => {
                    const buildingCount = Math.max(1, Number(event.target.value));
                    const unitBreakdown = getDefaultUnitBreakdown(buildingCount);
                    setFormState({
                      ...formState,
                      buildingCount,
                      ...unitBreakdown
                    });
                  }}
                />
                <p className="text-xs text-[#6B7280] mt-1">Total units will be calculated as buildings × 40.</p>
              </div>
              <div>
                <Input
                  label="Total units"
                  value={totalUnits}
                  readOnly
                  className="cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input
                label="Available Units"
                type="number"
                min={0}
                value={formState.availableUnits}
                onChange={(event) => setFormState({ ...formState, availableUnits: Number(event.target.value) })}
              />
              <Input
                label="Blocked Units"
                type="number"
                min={0}
                value={formState.blockedUnits}
                onChange={(event) => setFormState({ ...formState, blockedUnits: Number(event.target.value) })}
              />
              <Input
                label="Sold Units"
                type="number"
                min={0}
                value={formState.soldUnits}
                onChange={(event) => setFormState({ ...formState, soldUnits: Number(event.target.value) })}
              />
            </div>
            {errors.unitTotals && <p className="text-sm text-[#DC2626]">{errors.unitTotals}</p>}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
