package ru.smw.seller.model.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequest {

    @NotBlank(message = "Имя пользователя обязательно")
    private String name;

    @NotBlank(message = "Пароль обязателен")
    private String password;
}
