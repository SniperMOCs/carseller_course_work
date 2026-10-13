package ru.smw.seller.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.smw.seller.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    
    List<Message> findByChatId(Integer chat_id);
}
