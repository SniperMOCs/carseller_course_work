package ru.smw.seller.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.smw.seller.model.Brand;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandDTO {
    private Integer id;
    private String name;
    private Integer countryId;

    public BrandDTO(Brand brand){
        this.id = brand.getId();
        this.name = brand.getName();
        this.countryId = brand.getCountry().getId();
    }

    public BrandDTO(String name, Integer countryId){
        this.name = name;
        this.countryId = countryId;
    }
}
