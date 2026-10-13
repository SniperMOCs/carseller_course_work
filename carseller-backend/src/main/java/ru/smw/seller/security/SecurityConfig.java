package ru.smw.seller.security;

import lombok.AllArgsConstructor;
import ru.smw.seller.security.jwt.JwtAccessDeniedHandler;
import ru.smw.seller.security.jwt.JwtAuthFilter;
import ru.smw.seller.security.jwt.JwtAuthenticationEntryPoint;
import ru.smw.seller.security.user.SecurityUserDetailsService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {

    private SecurityUserDetailsService userDetailsService;
    private JwtAuthFilter jwtAuthFilter;
    private JwtAuthenticationEntryPoint unauthorizedHandler;
    private JwtAccessDeniedHandler accessDeniedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
                        .requestMatchers("/error").permitAll()
                        // Advertisement
                        .requestMatchers(
                            "/api/ads", 
                            "/api/ads/user={id}", 
                            "/api/ads/brand={id}", 
                            "/api/ads/country={id}", 
                            "/api/ads/car={id}", 
                            "/api/ad/{id}"
                        ).permitAll()

                        .requestMatchers(
                            "/api/ad/delete/{id}"
                        ).hasRole("ADMIN")
                        // Brands
                        .requestMatchers(
                            "/api/brands", 
                            "/api/brand/{id}", 
                            "/api/brands/country/{id}"
                        ).permitAll()
                        .requestMatchers(
                            "/api/brand/add", 
                            "/api/brand/update/{id}", 
                            "/api/brand/delete/{id}"
                        ).hasRole("ADMIN")
                        // Cars
                        .requestMatchers(
                            "/api/cars",
                            "/api/cars/countryId={country_id}",
                            "/api/cars/brandId={brand_id}",
                            "/api/car/{carId}"
                        ).permitAll()
                        .requestMatchers(
                            "/api/car/add",
                            "/api/car/update/{carId}",
                            "/api/car/delete/{carId}"
                        ).hasRole("ADMIN")
                        // Countries
                        .requestMatchers(
                            "/api/countries",
                            "/api/country/{id}"
                        ).permitAll()
                        .requestMatchers(
                            "/api/country/add",
                            "/api/country/update/{id}",
                            "/api/country/delete/{id}"
                        ).hasRole("ADMIN")
                        // Photos
                        .requestMatchers(
                            "/api/photos/ad={id}",
                            "/api/photos/{id}"
                        ).permitAll()

                        .requestMatchers(
                            "/uploads/**"
                        ).permitAll()

                        .requestMatchers(
                            "/ws/**"
                        ).permitAll()

                        .anyRequest().authenticated()
                )
                .exceptionHandling(handling ->
                        handling.authenticationEntryPoint(unauthorizedHandler)
                                .accessDeniedHandler(accessDeniedHandler)
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) 
                                                                            throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
