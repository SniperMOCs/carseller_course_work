package ru.smw.seller.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.smw.seller.model.dto.CarStatsDTO;
import ru.smw.seller.repository.AdvertisementRepository;

@Service
public class StatService {
    
    @Autowired
    private AdvertisementRepository advertisementRepository;

    public CarStatsDTO getCarStats(Integer carId){
        Integer avgPrice = advertisementRepository.findAveragePriceByCarId(carId);
        Integer avgDays = advertisementRepository.findAverageSellingTimeByCarId(carId);

        return new CarStatsDTO(avgPrice, avgDays);
    }
}
