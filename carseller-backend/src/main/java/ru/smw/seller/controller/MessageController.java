package ru.smw.seller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.smw.seller.model.Message;
import ru.smw.seller.model.dto.MessageDTO;
import ru.smw.seller.security.user.SecurityUser;
import ru.smw.seller.service.MessageService;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/chat/{id}")
    public ResponseEntity<List<Message>> getByChatId(@PathVariable Integer id, @AuthenticationPrincipal SecurityUser securityUser){
        List<Message> messages = messageService.getByChatId(id, securityUser.getUser().getId());
        return ResponseEntity.ok(messages);
    }

    @PostMapping("add")
    public ResponseEntity<Message> addMessage(@RequestBody MessageDTO dto, @AuthenticationPrincipal SecurityUser securityUser){
        Message message = messageService.addMessage(dto, securityUser.getUser());
        messagingTemplate.convertAndSend("/topic/chat." + message.getChat().getId(), message);
        return ResponseEntity.ok(message);
    }

    @PostMapping("addFirst")
    public ResponseEntity<Message> addFirstMessage(@RequestBody MessageDTO dto, @AuthenticationPrincipal SecurityUser securityUser){
        Message message = messageService.addFirstMessage(dto, securityUser.getUser());
        return ResponseEntity.ok(message);
    }
}
