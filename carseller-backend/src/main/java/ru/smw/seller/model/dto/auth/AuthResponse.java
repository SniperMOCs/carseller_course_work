package ru.smw.seller.model.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.smw.seller.model.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String message;
    private String token;
    private User user;

    public AuthResponse(String message) {
        this.message = message;
    }
}
