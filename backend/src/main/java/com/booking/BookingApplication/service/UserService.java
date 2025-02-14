package com.booking.BookingApplication.service;

import com.booking.BookingApplication.dto.UserDto;

import java.util.List;

public interface UserService {
    public UserDto postUser(UserDto userDto);
    public  UserDto getUserById(long id);
    public UserDto authenticateUser(String email, String password);
    public List<UserDto> getAllUsers();
}
