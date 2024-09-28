import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add your custom CSS if needed

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/all-reclamations">Réclamations</Link>
                </li>
                <li>
                    <Link to="/users">Utilisateurs</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
