package ru.smw.seller.model.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.smw.seller.model.enums.AdStatus;
import ru.smw.seller.model.enums.FuelType;
import ru.smw.seller.model.enums.GearboxType;
import ru.smw.seller.model.enums.SteeringPlacement;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdDTO {
    
    private Integer carId;

    private Integer year;

    private Integer price;

    private Integer mileage;

    private Integer enginePower;

    private Double engineCC;

    private String color;
    
    private SteeringPlacement steeringPlacement;

    private GearboxType gearbox;

    private AdStatus status;

    private Integer publisherId;

    private String chassisNumber;

    private FuelType fuelType;

    private String description;

    private List<MultipartFile> photoFiles;
}
