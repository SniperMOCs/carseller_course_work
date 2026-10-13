package ru.smw.seller.service;

import ru.smw.seller.exceptions.ResourceNotFoundException;
import ru.smw.seller.model.User;
import ru.smw.seller.model.dto.auth.RegisterRequest;
import ru.smw.seller.model.enums.UserRole;
import ru.smw.seller.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(RegisterRequest request) {
        if (repository.existsByName(request.getName()))
            throw new IllegalArgumentException("Имя пользователя уже занято");

        User user = new User();
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.USER);
        user.setEmail(request.getEmail());

        repository.save(user);
    }

    public User getById(Integer id){
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
