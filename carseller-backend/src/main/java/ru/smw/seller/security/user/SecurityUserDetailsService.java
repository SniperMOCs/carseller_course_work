package ru.smw.seller.security.user;

import lombok.AllArgsConstructor;
import ru.smw.seller.model.User;
import ru.smw.seller.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SecurityUserDetailsService implements UserDetailsService {

    private UserRepository repository;

    protected User findUserByUsername(String username) {
        return repository.findByName(username)
                .orElse(new User());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new SecurityUser(findUserByUsername(username));
    }
}