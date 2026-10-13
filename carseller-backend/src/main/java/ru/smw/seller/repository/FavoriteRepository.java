package ru.smw.seller.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ru.smw.seller.model.Advertisement;
import ru.smw.seller.model.Favorite;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer>{
    
    @Query("SELECT f.ad FROM Favorite AS f WHERE f.user.id = :user_id")
    List<Advertisement> findAdByUserId(@Param("user_id") Integer user_id);

    Optional<Favorite> findByUserIdAndAdId(Integer userId, Integer adId);
}
