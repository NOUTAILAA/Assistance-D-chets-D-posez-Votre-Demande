package com.sjprogramming.restapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjprogramming.restapi.entity.Reclamation;
import com.sjprogramming.restapi.repository.ReclamationRepository;

@Service
public class ReclamationService {

    @Autowired
    private ReclamationRepository reclamationRepository;

    public Reclamation createReclamation(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    public Reclamation getReclamationById(Long id) {
        return reclamationRepository.findById(id).orElse(null);
    }

    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    public void deleteReclamation(Long id) {
        reclamationRepository.deleteById(id);
    }
    public List<Reclamation> getReclamationsByUserId(Long userId) {
        return reclamationRepository.findByUserId(userId);
    }

    
    public Reclamation changeEtatToAccepted(Long id) {
        // Récupérer la réclamation par son ID
        return reclamationRepository.findById(id).map(reclamation -> {
            reclamation.setEtat("Acceptée"); // Met à jour l'état
            return reclamationRepository.save(reclamation); // Enregistre la réclamation mise à jour
        }).orElse(null); // Retourne null si la réclamation n'est pas trouvée
    }
}
