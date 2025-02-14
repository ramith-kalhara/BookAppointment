package com.booking.BookingApplication.dto;

import com.booking.BookingApplication.entity.Appointment;
import lombok.Data;
import org.modelmapper.ModelMapper;


@Data
public class AppointmentDto {
    private Long id;

    private String name;
    private String email;
    private int tp_num;
    private String doctor_name;
    private String date;
    private String time;
    private String description;
    private Long userId;

    // Method to convert DTO to Entity
    public Appointment toEntity(ModelMapper modelMapper) {

        return modelMapper.map(this, Appointment.class);
    }

}
