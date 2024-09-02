import { Link } from "react-router-dom";
import "./style.css";


function NavBar() {
    return (
        <header className="background-header">
            <div className="container">
                <div><Link to="/" className="logo">Revisão FMT</Link></div>
            </div>
        </header>
    )
}

export default NavBar;
