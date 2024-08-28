import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import Home from '../pages/HomePage.jsx'
import Login from '../pages/LoginPage.jsx'

const routers = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/",
                element: <Home />,

            }
        ]
    }
])

export default routers;
