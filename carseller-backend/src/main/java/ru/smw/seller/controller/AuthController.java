package ru.smw.seller.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import ru.smw.seller.model.User;
import ru.smw.seller.model.dto.ResponseMessage;
import ru.smw.seller.model.dto.auth.AuthRequest;
import ru.smw.seller.model.dto.auth.AuthResponse;
import ru.smw.seller.model.dto.auth.RegisterRequest;
import ru.smw.seller.security.jwt.JwtBlacklist;
import ru.smw.seller.security.jwt.JwtUtils;
import ru.smw.seller.security.user.SecurityUser;
import ru.smw.seller.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private JwtBlacklist jwtBlacklist;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getName(),
                            request.getPassword()
                    )
            );

            SecurityUser userDetails = (SecurityUser) authentication.getPrincipal();
            String jwt = jwtUtils.generateToken(userDetails);
            
            AuthResponse response = new AuthResponse();
            response.setMessage("Вы успешно вошли в систему");
            response.setToken(jwt);
            response.setUser(userDetails.getUser());
            return ResponseEntity.ok(response);
        } 
        catch (BadCredentialsException e) {
            return new ResponseEntity<>(new AuthResponse("Неверные учетные данные"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseMessage logout(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            jwtBlacklist.blacklist(token);
        }
        return new ResponseMessage("Вы вышли из системы");
    }

    @PostMapping("/register")
    public ResponseMessage register(@Valid @RequestBody RegisterRequest request) {
        userService.registerUser(request);
        return new ResponseMessage("Регистрация успешна");
    }

    @GetMapping("/current-user")
    public User currentUser(@AuthenticationPrincipal SecurityUser securityUser) {
        return securityUser.getUser();
    }
}