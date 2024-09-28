package com.sjprogramming.restapi.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sjprogramming.restapi.entity.Reclamation;
import com.sjprogramming.restapi.entity.User;
import com.sjprogramming.restapi.repository.ReclamationRepository;
import com.sjprogramming.restapi.service.ReclamationService;
import com.sjprogramming.restapi.service.UserService;

@RestController
@RequestMapping("/api/reclamations")
@CrossOrigin(origins = "http://localhost:3000")

public class ReclamationController {

    @Autowired
    private ReclamationService reclamationService;
    @Autowired
    private ReclamationRepository reclamationRepository;
    @Autowired
    private UserService userService;
    @PostMapping
    public ResponseEntity<Reclamation> createReclamation(
            @RequestParam("image") MultipartFile image,
            @RequestParam("location") String location,
            @RequestParam("description") String description,
            @RequestParam("address") String address, // Ajoutez l'adresse ici
            @RequestParam("userId") Long userId) throws IOException {

        User user = userService.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Gérer l'utilisateur manquant
        }
     // Convertir l'image en tableau d'octets
        byte[] imageData = image.getBytes(); 

       

        Reclamation reclamation = new Reclamation();
        reclamation.setImageData(imageData); // Stockez l'image en tant que BLOB
        reclamation.setLocation(location);
        reclamation.setDescription(description);
        reclamation.setAddress(address); // Stockez l'adresse ici
        reclamation.setUser(user); // Définissez l'utilisateur qui a soumis la réclamation

        reclamation = reclamationService.createReclamation(reclamation);
        return ResponseEntity.status(HttpStatus.CREATED).body(reclamation);
    }






    private String saveImage(MultipartFile image) throws IOException {
        String uploadDir = "uploads/";
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdir();
        }
        
        String imagePath = uploadDir + image.getOriginalFilename();
        Path path = Paths.get(imagePath);
        Files.write(path, image.getBytes());
        return imagePath;
    }

    @GetMapping("/{id}")
    public Reclamation getReclamationById(@PathVariable Long id) {
        return reclamationService.getReclamationById(id);
    }

    @GetMapping
    public List<Reclamation> getAllReclamations(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return reclamationService.getReclamationsByUserId(userId);
        }
        return reclamationService.getAllReclamations();
    }


    @DeleteMapping("/{id}")
    public void deleteReclamation(@PathVariable Long id) {
        reclamationService.deleteReclamation(id);
    }
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Reclamation reclamation = reclamationService.getReclamationById(id);
        if (reclamation == null || reclamation.getImageData() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .header("Content-Type", "image/jpeg") // ou un autre type d'image
                .body(reclamation.getImageData());
    }
    
    
    
    
    
    @PutMapping("/{id}/etat")
    public ResponseEntity<Reclamation> acceptReclamation(@PathVariable Long id) {
        Reclamation updatedReclamation = reclamationService.changeEtatToAccepted(id);
        if (updatedReclamation != null) {
            return ResponseEntity.ok(updatedReclamation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
