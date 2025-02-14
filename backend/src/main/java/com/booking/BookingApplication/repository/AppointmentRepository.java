package com.booking.BookingApplication.repository;

import com.booking.BookingApplication.entity.Appointment;
import com.booking.BookingApplication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository  extends JpaRepository<Appointment, Long > {

    List<Appointment> findByUserId(Long userId);


}
