package ru.smw.seller.exceptions;

public class PhotoLimitExceededException extends RuntimeException {
    public PhotoLimitExceededException(int limit) {
        super("Maximum " + limit + " photos allowed for advertisement");
    }
}
