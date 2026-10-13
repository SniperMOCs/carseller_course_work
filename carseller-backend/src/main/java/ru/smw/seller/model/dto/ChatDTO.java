package ru.smw.seller.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatDTO {
    private Integer buyerId;
    private Integer adId;
}
