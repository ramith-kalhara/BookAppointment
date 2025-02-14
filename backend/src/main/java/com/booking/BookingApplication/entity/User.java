package com.booking.BookingApplication.entity;
import com.booking.BookingApplication.dto.UserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.List;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;



    public UserDto toDto(ModelMapper mapper) {
        UserDto userDto = mapper.map(this, UserDto.class);
        return userDto;
    }
}
