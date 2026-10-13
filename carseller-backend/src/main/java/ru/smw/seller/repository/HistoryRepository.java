package ru.smw.seller.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ru.smw.seller.model.Advertisement;
import ru.smw.seller.model.History;

@Repository
public interface HistoryRepository extends JpaRepository<History, Integer>{
    
    @Query("SELECT h.ad FROM History AS h WHERE h.user.id = :user_id ORDER BY h.viewedAt DESC")
    List<Advertisement> findByUserId(@Param("user_id") Integer user_id);

    List<History> findByUserIdOrderByViewedAtDesc(Integer userId);

    Boolean existsByUserIdAndAdId(Integer userId, Integer adId);
}
