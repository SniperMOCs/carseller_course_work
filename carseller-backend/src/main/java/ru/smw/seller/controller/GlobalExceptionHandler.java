package ru.smw.seller.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import ru.smw.seller.exceptions.ChatAccessDeniedException;
import ru.smw.seller.exceptions.PhotoLimitExceededException;
import ru.smw.seller.exceptions.ResourceNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<String> handleResourceNotFound(ResourceNotFoundException ex){
            return ResponseEntity.notFound().build();
        }

        @ExceptionHandler(PhotoLimitExceededException.class)
        public ResponseEntity<String> handlePhotoLimit(PhotoLimitExceededException ex){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        }

        @ExceptionHandler(ChatAccessDeniedException.class)
        public ResponseEntity<String> handleChatAccessDenied(ChatAccessDeniedException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
}
