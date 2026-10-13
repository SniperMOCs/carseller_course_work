package ru.smw.seller.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageDTO {
    private String content;
    private Integer chatId;
    private Integer adId;
}
