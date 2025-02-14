import 'owl.carousel/dist/assets/owl.carousel.css'; 
import 'owl.carousel';  
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import teamData from "../data/teamData";
import Swal from "sweetalert2";
import SubmitAppointmentbtn from './SubmitAppointmentbtn';
const Appointment = () => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tp_num, setTp_num] = useState('');
  const [doctor_name, setDoctor_name] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  

  const handleViewAppointment = () => {
    navigate('/appointmentDetails'); 
  };


  useEffect(() => {
    
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      setUserId(userId);
      
      
      // autofill name and email
      axios.get(`http://localhost:8086/api/user/${userId}`)
        .then(response => {
          const userData = response.data;
          setName(userData.name);
          setEmail(userData.email);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    } else {
      console.log('No user ID found');
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any field is empty
    if (!name || !email || !tp_num || !doctor_name || !time || !date || !description) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all the fields.",
      });
      return;
    }
  
    // Validate phone number (should be 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(tp_num)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
      });
      return;
    }
  
    // Check if time slot and date are available
    try {
      const existingAppointments = await axios.get("http://localhost:8086/api/appointment/all");
  
      const isTimeSlotTaken = existingAppointments.data.some(
        (appointment) => appointment.date === date && appointment.time === time
      );
  
      if (isTimeSlotTaken) {
        // Show popup alert 
        Swal.fire({
          icon: "error",
          title: "Time Slot Unavailable",
          text: `The selected time slot (${time}) on ${date} is already booked. Please choose a different time.`,
        });
        return; 
      }
  
      // If slot is available, then create appointment
      const appointmentData = {
        name,
        email,
        tp_num,
        doctor_name,
        date,
        time,
        description,
        userId,
      };
  
      const response = await axios.post("http://localhost:8086/api/appointment/create", appointmentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Appointment Booked",
          text: "Your appointment has been successfully booked!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "An error occurred while booking the appointment. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Could not connect to the server. Please try again later.",
      });
    }
  };
  
  return (
    <div>
        {/* Appointment Start */}
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <p className="d-inline-block border rounded-pill py-1 px-4">Appointment</p>
            <h1 className="mb-4">Make An Appointment To Visit Our Doctor</h1>
            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
            <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
              <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: '55px', height: '55px'}}>
                <i className="fa fa-phone-alt text-primary" />
              </div>
              <div className="ms-4">
                <p className="mb-2">Call Us Now</p>
                <h5 className="mb-0">+012 345 6789</h5>
              </div>
            </div>
            <div className="bg-light rounded d-flex align-items-center p-5">
              <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: '55px', height: '55px'}}>
                <i className="fa fa-envelope-open text-primary" />
              </div>
              <div className="ms-4">
                <p className="mb-2">Mail Us Now</p>
                <h5 className="mb-0">info@example.com</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
            <form >
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <input 
                      type="text" 
                      className="form-control border-0" 
                      placeholder="Your Name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      style={{height: '55px'}} 
                      disabled
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input 
                      type="email" 
                      className="form-control border-0" 
                      placeholder="Your Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}  
                      style={{height: '55px'}} 
                      disabled
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input 
                      type="text" 
                      className="form-control border-0" 
                      placeholder="Your Mobile" 
                      value={tp_num} 
                      onChange={(e) => setTp_num(e.target.value)} 
                      style={{height: '55px'}} 
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <select
                      className="form-select border-0"
                      style={{ height: "55px" }}
                      value={doctor_name}
                      onChange={(e) => setDoctor_name(e.target.value)} // Update doctor_name
                    >
                      <option value="">Choose Doctor</option>
                      {teamData.map((doctor) => (
                        <option key={doctor.id} value={doctor.name}>
                          {doctor.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="time" id="time-picker" data-target-input="nearest" style={{ position: "relative" }}>
                      <select
                        className="form-select border-0"
                        style={{ height: "55px" }}
                        value={time}
                        onChange={(e) => setTime(e.target.value)} // Update time variable
                        disabled={!doctor_name} // Disable until doctor is selected
                      >
                        <option value="">Choose Time</option>
                        {teamData
                          .find((doctor) => doctor.name === doctor_name)?.timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                              {slot}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="date" id="date-picker" data-target-input="nearest" style={{ position: 'relative' }}>
                    <input 
                      type="date" 
                      className="form-control border-0" 
                      placeholder="Your date" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                      style={{height: '55px'}} 
                    />
                    </div>
                  </div>

                  <div className="col-12">
                    <textarea 
                      className="form-control border-0" 
                      rows={5}  
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)}  
                      placeholder="Describe your problem" 
                    />
                  </div>
                  <SubmitAppointmentbtn handleViewAppointment={handleViewAppointment} handleSubmit={handleSubmit}  />
                </div>
              </form>
              

            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Appointment End */}
    </div>
  )
}

export default Appointment