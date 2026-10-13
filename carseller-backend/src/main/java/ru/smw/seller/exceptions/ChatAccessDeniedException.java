package ru.smw.seller.exceptions;

public class ChatAccessDeniedException extends RuntimeException {
    public ChatAccessDeniedException(){
        super("You don't have access to this chat.");
    }
}
