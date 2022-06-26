import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppSurveys = Loadable(lazy(() => import("./surveys/AppSurveys")));
const AppVisitors = Loadable(lazy(() => import("./visitors/AppVisitors")));

const managementRoutes = [
  {
    path: '/manajemen/surveys',
    element: <AppSurveys />,
  },
  {
    path: '/manajemen/visitors',
    element: <AppVisitors />,
  },
]

export default managementRoutes
