import { createBrowserRouter } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../hooks/AuthContext.jsx'
import App from '../App.jsx'
import Home from '../pages/Home/HomePage.jsx'
import Login from '../pages/Login/LoginPage.jsx'
import Cadastro from '../pages/CadastroUsuario/CadastroPage.jsx'
import ListarUsuariosPage from '../pages/GerenciarUsuario/ListarUsuariosPage.jsx'
import EditarUsuarioPage from '../pages/GerenciarUsuario/EditarUsuarioPage.jsx'

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
                element: <Private Item={Home} />
            },
            {
                path: "/users",
                element: <Private Item={ListarUsuariosPage} />
            },
            {
                path: "/users/:id",
                element: <Private Item={EditarUsuarioPage} />
            }
        ]
    }
])

export default routers;