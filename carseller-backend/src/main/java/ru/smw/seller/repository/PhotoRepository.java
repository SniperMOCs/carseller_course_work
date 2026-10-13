package ru.smw.seller.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.smw.seller.model.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Integer>{
    
    List<Photo> findByAdId(Integer id);
}