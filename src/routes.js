import Home from './pages/Home'
import NotFouund from './pages/NotFound'
import UserDetails from './pages/UserDetails'

import Login from './containers/Login'
import Register from './containers/Register'

export const routes = [
    {
        path: '/*',
        exact: true,
        component: <NotFouund />,
        auth: false
    },
    {
        path: '/Home',
        exact: true,
        component: <Home />,
        auth: false
    },
    {
        path: '/userDetails',
        exact: true,
        component: <UserDetails />,
        auth: true
    },
    {
        path: '/login',
        exact: true,
        component: <Login />,
        auth: false
    },
    {
        path: '/register',
        exact: true,
        component: <Register />,
        auth: false
    },
]