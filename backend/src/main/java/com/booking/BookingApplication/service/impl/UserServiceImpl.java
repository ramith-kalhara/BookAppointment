package com.booking.BookingApplication.service.impl;

import com.booking.BookingApplication.dto.UserDto;
import com.booking.BookingApplication.entity.User;
import com.booking.BookingApplication.exception.NotFoundException;
import com.booking.BookingApplication.repository.UserRepository;
import com.booking.BookingApplication.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    // Constructor Injection
    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    //create user
    @Override
    public UserDto postUser(UserDto userDto) {
        User user = userDto.toEntity(modelMapper);
        userRepository.save(user);
        return userDto;
    }

    //get user by id
    @Override
    public UserDto getUserById(long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get().toDto(modelMapper);
        }else{
            throw new NotFoundException("User not found");
        }
    }

    //check login
    // Authenticate user by email and password
    @Override
    public UserDto authenticateUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);  // Assuming you have a findByEmail method in your repository
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                return user.toDto(modelMapper);  // Return UserDto if credentials match
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new RuntimeException("User not found with the given email");
        }
    }


    @Override
    public List<UserDto> getAllUsers() {
        List<User> usersRepository = userRepository.findAll();
        if (usersRepository.isEmpty()) {
            return new ArrayList<>();
        } else {
            return usersRepository.stream().map(user -> user.toDto(modelMapper)).toList();
        }
    }



}
