import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
import managementRoutes from 'app/views/management/ManagementRoutes'
import CreateSurveys from 'app/views/management/surveys/CreateSurveys'

export const AllPages = () => {
  const all_routes = [
    {
      element: (
        <AuthGuard>
          <MatxLayout />
        </AuthGuard>
      ),
      children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes, ...managementRoutes],
    },
    ...sessionRoutes,
    {
      path: '/',
      element: <Navigate to="dashboard/default" />,
    },
    {
      path: '/survey',
      element: <CreateSurveys />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]

  return all_routes
}
