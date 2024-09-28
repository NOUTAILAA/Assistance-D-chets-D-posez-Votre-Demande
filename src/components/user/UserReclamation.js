import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const UserReclamations = () => {
    const location = useLocation();
    const userId = location.state?.userId; // Retrieve userId passed from the previous page
    const [reclamations, setReclamations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("User ID in UserReclamations:", userId); // Log the userId
        const fetchReclamations = async () => {
            if (!userId) {
                console.error('User ID is not defined');
                return; // Prevent fetching if userId is undefined
            }
            try {
                const response = await fetch(`http://localhost:8090/api/reclamations?userId=${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched Reclamations:", data);
                    setReclamations(data);
                } else {
                    console.error('Error fetching reclamations');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReclamations();
    }, [userId]);

    return (
        <div>
            <Navbar />
            <h2>Your Reclamations</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Address</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reclamations.length > 0 ? (
                            reclamations.map(reclamation => (
                                <tr key={reclamation.id}>
                                    <td>{reclamation.id}</td>
                                    <td>{reclamation.description}</td>
                                    <td>{reclamation.location}</td>
                                    <td>{reclamation.address}</td>
                                    <td>{reclamation.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No reclamations found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserReclamations;
