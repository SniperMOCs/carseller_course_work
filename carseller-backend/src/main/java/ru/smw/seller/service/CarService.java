package ru.smw.seller.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.smw.seller.exceptions.ResourceNotFoundException;
import ru.smw.seller.model.Brand;
import ru.smw.seller.model.Car;
import ru.smw.seller.model.dto.CarDTO;
import ru.smw.seller.repository.CarRepository;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;
    
    @Autowired
    private BrandService brandService;

    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    public List<Car> getByCountry(Integer id){
        return carRepository.findByBrandCountryId(id);
    }

    public List<Car> getByBrand(Integer id){
        return carRepository.findByBrandId(id);
    }

    public Car getById(Integer id){
        return carRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
    }

    @Transactional
    public Car addCar(CarDTO carDTO){
        Brand brand = brandService.getById(carDTO.getBrandId());
        return carRepository.save(new Car(carDTO.getName(), brand));
    }

    @Transactional
    public Car updateCar(Integer id, CarDTO newCar){
        Car car = carRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        if (newCar.getName() != null){
            car.setName(newCar.getName());
        }
        Brand brand = brandService.getById(newCar.getBrandId());
        if (brand != null){
            car.setBrand(brand);
        }
        return car;
    }

    @Transactional
    public void deleteCar(Integer id){
        Car car = carRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException());
        carRepository.delete(car);
    }
}
