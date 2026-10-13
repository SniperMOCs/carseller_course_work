package ru.smw.seller.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.smw.seller.model.Car;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarDTO {
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Integer id;
    private String name;
    private Integer brandId;

    public CarDTO(Car car){
        this.id = car.getId();
        this.name = car.getName();
        this.brandId = car.getBrand().getId();
    }

    public CarDTO(String name, Integer brandId){
        this.name = name;
        this.brandId = brandId;
    }
}
