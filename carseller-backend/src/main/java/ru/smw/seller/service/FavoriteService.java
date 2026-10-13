package ru.smw.seller.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import ru.smw.seller.exceptions.ResourceNotFoundException;
import ru.smw.seller.model.Advertisement;
import ru.smw.seller.model.Favorite;
import ru.smw.seller.repository.FavoriteRepository;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private AdService adService;

    @Autowired
    private UserService userService;

    public List<Advertisement> getByUserId(Integer id){
        return favoriteRepository.findAdByUserId(id);
    }

    @Transactional
    public Favorite addFavorite(Integer adId, Integer userId){
        Favorite favorite = new Favorite();
        favorite.setAd(adService.getById(adId));
        favorite.setUser(userService.getById(userId));
        return favoriteRepository.save(favorite);
    }

    @Transactional
    public void deleteFavorite(Integer adId, Integer userId){
        Favorite favorite = favoriteRepository.findByUserIdAndAdId(userId, adId).orElseThrow(() -> new ResourceNotFoundException());
        favoriteRepository.delete(favorite);
    }
}
