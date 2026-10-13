package ru.smw.seller.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ru.smw.seller.model.Chat;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer>{
    
    @Query("SELECT c FROM Chat AS c WHERE c.buyer.id = :user_id OR c.ad.publisher.id = :user_id")
    List<Chat> findByUserId(@Param("user_id") Integer user_id);

    Optional<Chat> findByBuyerIdAndAdId(Integer buyer_id, Integer ad_id);
}
