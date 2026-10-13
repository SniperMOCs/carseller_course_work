package ru.smw.seller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import ru.smw.seller.service.CarService;
import ru.smw.seller.model.Car;
import ru.smw.seller.model.dto.CarDTO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping("/cars")
    public ResponseEntity<List<Car>> getAll() {
        List<Car> cars = carService.getAllCars();
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/cars/countryId={country_id}")
    public ResponseEntity<List<Car>> getCarsByCountry(@PathVariable("country_id") Integer country_id) {
        List<Car> cars = carService.getByCountry(country_id);
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/cars/brandId={brand_id}")
    public ResponseEntity<List<Car>> getCarsByBrand(@PathVariable("brand_id") Integer brand_id) {
        List<Car> cars = carService.getByBrand(brand_id);
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/car/{carId}")
    public ResponseEntity<Car> getCarById(@PathVariable("carId") Integer carId){
        Car car = carService.getById(carId);
        return ResponseEntity.ok(car);
    }

    @PostMapping("/car/add")
    public ResponseEntity<Car> addCar(@RequestBody CarDTO carDTO){
        Car createdCar = carService.addCar(carDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCar);
    }

    @PutMapping("/car/update/{carId}")
    public ResponseEntity<Car> updateCar(@PathVariable Integer carId, @RequestBody CarDTO newCar){
        Car car = carService.updateCar(carId, newCar);

        return ResponseEntity.ok(car);
    }

    @PostMapping("/car/delete/{carId}") 
    public ResponseEntity<?> deleteCar(@PathVariable Integer carId){
        carService.deleteCar(carId);
        return ResponseEntity.noContent().build();
    }
}
