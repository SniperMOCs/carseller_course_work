package ru.smw.seller.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import ru.smw.seller.exceptions.PhotoLimitExceededException;
import ru.smw.seller.exceptions.ResourceNotFoundException;
import ru.smw.seller.model.Advertisement;
import ru.smw.seller.model.Photo;
import ru.smw.seller.model.dto.PhotoDTO;
import ru.smw.seller.repository.AdvertisementRepository;
import ru.smw.seller.repository.PhotoRepository;

@Service
public class PhotoService {
    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Value("${file.upload.directory}") 
    private String uploadDirectory;

    public List<PhotoDTO> getByAd(Integer id, String baseUrl){
        List<Photo> photos = photoRepository.findByAdId(id);
        List<PhotoDTO> dtos = photos.stream()
            .map(photo -> {
                String fileUrl = baseUrl + File.separator + uploadDirectory + File.separator + photo.getFileName();
                PhotoDTO dto = new PhotoDTO(photo.getId(), photo.getAd().getId(), fileUrl);
                return dto;
            })
            .collect(Collectors.toList());
        return dtos;
    }

    public PhotoDTO getDto(Integer id, String baseUrl){
        Photo photo = photoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());

        String fileName = photo.getFileName();
        String filePath = uploadDirectory + "/" + fileName;
        File file = new File(filePath);
        if (!file.exists()){
            throw new ResourceNotFoundException();
        }
        
        String fileUrl = baseUrl + File.separator + uploadDirectory + File.separator + photo.getFileName();

        PhotoDTO dto = new PhotoDTO(photo.getId(), photo.getAd().getId(), fileUrl);
    
        return dto;
    }

    @Transactional
    public Photo addPhoto(Integer adId, MultipartFile file) throws IOException{
        Advertisement ad = advertisementRepository.findById(adId).orElseThrow(() -> new ResourceNotFoundException());
        if (ad.getPhotos().size() >= 70){
            throw new PhotoLimitExceededException(70);
        }
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        String projectPath = System.getProperty("user.dir");
        String uploadPath = projectPath + File.separator + uploadDirectory;
        Path filePath = Path.of(uploadPath, fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        String mimeType = file.getContentType();
        Photo photo = new Photo(fileName, mimeType, ad);
        return photoRepository.save(photo);
    }

    @Transactional
    public void deletePhoto(Integer id) throws IOException{
        Photo photo = photoRepository.findById(id).orElse(null);
        if (photo != null){
            Path filePath = Paths.get(uploadDirectory, photo.getFileName());
            Files.deleteIfExists(filePath);
            photoRepository.deleteById(id);
        }
    }
}
