import { createBrowserRouter } from 'react-router';
import { Layout } from './pages/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Inventory } from './pages/Inventory';
import { Analytics } from './pages/Analytics';
import { Activity } from './pages/Activity';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: 'projects',
        Component: Projects
      },
      {
        path: 'projects/:projectId',
        Component: ProjectDetail
      },
      {
        path: 'inventory',
        Component: Inventory
      },
      {
        path: 'analytics',
        Component: Analytics
      },
      {
        path: 'activity',
        Component: Activity
      },
      {
        path: '*',
        Component: NotFound
      }
    ]
  }
]);