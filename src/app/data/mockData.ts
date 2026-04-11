export type FlatStatus = 'available' | 'blocked' | 'sold';

export interface Flat {
  id: string;
  number: string;
  buildingId: string;
  floor: number;
  type: string;
  area: number;
  price: number;
  status: FlatStatus;
  assignedAgent?: string;
  buyerName?: string;
  buyerContact?: string;
  lastUpdated: string;
  position?: { x: number; y: number; width: number; height: number };
}

export interface Floor {
  number: number;
  flats: Flat[];
}

export interface Building {
  id: string;
  name: string;
  projectId: string;
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
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
  blockedUnits: number;
  buildings: Building[];
  imageUrl: string;
  description: string;
  startDate: string;
}

export interface Activity {
  id: string;
  type: 'sold' | 'blocked' | 'released';
  flatNumber: string;
  agentName: string;
  timestamp: string;
  projectName: string;
}

// Mock flat data with positions for floor plan visualization
const generateFlatsForFloor = (buildingId: string, floor: number, startId: number): Flat[] => {
  const flatsPerFloor = 4;
  const flats: Flat[] = [];
  const statuses: FlatStatus[] = ['available', 'blocked', 'sold', 'available'];
  
  for (let i = 0; i < flatsPerFloor; i++) {
    const flatNumber = `${floor}0${i + 1}`;
    flats.push({
      id: `flat-${startId + i}`,
      number: flatNumber,
      buildingId,
      floor,
      type: i % 2 === 0 ? '2BHK' : '3BHK',
      area: i % 2 === 0 ? 1200 : 1650,
      price: (i % 2 === 0 ? 8500000 : 12500000) + (floor * 100000),
      status: statuses[i],
      assignedAgent: statuses[i] !== 'available' ? ['Rahul Sharma', 'Priya Patel', 'Amit Kumar'][i % 3] : undefined,
      buyerName: statuses[i] === 'sold' ? ['Mr. Agarwal', 'Ms. Reddy', 'Mr. Singh'][i % 3] : undefined,
      lastUpdated: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      position: {
        x: (i % 2) * 250 + 50,
        y: Math.floor(i / 2) * 180 + 50,
        width: 200,
        height: 150
      }
    });
  }
  
  return flats;
};

// Generate buildings
const generateBuildings = (projectId: string, count: number): Building[] => {
  const buildings: Building[] = [];
  
  for (let i = 0; i < count; i++) {
    const buildingId = `building-${projectId}-${i + 1}`;
    const floors = 10;
    const totalFlats = floors * 4;
    
    buildings.push({
      id: buildingId,
      name: `Tower ${String.fromCharCode(65 + i)}`,
      projectId,
      floors,
      totalFlats,
      availableFlats: Math.floor(totalFlats * 0.4),
      blockedFlats: Math.floor(totalFlats * 0.2),
      soldFlats: Math.floor(totalFlats * 0.4),
    });
  }
  
  return buildings;
};

// Generate all flats for a project
export const generateAllFlats = (projectId: string, buildingCount: number): Flat[] => {
  const allFlats: Flat[] = [];
  let flatIdCounter = 1;
  
  for (let b = 0; b < buildingCount; b++) {
    const buildingId = `building-${projectId}-${b + 1}`;
    for (let floor = 1; floor <= 10; floor++) {
      const flats = generateFlatsForFloor(buildingId, floor, flatIdCounter);
      allFlats.push(...flats);
      flatIdCounter += flats.length;
    }
  }
  
  return allFlats;
};

// Mock Projects
export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Sunrise Heights',
    location: 'Whitefield, Bangalore',
    totalUnits: 120,
    availableUnits: 48,
    soldUnits: 48,
    blockedUnits: 24,
    buildings: generateBuildings('project-1', 3),
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    description: 'Premium residential towers with world-class amenities',
    startDate: '2024-01-15'
  },
  {
    id: 'project-2',
    name: 'Green Valley Residency',
    location: 'HSR Layout, Bangalore',
    totalUnits: 80,
    availableUnits: 32,
    soldUnits: 32,
    blockedUnits: 16,
    buildings: generateBuildings('project-2', 2),
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    description: 'Eco-friendly apartments with lush green surroundings',
    startDate: '2024-03-20'
  },
  {
    id: 'project-3',
    name: 'Metro Square',
    location: 'Indiranagar, Bangalore',
    totalUnits: 160,
    availableUnits: 64,
    soldUnits: 64,
    blockedUnits: 32,
    buildings: generateBuildings('project-3', 4),
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    description: 'Urban living at its finest, near metro connectivity',
    startDate: '2023-11-10'
  },
  {
    id: 'project-4',
    name: 'Royal Gardens',
    location: 'Electronic City, Bangalore',
    totalUnits: 200,
    availableUnits: 80,
    soldUnits: 80,
    blockedUnits: 40,
    buildings: generateBuildings('project-4', 5),
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    description: 'Luxury apartments with expansive garden views',
    startDate: '2024-02-01'
  },
  {
    id: 'project-5',
    name: 'Skyline Towers',
    location: 'Koramangala, Bangalore',
    totalUnits: 100,
    availableUnits: 40,
    soldUnits: 40,
    blockedUnits: 20,
    buildings: generateBuildings('project-5', 2),
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'Contemporary high-rise living in prime location',
    startDate: '2024-04-05'
  },
  {
    id: 'project-6',
    name: 'Paradise Heights',
    location: 'Marathahalli, Bangalore',
    totalUnits: 140,
    availableUnits: 56,
    soldUnits: 56,
    blockedUnits: 28,
    buildings: generateBuildings('project-6', 3),
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    description: 'Modern living spaces with premium facilities',
    startDate: '2023-12-15'
  }
];

// Recent activities
export const recentActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'sold',
    flatNumber: '402',
    agentName: 'Rahul Sharma',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    projectName: 'Sunrise Heights'
  },
  {
    id: 'act-2',
    type: 'blocked',
    flatNumber: '305',
    agentName: 'Priya Patel',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    projectName: 'Green Valley Residency'
  },
  {
    id: 'act-3',
    type: 'sold',
    flatNumber: '801',
    agentName: 'Amit Kumar',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    projectName: 'Metro Square'
  },
  {
    id: 'act-4',
    type: 'released',
    flatNumber: '210',
    agentName: 'Sneha Gupta',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    projectName: 'Sunrise Heights'
  },
  {
    id: 'act-5',
    type: 'blocked',
    flatNumber: '503',
    agentName: 'Vikram Singh',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    projectName: 'Royal Gardens'
  },
  {
    id: 'act-6',
    type: 'sold',
    flatNumber: '607',
    agentName: 'Neha Reddy',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    projectName: 'Skyline Towers'
  }
];

// Analytics data
export const salesByFloor = [
  { floor: '1-2', sold: 24, available: 12, blocked: 8 },
  { floor: '3-4', sold: 28, available: 10, blocked: 6 },
  { floor: '5-6', sold: 32, available: 8, blocked: 4 },
  { floor: '7-8', sold: 36, available: 6, blocked: 2 },
  { floor: '9-10', sold: 40, available: 4, blocked: 4 },
];

export const revenueByBuilding = [
  { name: 'Tower A', revenue: 450000000 },
  { name: 'Tower B', revenue: 520000000 },
  { name: 'Tower C', revenue: 380000000 },
];

export const salesTrends = [
  { month: 'Jan', sales: 12 },
  { month: 'Feb', sales: 18 },
  { month: 'Mar', sales: 24 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 28 },
  { month: 'Jun', sales: 36 },
];
