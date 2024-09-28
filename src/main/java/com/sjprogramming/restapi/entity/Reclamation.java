package com.sjprogramming.restapi.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reclamation")
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private byte[] imageData; // Champ pour stocker l'image en tant que BLOB
    private String location; // Pour les coordonnées
    private String description;
    private LocalDateTime createdAt;
    private String address; // Ajoutez ce champ

    // Champs pour la localisation
    private double lat;
    private double lng;
    // Getters et setters...

    public Reclamation() {
        this.createdAt = LocalDateTime.now(); // Par défaut, on initialise la date
        this.etat = "En traitement"; // Valeur par défaut pour l'état
    }

    // ... autres méthodes (getters/setters)

@ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

private String etat; // Nouveau champ pour l'état de la réclamation (ex: "Nouveau", "En cours", "Résolu")

	public String getEtat() {
	return etat;
}
public void setEtat(String etat) {
	this.etat = etat;
}
	public Reclamation(Long id, byte[] imageData, String location, String description, LocalDateTime createdAt,
		String address, double lat, double lng, User user, String etat) {
	super();
	this.id = id;
	this.imageData = imageData;
	this.location = location;
	this.description = description;
	this.createdAt = createdAt;
	this.address = address;
	this.lat = lat;
	this.lng = lng;
	this.user = user;
	this.etat = etat;
}
	public Reclamation(Long id, byte[] imageData, String location, String description, LocalDateTime createdAt,
			String address, double lat, double lng, User user) {
		super();
		this.id = id;
		this.imageData = imageData;
		this.location = location;
		this.description = description;
		this.createdAt = createdAt;
		this.address = address;
		this.lat = lat;
		this.lng = lng;
		this.user = user;
	}
	public String getAddress() {
	return address;
}
public void setAddress(String address) {
	this.address = address;
}
public double getLat() {
	return lat;
}
public void setLat(double lat) {
	this.lat = lat;
}
public double getLng() {
	return lng;
}
public void setLng(double lng) {
	this.lng = lng;
}
	public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

}
