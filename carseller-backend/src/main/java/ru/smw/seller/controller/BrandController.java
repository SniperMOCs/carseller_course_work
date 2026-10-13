package ru.smw.seller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.smw.seller.model.Brand;
import ru.smw.seller.model.dto.BrandDTO;
import ru.smw.seller.service.BrandService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> getAllBrands(){
        List<Brand> brands = brandService.getAll();
        return ResponseEntity.ok(brands);
    }

    @GetMapping("/brand/{id}")
    public ResponseEntity<Brand> getById(@PathVariable Integer id){
        Brand brand = brandService.getById(id);
        return ResponseEntity.ok(brand);
    }
    
    @GetMapping("/brands/country/{id}")
    public ResponseEntity<List<Brand>> getByCountry(@PathVariable Integer id){
        List<Brand> brands = brandService.getByCountryId(id);
        return ResponseEntity.ok(brands);
    }

    @PostMapping("/brand/add")
    public ResponseEntity<Brand> addBrand(@RequestBody BrandDTO brandDTO){
        Brand brand = brandService.addBrand(brandDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(brand);
    }

    @PutMapping("/brand/update/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable Integer id, @RequestBody BrandDTO brandDTO){
        Brand brand = brandService.updateBrand(id, brandDTO);
        return ResponseEntity.ok(brand);
    }

    @PostMapping("/brand/delete/{id}")
    public ResponseEntity<?> deleteBrand(@PathVariable Integer id){
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }
    
}
