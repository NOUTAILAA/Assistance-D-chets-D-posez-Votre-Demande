// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import ReclamationForm from './components/user/ReclamationForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AllReclamations from './components/admin/reclamations/AllReclamation'; // Importez le nouveau composant
import AllUsers from './components/admin/users/AllUsers'; 
import EditUser from './components/admin/users/EditUser';
import AddUser from './components/admin/users/AddUser';
import UserReclamations from './components/user/UserReclamation';
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/register" element={<UserForm />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/reclamation" element={<ReclamationForm />} />
                    <Route path="/all-reclamations" element={<AllReclamations />} /> {/* Nouvelle route */}
                    <Route path="/users" element={<AllUsers/>} /> {/* Nouvelle route */}
                    <Route path="/add-user" element={<AddUser />} />
                    <Route path="/edit-user/:id" element={<EditUser />} />
                    <Route path="/user-reclamations" element={<UserReclamations />} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;
