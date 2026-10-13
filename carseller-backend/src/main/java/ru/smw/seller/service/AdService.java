package ru.smw.seller.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import ru.smw.seller.exceptions.ResourceNotFoundException;
import ru.smw.seller.model.Advertisement;
import ru.smw.seller.model.Car;
import ru.smw.seller.model.Photo;
import ru.smw.seller.model.User;
import ru.smw.seller.model.dto.AdDTO;
import ru.smw.seller.model.enums.AdStatus;
import ru.smw.seller.repository.AdvertisementRepository;

@Service
public class AdService {
    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Autowired
    private CarService carService;

    @Autowired
    private UserService userService;

    @Value("${file.upload.directory}") 
    private String uploadDirectory;

    public List<Advertisement> getAll(){
        return advertisementRepository.findByStatus(AdStatus.PUBLISHED);
    }

    public List<Advertisement> getByUser(Integer id, AdStatus status){
        return advertisementRepository.findByPublisherIdAndStatus(id, status);
    }

    public List<Advertisement> getByBrand(Integer id, AdStatus status){
        return advertisementRepository.findByCarBrandIdAndStatus(id, status);
    }

    public List<Advertisement> getByCountry(Integer id, AdStatus status){
        return advertisementRepository.findByCarBrandCountryIdAndStatus(id, status);
    }

    public List<Advertisement> getByCar(Integer id, AdStatus status){
        return advertisementRepository.findByCarIdAndStatus(id, status);
    }

    public Advertisement getById(Integer id){
        Advertisement ad = advertisementRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Advertisement not found" + id));
        return ad;
    }

    @Transactional
    public Advertisement addAd(AdDTO dto) throws IOException{
        User user = userService.getById(dto.getPublisherId());
        Car car = carService.getById(dto.getCarId());
        if (user == null || car == null){
            throw new ResourceNotFoundException();
        }
        Advertisement newAd = new Advertisement();
        newAd.setCar(car);
        newAd.setChassisNumber(dto.getChassisNumber());
        newAd.setColor(dto.getColor());
        newAd.setCreatedAt(LocalDateTime.now());
        newAd.setEngineCC(dto.getEngineCC());
        newAd.setEnginePower(dto.getEnginePower());
        newAd.setFuelType(dto.getFuelType());
        newAd.setGearbox(dto.getGearbox());
        newAd.setMileage(dto.getMileage());
        newAd.setPrice(dto.getPrice());
        newAd.setPublisher(user);
        newAd.setStatus(dto.getStatus());
        newAd.setPrice(dto.getPrice());
        newAd.setSteeringPlacement(dto.getSteeringPlacement());
        newAd.setYear(dto.getYear());
        newAd.setDescription(dto.getDescription());

        for (MultipartFile file : dto.getPhotoFiles()){
            if (!file.isEmpty()){
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                String projectPath = System.getProperty("user.dir");
                String uploadPath = projectPath + File.separator + uploadDirectory;
                Path filePath = Path.of(uploadPath, fileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                String mimeType = file.getContentType();
                Photo photo = new Photo(fileName, mimeType, newAd);
                newAd.getPhotos().add(photo);
            }   
        }
        return advertisementRepository.save(newAd);
    }   

    @Transactional
    public Advertisement setStatus(Integer id, String status){
        Advertisement ad = getById(id);
        String newStatus = status.replace("\"", "");
        AdStatus adStatus = Arrays.stream(AdStatus.values())
            .filter(v -> v.name().equalsIgnoreCase(newStatus))
            .findFirst()
            .orElse(ad.getStatus());
        if (adStatus == AdStatus.SOLD){
            ad.setSoldAt(LocalDateTime.now());
            adStatus = AdStatus.ARCHIVED;
        }
        else{
            ad.setSoldAt(null);
        }
        ad.setStatus(adStatus);
        return ad;
    }

    @Transactional
    public Advertisement updatedAd(AdDTO dto, Integer id){
        User user = userService.getById(dto.getPublisherId());
        Car car = carService.getById(dto.getCarId());
        Advertisement newAd = getById(id);
        if (user == null || car == null || newAd == null){
            throw new ResourceNotFoundException();
        }
        
        newAd.setCar(car);
        newAd.setChassisNumber(dto.getChassisNumber());
        newAd.setColor(dto.getColor());
        newAd.setCreatedAt(LocalDateTime.now());
        newAd.setEngineCC(dto.getEngineCC());
        newAd.setEnginePower(dto.getEnginePower());
        newAd.setFuelType(dto.getFuelType());
        newAd.setGearbox(dto.getGearbox());
        newAd.setMileage(dto.getMileage());
        newAd.setPrice(dto.getPrice());
        newAd.setSteeringPlacement(dto.getSteeringPlacement());
        newAd.setYear(dto.getYear());
        newAd.setDescription(dto.getDescription());
        return newAd;
    }

    @Transactional
    public void deleteAd(Integer id){
        Advertisement ad = advertisementRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        advertisementRepository.delete(ad);
    }
}
