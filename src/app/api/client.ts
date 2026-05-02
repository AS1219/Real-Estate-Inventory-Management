import type { Project, Flat, Activity, AnalyticsData } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${input}`, init);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || 'Unable to fetch data');
  }

  return data.data as T;
}

export async function getProjects(): Promise<Project[]> {
  return fetchJson<Project[]>('/api/projects');
}

export async function getProject(id: string): Promise<Project> {
  return fetchJson<Project>(`/api/projects/${encodeURIComponent(id)}`);
}

export async function createProject(payload: Partial<Project> & { buildingCount: number }): Promise<Project> {
  return fetchJson<Project>('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function updateProject(id: string, payload: Partial<Project>): Promise<Project> {
  return fetchJson<Project>(`/api/projects/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function deleteProject(id: string): Promise<void> {
  await fetch(`${BASE_URL}/api/projects/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}

export async function getFlats(projectId?: string): Promise<Flat[]> {
  const query = projectId ? `?projectId=${encodeURIComponent(projectId)}` : '';
  return fetchJson<Flat[]>(`/api/flats${query}`);
}

export async function getFlatById(id: string): Promise<Flat> {
  return fetchJson<Flat>(`/api/flats/${encodeURIComponent(id)}`);
}

export async function updateFlatStatus(id: string, status: string): Promise<Flat> {
  return fetchJson<Flat>(`/api/flats/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
}

export async function getActivities(): Promise<Activity[]> {
  return fetchJson<Activity[]>('/api/activities');
}

export async function getAnalytics(): Promise<AnalyticsData> {
  return fetchJson<AnalyticsData>('/api/analytics');
}
