import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './styles.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'


const router = createBrowserRouter([
{ path: '/', element: <App />, children: [
{ index: true, element: <Dashboard/> },
{ path: 'applications', element: <Applications/> }
]},
{ path: '/login', element: <Login/> },
{ path: '/register', element: <Register/> },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<RouterProvider router={router} />
</React.StrictMode>
)
