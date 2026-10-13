package ru.smw.seller.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.smw.seller.model.dto.CarStatsDTO;
import ru.smw.seller.service.StatService;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StatController {
    
    @Autowired
    private StatService statService;

    @GetMapping("/{carId}")
    public ResponseEntity<CarStatsDTO> getByCarId(@PathVariable Integer carId){
        return ResponseEntity.ok(statService.getCarStats(carId));
    }
}
