package ru.smw.seller.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import ru.smw.seller.exceptions.ResourceNotFoundException;
import ru.smw.seller.model.Country;
import ru.smw.seller.repository.CountryRepository;

@Service
@RequiredArgsConstructor
public class CountryService {
    private final CountryRepository countryRepository;

    public List<Country> getAllCountries(){
        return countryRepository.findAll();
    }

    public Country getById(Integer id){
        return countryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
    }
    
    @Transactional
    public Country addCountry(Country newCountry){
        return countryRepository.save(newCountry);
    }

    @Transactional
    public Country updateCountry(Integer id, Country newCountry){
        Country country = countryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        country.setName(newCountry.getName());
        return country;
    }

    @Transactional
    public void deleteCountry(Integer id){
        Country country = countryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        countryRepository.delete(country);
    }
}
