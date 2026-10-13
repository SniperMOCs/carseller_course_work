package ru.smw.seller.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarStatsDTO {
    private Integer averagePrice;
    private Integer averageSellingTime;
}
