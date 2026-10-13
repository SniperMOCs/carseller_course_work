package ru.smw.seller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ru.smw.seller.model.Advertisement;
import ru.smw.seller.model.History;
import ru.smw.seller.security.user.SecurityUser;
import ru.smw.seller.service.HistoryService;


@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HistoryController {
    @Autowired
    private HistoryService historyService;

    @GetMapping("")
    public ResponseEntity<List<Advertisement>> getAllByUser(@AuthenticationPrincipal SecurityUser securityUser){
        List<Advertisement> history = historyService.getByUserId(securityUser.getUser().getId());
        return ResponseEntity.ok(history);
    }

    @PostMapping("/add")
    public ResponseEntity<History> addHistory(@AuthenticationPrincipal SecurityUser securityUser, @RequestParam Integer adId){
        History history = historyService.addHistory(adId, securityUser.getUser().getId());
        return ResponseEntity.ok(history);
    }
}
