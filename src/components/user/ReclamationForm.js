import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {  useLocation } from 'react-router-dom';
const ReclamationForm = () => {
    const location = useLocation(); 
    const [image, setImage] = useState(null);
    const [locationCoords, setLocationCoords] = useState({ lat: 0, lng: 0 });
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const userId = location.state?.userId; // Access the userId passed from LoginForm
   
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const fetchAddress = async (lat, lng) => {
        try {
            const response = await fetch(`http://localhost:8090/api/geocode?lat=${lat}&lng=${lng}`);
            const data = await response.json();
            return data.display_name;
        } catch (error) {
            console.error("Error fetching address:", error);
            return null;
        }
    };

    const MapClickHandler = () => {
        useMapEvents({
            click: async (e) => {
                setLocationCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
                const fetchedAddress = await fetchAddress(e.latlng.lat, e.latlng.lng);
                if (fetchedAddress) {
                    setAddress(fetchedAddress);
                }
            },
        });
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Assurez-vous que l'image est sélectionnée
        if (!image) {
            alert("Please select an image.");
            return;
        }
    
        const actualUserId = userId?.id;
    
        if (!actualUserId || isNaN(Number(actualUserId))) {
            alert("Invalid User ID.");
            return;
        }
    
        const formData = new FormData();
        formData.append('image', image);
        formData.append('location', JSON.stringify(locationCoords));
        formData.append('description', description);
        formData.append('address', address); // Ajoutez l'adresse ici
        formData.append('userId', actualUserId);
    
        try {
            const response = await fetch('http://localhost:8090/api/reclamations', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                alert('Reclamation submitted successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error data:', errorData);
                alert('Error submitting reclamation');
            }
        } catch (error) {
            console.error('Request failed', error);
            alert('Error submitting reclamation');
        }
    };
    
    
    
    

    return (
        <div>
        
        <form onSubmit={handleSubmit}>
        
            <input type="file" onChange={handleImageChange} required />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <MapContainer center={[locationCoords.lat || 48.8566, locationCoords.lng || 2.3522]} zoom={13} style={{ height: '300px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClickHandler />
                {locationCoords.lat !== 0 && locationCoords.lng !== 0 && (
                    <Marker position={[locationCoords.lat, locationCoords.lng]} icon={L.icon({ iconUrl: 'marker-icon.png' })} />
                )}
            </MapContainer>
            <button type="submit">Submit Reclamation</button>
            {locationCoords.lat !== 0 && locationCoords.lng !== 0 && (
                <p>Selected Position: Latitude: {locationCoords.lat}, Longitude: {locationCoords.lng}</p>
            )}
            {address && <p>Address: {address}</p>}
        </form>
        
        </div>
    );
};

export default ReclamationForm;
