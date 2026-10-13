package ru.smw.seller.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.smw.seller.model.Advertisement;
import ru.smw.seller.model.dto.AdDTO;
import ru.smw.seller.model.enums.AdStatus;
import ru.smw.seller.security.user.SecurityUser;
import ru.smw.seller.service.AdService;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdvertisementController {
    @Autowired
    private AdService adService;

    @GetMapping("/ads")
    public ResponseEntity<List<Advertisement>> getAllAds(){
        List<Advertisement> ads = adService.getAll();
        return ResponseEntity.ok(ads);
    }

    @GetMapping("/ads/user={id}")
    public ResponseEntity<List<Advertisement>> getByUser(@PathVariable Integer id){
        List<Advertisement> ads = adService.getByUser(id, AdStatus.PUBLISHED);
        return ResponseEntity.ok(ads);
    }

    @GetMapping("/ads/brand={id}")
    public ResponseEntity<List<Advertisement>> getByBrand(@PathVariable Integer id){
        List<Advertisement> ads = adService.getByBrand(id, AdStatus.PUBLISHED);
        return ResponseEntity.ok(ads);
    }

    @GetMapping("/ads/country={id}")
    public ResponseEntity<List<Advertisement>> getByCountry(@PathVariable Integer id){
        List<Advertisement> ads = adService.getByCountry(id, AdStatus.PUBLISHED);
        return ResponseEntity.ok(ads);
    }

    @GetMapping("/ads/car={id}")
    public ResponseEntity<List<Advertisement>> getByCar(@PathVariable Integer id){
        List<Advertisement> ads = adService.getByCar(id, AdStatus.PUBLISHED);
        return ResponseEntity.ok(ads);
    }

    @GetMapping("/ads/my")
    public ResponseEntity<List<Advertisement>> getMyActive(@AuthenticationPrincipal SecurityUser securityUser){
        List<Advertisement> ads = adService.getByUser(securityUser.getUser().getId(), AdStatus.PUBLISHED);
        return ResponseEntity.ok(ads);
    }

    @GetMapping("/ads/my/hidden")
    public ResponseEntity<List<Advertisement>> getMyHidden(@AuthenticationPrincipal SecurityUser securityUser){
        List<Advertisement> ads = adService.getByUser(securityUser.getUser().getId(), AdStatus.HIDDEN);
        return ResponseEntity.ok(ads);
    }

    @GetMapping("/ads/my/archived")
    public ResponseEntity<List<Advertisement>> getMySold(@AuthenticationPrincipal SecurityUser securityUser){
        List<Advertisement> ads = adService.getByUser(securityUser.getUser().getId(), AdStatus.ARCHIVED);
        return ResponseEntity.ok(ads);
    }

    @GetMapping("/ad/{id}")
    public ResponseEntity<Advertisement> getById(@PathVariable Integer id){
        Advertisement ad = adService.getById(id);
        return ResponseEntity.ok(ad);
    }

    @PostMapping(value = "/ads/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Advertisement> addAd(@ModelAttribute AdDTO dto) throws IOException{
        Advertisement ad = adService.addAd(dto);
        return ResponseEntity.ok(ad);
    }

    @PutMapping("/ad/update/{id}")
    public ResponseEntity<Advertisement> updateAd(@RequestBody AdDTO dto, @PathVariable Integer id){
        Advertisement newAd = adService.updatedAd(dto, id);
        return ResponseEntity.ok(newAd);
    }

    @PostMapping("/ad/delete/{id}")
    public ResponseEntity<?> deleteAd(@PathVariable Integer id){
        adService.deleteAd(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/ad/setStatus/{id}")
    public ResponseEntity<Advertisement> setAdStatus(@PathVariable Integer id, @RequestBody String status) {
        Advertisement ad = adService.setStatus(id, status);
        return ResponseEntity.ok(ad);
    }
}
