import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation(); // Récupérer l'objet de localisation

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to={{
                        pathname: "/reclamation",
                        state: { userId: location.state?.userId } // Passer l'userId via l'état
                    }}>
                        Réclamations
                    </Link>
                </li>
                <li>
                <Link to={{
    pathname: "/userreclam",
    state: { userId: location.state?.userId } // Passer l'userId via l'état
}}>
    Voir Demandes
</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
