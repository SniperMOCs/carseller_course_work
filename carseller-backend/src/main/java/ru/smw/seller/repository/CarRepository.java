package ru.smw.seller.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.smw.seller.model.Car;

@Repository
public interface CarRepository 
        extends JpaRepository<Car, Integer>{
    
    List<Car> findByBrandCountryId(Integer id);
    
    List<Car> findByBrandId(Integer id);
}
