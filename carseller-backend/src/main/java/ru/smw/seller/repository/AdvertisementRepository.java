package ru.smw.seller.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ru.smw.seller.model.Advertisement;
import ru.smw.seller.model.enums.AdStatus;

@Repository
public interface AdvertisementRepository 
        extends JpaRepository<Advertisement, Integer>{
    
    List<Advertisement> findByPublisherIdAndStatus(Integer id, AdStatus status);

    List<Advertisement> findByCarIdAndStatus(Integer id, AdStatus status);

    List<Advertisement> findByCarBrandIdAndStatus(Integer id, AdStatus status);

    List<Advertisement> findByCarBrandCountryIdAndStatus(Integer id, AdStatus status);

    List<Advertisement> findByStatus(AdStatus status);

    @Query("SELECT AVG(a.price) FROM Advertisement AS a WHERE a.car.id = :carId")
    Integer findAveragePriceByCarId(@Param("carId") Integer carId);

    @Query("SELECT AVG(DATEDIFF(a.soldAt, a.createdAt)) FROM Advertisement AS a WHERE a.car.id = :carId AND a.soldAt IS NOT NULL")
    Integer findAverageSellingTimeByCarId(@Param("carId") Integer carId);
}
