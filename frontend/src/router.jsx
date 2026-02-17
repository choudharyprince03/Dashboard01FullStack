
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import PermissionRoute from './auth/PermissionGate';
import { PERMISSIONS } from './utils/Permissions';
import DashboardLayout from './layout/DashboardLayout';
import Tasks from './Pages/Tasks';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import Insights from './Pages/Insights';
import Admin from './Pages/Admin';

const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/signup',
        element:<Signup />
    },
    {
        element:(
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children:[
            {   path:'/',
                element: <Dashboard />
            },
            {
                path:"/tasks",
                element:<Tasks />
            },
            {
                path: "/insights",
                element: (
                <PermissionRoute requiredPermission={PERMISSIONS.VIEW_AI_INSIGHTS}>
                    <Insights />
                </PermissionRoute> 
                )
            },
            {
                path: "/admin",
                element: (
                <PermissionRoute requiredPermission={PERMISSIONS.VIEW_USERS}>
                    <Admin />
                </PermissionRoute>
                )
            }
        ]
    }
])
export default router; 