import React, { useEffect, useState } from 'react';
import './AllReclamations.css'; // Import the CSS file for custom styles
import Navbar from '../Navbar';

const AllReclamations = () => {
    const [reclamations, setReclamations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState({});

    useEffect(() => {
        const fetchReclamations = async () => {
            try {
                const response = await fetch('http://localhost:8090/api/reclamations');
                if (response.ok) {
                    const data = await response.json();
                    setReclamations(data);
                    // Load images
                    await loadImages(data);
                } else {
                    console.error('Error fetching reclamations');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReclamations();
    }, []);

    const loadImages = async (reclamations) => {
        const newImages = {};
        await Promise.all(
            reclamations.map(async (reclamation) => {
                const imageUrl = await fetchImage(reclamation.id);
                if (imageUrl) {
                    newImages[reclamation.id] = imageUrl;
                }
            })
        );
        setImages(newImages);
    };

    const fetchImage = async (reclamationId) => {
        const response = await fetch(`http://localhost:8090/api/reclamations/${reclamationId}/image`);
        if (response.ok) {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } else {
            console.error('Error fetching image for reclamation:', reclamationId);
            return null;
        }
    };

    // Function to accept the reclamation
    const acceptReclamation = async (id) => {
        try {
            const response = await fetch(`http://localhost:8090/api/reclamations/${id}/etat`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                // Update the reclamations state
                setReclamations((prev) =>
                    prev.map((reclamation) =>
                        reclamation.id === id ? { ...reclamation, etat: 'Acceptée' } : reclamation
                    )
                );
            } else {
                console.error('Error accepting reclamation');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="reclamation-container">
            <Navbar />
            <h1>Liste des Réclamations</h1>
            {reclamations.length === 0 ? (
                <p>Aucune réclamation trouvée.</p>
            ) : (
                <div className="reclamation-grid">
                    {reclamations.map((reclamation) => (
                        <div key={reclamation.id} className="reclamation-card">
                            <p><strong>Description:</strong> {reclamation.description}</p>
                            <p><strong>Location:</strong> {reclamation.address}</p>
                            <p><strong>Utilisateur:</strong> {reclamation.user ? reclamation.user.username : 'N/A'}</p>
                            {images[reclamation.id] ? (
                                <img
                                    src={images[reclamation.id]}
                                    alt={`Image for reclamation ${reclamation.id}`}
                                    className="reclamation-image"
                                />
                            ) : (
                                <p>Aucune image disponible.</p>
                            )}
                            <button 
                                onClick={() => acceptReclamation(reclamation.id)}
                                className="accept-button"
                                disabled={reclamation.etat === 'Acceptée'} // Disable if already accepted
                            >
                                Accepter
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllReclamations;
