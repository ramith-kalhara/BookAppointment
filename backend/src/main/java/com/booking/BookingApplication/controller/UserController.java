package com.booking.BookingApplication.controller;

import com.booking.BookingApplication.dto.UserDto;
import com.booking.BookingApplication.exception.NotFoundException;
import com.booking.BookingApplication.repository.UserRepository;
import com.booking.BookingApplication.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {
    private final UserServiceImpl userService;

    //create user
    @PostMapping("/create")
    public ResponseEntity<UserDto> postUser(@RequestBody UserDto userDto){
        return ResponseEntity.status(HttpStatus.OK).body(userService.postUser(userDto));
    }

    //get user by id
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
    }

    //Check email and password
    @PostMapping("/login")
    public ResponseEntity<UserDto> authenticateUser(@RequestBody UserDto userDto) {
        try {
            UserDto authenticatedUser = userService.authenticateUser(userDto.getEmail(), userDto.getPassword());
            return ResponseEntity.status(HttpStatus.OK).body(authenticatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    //get all Users
    @GetMapping("all")
    private ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }




}
