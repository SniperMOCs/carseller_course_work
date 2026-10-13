package ru.smw.seller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.smw.seller.model.Brand;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer>{
    
    List<Brand> findByCountryId(Integer id);
}
