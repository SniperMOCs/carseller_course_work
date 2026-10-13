package ru.smw.seller.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import ru.smw.seller.exceptions.ChatAccessDeniedException;
import ru.smw.seller.model.Chat;
import ru.smw.seller.model.Message;
import ru.smw.seller.model.User;
import ru.smw.seller.model.dto.MessageDTO;
import ru.smw.seller.repository.MessageRepository;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatService chatService;

    public List<Message> getByChatId(Integer id, Integer userId){
        if (chatService.isUserInChat(id, userId)){
            return messageRepository.findByChatId(id);
        }
        throw new ChatAccessDeniedException();
        
    }

    @Transactional
    public Message addMessage(MessageDTO dto, User user){
        if (chatService.isUserInChat(dto.getChatId(), user.getId())){
            Message newMessage = new Message();
            newMessage.setChat(chatService.getById(dto.getChatId()));
            newMessage.setContent(dto.getContent());
            newMessage.setSender(user);
            return messageRepository.save(newMessage);
        }
        throw new ChatAccessDeniedException();
    }

    @Transactional
    public Message addFirstMessage(MessageDTO dto, User user){
        Chat chat = chatService.createIfNotExists(dto.getAdId(), user.getId());
        Message message = new Message();
        message.setChat(chat);
        message.setContent(dto.getContent());
        message.setSender(user);
        return messageRepository.save(message);
    }
}
