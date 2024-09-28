import React, { useState } from 'react';
import './UserForm.css'; // Import the CSS file

const UserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password, email };

        try {
            const response = await fetch('http://localhost:8090/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                alert('User created successfully!');
            } else {
                alert('Error creating user');
            }
        } catch (error) {
            console.error(error);
            alert('Error creating user');
        }
    };

    return (
        <div className="user-form-container">
            <h2>Register User</h2>
            <form className="user-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="user-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="user-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="user-input"
                />
                <button type="submit" className="user-button">Register</button>
            </form>
        </div>
    );
};

export default UserForm;
