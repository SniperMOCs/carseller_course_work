package ru.smw.seller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ru.smw.seller.model.Advertisement;
import ru.smw.seller.model.Favorite;
import ru.smw.seller.security.user.SecurityUser;
import ru.smw.seller.service.FavoriteService;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("")
    public ResponseEntity<List<Advertisement>> getByUser(@AuthenticationPrincipal SecurityUser securityUser){
        return ResponseEntity.ok(favoriteService.getByUserId(securityUser.getUser().getId()));
    }

    @PostMapping("/add")
    public ResponseEntity<Favorite> addFavorite(@AuthenticationPrincipal SecurityUser securityUser, @RequestParam Integer adId){
        Favorite favorite = favoriteService.addFavorite(adId, securityUser.getUser().getId());
        return ResponseEntity.ok(favorite);
    }

    @PostMapping("/delete/{adId}")
    public ResponseEntity<?> deleteFavorite(@AuthenticationPrincipal SecurityUser securityUser, @PathVariable Integer adId){
        favoriteService.deleteFavorite(adId, securityUser.getUser().getId());
        return ResponseEntity.noContent().build();
    }
}
