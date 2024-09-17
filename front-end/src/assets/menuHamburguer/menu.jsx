import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { AuthContext } from '../../hooks/AuthContext';


function Menu() {
    const [isOpen, setOpen] = useState(false)
    const { logado, logout, isAdmin, userId } = useContext(AuthContext);

    const toggleMenu = () => {
        setOpen(!isOpen);
    };

    return (
        <div>
            <div className={isOpen ? 'icon iconActive' : 'icon'} onClick={toggleMenu}>
                <div className="hamburguer hamburguerIcon"></div>
            </div>
            <div className={isOpen ? 'menu menuOpen' : 'menu menuClose'}>
                <div className="list">
                    <ul className="listItems">
                        { logado ? (
                            <>
                                <li><Link to="/" className="link-menu" onClick={toggleMenu}>Home</Link></li>
                                <li><Link to={isAdmin ? "/users" : `/users/${userId}`} className="link-menu" onClick={toggleMenu}>Usuários</Link></li>
                                <li><Link to="/login" onClick={() => { toggleMenu(); logout(); }} className="link-menu">Sair</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/register" className="link-menu" onClick={toggleMenu}>Cadastre-se</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu;
