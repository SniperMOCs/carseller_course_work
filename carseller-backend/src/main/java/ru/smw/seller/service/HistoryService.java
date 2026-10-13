package ru.smw.seller.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import ru.smw.seller.model.Advertisement;
import ru.smw.seller.model.History;
import ru.smw.seller.repository.HistoryRepository;

@Service
public class HistoryService {
    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private AdService adService;

    @Autowired
    private UserService userService;

    private static final int MAX_HISTORY_SIZE = 12;

    public List<Advertisement> getByUserId(Integer id){
        return historyRepository.findByUserId(id);
    }

    @Transactional
    public History addHistory(Integer adId, Integer userId){
        if (historyRepository.existsByUserIdAndAdId(userId, adId)){
            return null;
        }
        else{
            History history = new History();
            history.setAd(adService.getById(adId));
            history.setUser(userService.getById(userId));

            List<History> userHistory = historyRepository.findByUserIdOrderByViewedAtDesc(userId);
            if (userHistory.size() > MAX_HISTORY_SIZE){
                List<History> toDelete = userHistory.subList(MAX_HISTORY_SIZE, userHistory.size());
                historyRepository.deleteAll(toDelete);
            }
            return historyRepository.save(history);
        }
    }
}
