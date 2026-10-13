package ru.smw.seller.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import ru.smw.seller.model.Photo;
import ru.smw.seller.model.dto.PhotoDTO;
import ru.smw.seller.service.PhotoService;

@RestController
@RequestMapping("/api/photos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    @Autowired
    private HttpServletRequest request;
    
    @GetMapping("/ad={id}")
    public ResponseEntity<List<PhotoDTO>> getByAd(@PathVariable Integer id){
        String baseUrl = request.getRequestURL().toString().replace(request.getRequestURI(), request.getContextPath());
        List<PhotoDTO> dtos = photoService.getByAd(id, baseUrl);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhotoDTO> getPhotoById(@PathVariable Integer id){
        String baseUrl = request.getRequestURL().toString().replace(request.getRequestURI(), request.getContextPath());
        PhotoDTO dto = photoService.getDto(id, baseUrl);
        return ResponseEntity.ok(dto);
    }

    @PostMapping(value = "/ad={id}/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addPhoto(
        @PathVariable Integer id,
        @RequestParam MultipartFile file
    ) throws IOException {
        Photo photo = photoService.addPhoto(id, file);
        return ResponseEntity.ok(photo);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deletePhoto(@PathVariable Integer id) throws IOException{
        photoService.deletePhoto(id);
        return ResponseEntity.noContent().build();
    }
}
