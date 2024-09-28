import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [user, setUser] = useState({ username: '', password: '', email: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8090/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                navigate('/all-users');
            } else {
                console.error('Error adding user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter un Utilisateur</h2>
            <input name="username" value={user.username} onChange={handleInputChange} placeholder="Nom d'utilisateur" required />
            <input name="password" type="password" value={user.password} onChange={handleInputChange} placeholder="Mot de passe" required />
            <input name="email" value={user.email} onChange={handleInputChange} placeholder="Email" required />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default AddUser;
