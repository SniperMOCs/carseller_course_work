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

import ru.smw.seller.model.Country;
import ru.smw.seller.service.CountryService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CountryController {
    @Autowired
    private CountryService countryService;

    @GetMapping("/countries")
    public ResponseEntity<List<Country>> getAllCountries(){
        List<Country> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }

    @GetMapping("/country/{id}")
    public ResponseEntity<Country> getCountry(@PathVariable Integer id){
        Country country = countryService.getById(id);
        return ResponseEntity.ok(country);
    }

    @PostMapping("/country/add")
    public ResponseEntity<Country> addCountry(@RequestBody Country newCountry){
        Country country = countryService.addCountry(newCountry);
        return ResponseEntity.status(HttpStatus.CREATED).body(country);
    }

    @PutMapping("/country/update/{id}")
    public ResponseEntity<Country> updateCountry(@PathVariable Integer id, @RequestBody Country newCountry){
        Country country = countryService.updateCountry(id, newCountry);
        return ResponseEntity.ok(country);
    }

    @PostMapping("/country/delete/{id}")
    public ResponseEntity<?> deleteCountry(@PathVariable Integer id) {
        countryService.deleteCountry(id);
        return ResponseEntity.noContent().build();
    }
    

}
