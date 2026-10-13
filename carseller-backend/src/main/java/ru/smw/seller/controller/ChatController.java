package ru.smw.seller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.smw.seller.model.Chat;
import ru.smw.seller.model.dto.ChatDTO;
import ru.smw.seller.security.user.SecurityUser;
import ru.smw.seller.service.ChatService;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ChatController {
    @Autowired
    private ChatService chatService;
    
    @GetMapping("/my")
    public ResponseEntity<List<Chat>> getByUser(@AuthenticationPrincipal SecurityUser securityUser){
        List<Chat> chats = chatService.getByUser(securityUser.getUser().getId());
        return ResponseEntity.ok(chats);
    }

    @GetMapping("/ad={adId}")
    public ResponseEntity<Chat> getByAdAndUser(@PathVariable Integer adId, @AuthenticationPrincipal SecurityUser securityUser){
        Chat chat = chatService.getByAdIdAndBuyerId(adId, securityUser.getUser().getId());
        return ResponseEntity.ok(chat);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Chat> getById(@PathVariable Integer id){
        Chat chat = chatService.getById(id);
        return ResponseEntity.ok(chat);
    }

    @PostMapping("/add")
    public ResponseEntity<Chat> addChat(@RequestBody ChatDTO dto){
        Chat chat = chatService.addChat(dto);
        return ResponseEntity.ok(chat);
    }

    @PostMapping("/{id}/delete")
    public ResponseEntity<?> deleteChat(@PathVariable Integer id){
        chatService.deleteChat(id);
        return ResponseEntity.noContent().build();
    }
}
