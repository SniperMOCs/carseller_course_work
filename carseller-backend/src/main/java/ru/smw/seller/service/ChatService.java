package ru.smw.seller.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import ru.smw.seller.exceptions.ResourceNotFoundException;
import ru.smw.seller.model.Chat;
import ru.smw.seller.model.dto.ChatDTO;
import ru.smw.seller.repository.ChatRepository;

@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private AdService adService;

    @Autowired
    private UserService userService;

    public List<Chat> getByUser(Integer userId){
        return chatRepository.findByUserId(userId);
    }

    public Chat getById(Integer id){
        return chatRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
    }

    public Chat getByAdIdAndBuyerId(Integer adId, Integer buyerId){
        return chatRepository.findByBuyerIdAndAdId(buyerId, adId).orElse(null);
    }

    @Transactional
    public Chat createIfNotExists(Integer adId, Integer buyerId){
        return chatRepository.findByBuyerIdAndAdId(buyerId, adId).orElseGet(() -> {
            Chat newChat = new Chat();
            newChat.setAd(adService.getById(adId));
            newChat.setBuyer(userService.getById(buyerId));
            return chatRepository.save(newChat);
        });
    }

    @Transactional
    public Chat addChat(ChatDTO dto){
        Chat newChat = new Chat();
        newChat.setAd(adService.getById(dto.getAdId()));
        newChat.setBuyer(userService.getById(dto.getBuyerId()));
        return chatRepository.save(newChat);
    }

    @Transactional
    public void deleteChat(Integer id){
        Chat chat = chatRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException());
        chatRepository.delete(chat);
    }

    public boolean isUserInChat(Integer chatId, Integer userId){
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new ResourceNotFoundException());
        return chat.getBuyer().getId().equals(userId) || chat.getAd().getPublisher().getId().equals(userId);
    }
}
