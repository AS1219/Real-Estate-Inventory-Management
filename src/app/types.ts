export type FlatStatus = 'available' | 'blocked' | 'sold';

export interface Building {
  id: string;
  projectId: string;
  name: string;
  floors: number;
  totalFlats: number;
  availableFlats: number;
  blockedFlats: number;
  soldFlats: number;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  startDate: string;
  totalUnits: number;
  availableUnits: number;
  blockedUnits: number;
  soldUnits: number;
  buildings?: Building[];
}

export interface Flat {
  id: string;
  projectId: string;
  buildingId: string;
  number: string;
  floor: number;
  type: string;
  area: number;
  price: number;
  status: FlatStatus;
  assignedAgent?: string | null;
  buyerName?: string | null;
  buyerContact?: string | null;
  lastUpdated: string;
  position_x?: number | null;
  position_y?: number | null;
  position_width?: number | null;
  position_height?: number | null;
  buildingName?: string;
  projectName?: string;
}

export interface Activity {
  id: string;
  type: 'sold' | 'blocked' | 'released';
  flatNumber: string;
  agentName: string;
  timestamp: string;
  projectName: string;
}

export interface AnalyticsData {
  salesByFloor: Array<{ floor: string; sold: number; available: number; blocked: number }>;
  revenueByBuilding: Array<{ name: string; revenue: number }>;
  salesTrends: Array<{ month: string; sales: number }>;
}

export interface NewProjectPayload {
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  startDate: string;
  buildingCount: number;
  availableUnits: number;
  blockedUnits: number;
  soldUnits: number;
}
