import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import Home from '../pages/Home/HomePage.jsx'
import Login from '../pages/Login/LoginPage.jsx'
import Cadastro from '../pages/CadastroUsuario/CadastroPage.jsx'
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContext } from '../hooks/AuthContext.jsx';

export const Private = ({ Item }) => {
    const { logado } = useContext(AuthContext)
    return logado ? <Item /> : <Login />;
};

Private.propTypes = {
    Item: PropTypes.elementType.isRequired
};

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
                path: "/register",
                element: <Cadastro />
            },
            {
                path: "/",
                element: <Private  Item={Home}/>,

            }
        ]
    }
])

export default routers;
