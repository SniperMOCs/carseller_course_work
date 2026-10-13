package ru.smw.seller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.smw.seller.model.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer> {
    
}
