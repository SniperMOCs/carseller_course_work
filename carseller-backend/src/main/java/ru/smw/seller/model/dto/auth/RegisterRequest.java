package ru.smw.seller.model.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class RegisterRequest {

    @NotBlank(message = "Имя должно быть указано")
    private String name;

    @NotBlank(message = "Пароль должен быть указан")
    @Length(message = "Длинна пароля должна быть от 5 символов", min = 5)
    private String password;

    @Email(message = "Введите корректную почту")
    private String email;
}
