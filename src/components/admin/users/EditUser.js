import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css'; // Import the custom CSS

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ username: '', password: '', email: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8090/api/users/${id}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setErrorMessage('Failed to load user data.');
            }
        };
        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8090/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                setSuccessMessage('User successfully updated!');
                setTimeout(() => navigate('/all-users'), 2000); // Redirect after 2 seconds
            } else {
                setErrorMessage('Failed to update user.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while updating the user.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Modifier l'utilisateur</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <input
                name="username"
                value={user.username}
                onChange={handleInputChange}
                placeholder="Nom d'utilisateur"
                required
            />
            <input
                name="password"
                type="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Mot de passe"
                required
            />
            <input
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
            />
            <button type="submit">Modifier</button>
        </form>
    );
};

export default EditUser;
