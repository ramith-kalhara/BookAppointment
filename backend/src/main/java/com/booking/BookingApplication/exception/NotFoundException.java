package com.booking.BookingApplication.exception;

public class NotFoundException extends  RuntimeException {
    public NotFoundException(String massage) {
        super(massage);
    }
}