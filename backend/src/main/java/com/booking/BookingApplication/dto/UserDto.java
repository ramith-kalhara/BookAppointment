package com.booking.BookingApplication.dto;

import com.booking.BookingApplication.entity.Appointment;
import com.booking.BookingApplication.entity.User;
import lombok.Data;
import org.modelmapper.ModelMapper;


@Data
public class UserDto {
    private Long id;

    private String name;
    private String email;
    private String password;

    public User toEntity(ModelMapper modelMapper) {
        return modelMapper.map(this, User.class);
    }

}
