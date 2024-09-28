// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <div>
                <Link to="/register">
                    <button>S'inscrire</button>
                </Link>
                <Link to="/login">
                    <button>Se connecter</button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
