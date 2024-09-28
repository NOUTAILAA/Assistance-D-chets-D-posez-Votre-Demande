import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to Add/Edit pages
import './AllUsers.css';
import Navbar from '../Navbar';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // For navigation

    // Fetch all users from the API
    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const response = await fetch('http://localhost:8090/api/users');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Error fetching users');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle delete user
    const handleDelete = async(id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:8090/api/users/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setUsers(users.filter((user) => user.id !== id));
                } else {
                    console.error('Error deleting user');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    if (loading) {
        return <p > Loading users... < /p>;
    }

    return ( <
        div className = "users-container" >
        <
        Navbar / >
        <
        h1 > Liste des Utilisateurs < /h1> <
        button onClick = {
            () => navigate('/add-user') }
        className = "add-btn" > Ajouter un Utilisateur < /button> {
            users.length === 0 ? ( <
                p > Aucun utilisateur trouvé. < /p>
            ) : ( <
                table className = "users-table" >
                <
                thead >
                <
                tr >
                <
                th > ID < /th> <
                th > Nom d 'utilisateur</th> <
                th > Email < /th> <
                th > Password < /th> <
                th > Actions < /th> <
                /tr> <
                /thead> <
                tbody > {
                    users.map((user) => ( <
                        tr key = { user.id } >
                        <
                        td > { user.id } < /td> <
                        td > { user.username } < /td> <
                        td > { user.email } < /td> <
                        td > { user.password } < /td> <
                        td >
                        <
                        button onClick = {
                            () => navigate(`/edit-user/${user.id}`) }
                        className = "edit-btn" > Modifier < /button> <
                        button onClick = {
                            () => handleDelete(user.id) }
                        className = "delete-btn" > Supprimer < /button> <
                        /td> <
                        /tr>
                    ))
                } <
                /tbody> <
                /table>
            )
        } <
        /div>
    );
};

export default AllUsers;