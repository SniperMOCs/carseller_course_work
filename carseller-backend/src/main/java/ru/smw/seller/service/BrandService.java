package ru.smw.seller.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.smw.seller.exceptions.ResourceNotFoundException;
import ru.smw.seller.model.Brand;
import ru.smw.seller.model.Country;
import ru.smw.seller.model.dto.BrandDTO;
import ru.smw.seller.repository.BrandRepository;

@Service
public class BrandService {
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private CountryService countryService;

    public List<Brand> getAll(){
        return brandRepository.findAll();
    }

    public Brand getById(Integer id){
        return brandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
    }

    public List<Brand> getByCountryId(Integer id){
        return brandRepository.findByCountryId(id);
    }

    @Transactional
    public Brand addBrand(BrandDTO brandDTO){
        Country country = countryService.getById(brandDTO.getCountryId());
        return brandRepository.save(new Brand(brandDTO.getName(), country));
    }

    @Transactional
    public Brand updateBrand(Integer id, BrandDTO brandDTO){
        Brand brand = brandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        if (brandDTO.getName() != null){
            brand.setName(brandDTO.getName());
        }
        Country country = countryService.getById(brandDTO.getCountryId());
        if (country != null){
            brand.setCountry(country);
        }
        return brand;
    }

    @Transactional
    public void deleteBrand(Integer id){
        Brand brand = brandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        brandRepository.delete(brand);
    }
}
