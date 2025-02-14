import 'owl.carousel/dist/assets/owl.carousel.css'; 
import 'owl.carousel';  
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import teamData from "../data/teamData";
import Swal from "sweetalert2";
import SubmitAppointmentbtn from './SubmitAppointmentbtn';
import { UpdateAppointmentBtn } from './UpdateAppointmentBtn';

const UpdateAppointment = () => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tp_num, setTp_num] = useState('');
  const [doctor_name, setDoctor_name] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { appointmentId } = useParams(); 
  const [originalDate, setOriginalDate] = useState('');
const [originalTime, setOriginalTime] = useState('');
 
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      setUserId(userId);
      axios.get(`http://localhost:8086/api/user/${userId}`)
        .then(response => {
          const userData = response.data;
          setName(userData.name);
          setEmail(userData.email);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }

    // Fetch appointment data based on appointmentId
    if (appointmentId) {
      axios.get(`http://localhost:8086/api/appointment/${appointmentId}`)
        .then(response => {
          const appointment = response.data;
          setName(appointment.name);
          setEmail(appointment.email);
          setTp_num(appointment.tp_num);
          setDoctor_name(appointment.doctor_name);
          setDate(appointment.date);
          setTime(appointment.time);
          setDescription(appointment.description);

          // Track the original date and time
          setOriginalDate(appointment.date);
          setOriginalTime(appointment.time);
        })
        .catch(error => {
          console.error("Error fetching appointment data:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Could not fetch appointment data. Please try again.",
          });
        });
    }
  }, [appointmentId]);

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
      
        // Validate phone number
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(tp_num)) {
          Swal.fire({
            icon: "error",
            title: "Invalid Phone Number",
            text: "Please enter a valid 10-digit phone number.",
          });
          return;
        }

    // Check if the time or date has changed
    if (date === "" || time === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Date/Time",
            text: "Please select both a date and time to update your appointment.",
        });
        return;
    }

   
    if (
        date === originalDate &&
        time === originalTime &&
        tp_num === "" &&  
        description === ""  
    ) {
        Swal.fire({
            icon: "warning",
            title: "No Changes Detected",
            text: "You haven't updated any details (date, time, or description). Please make changes to proceed.",
        });
        return; // Stop the form submission if no changes were made
    }

    try {
        // Fetch all appointments
        const existingAppointments = await axios.get("http://localhost:8086/api/appointment/all");

       
        const isTimeSlotTaken = existingAppointments.data.some(
            (appointment) =>
                (appointment.date === date) && 
                (appointment.time === time) &&
                (appointment.id != appointmentId) 
        );

        if (isTimeSlotTaken) {
            // Show error message if time slot is already booked
            Swal.fire({
                icon: "error",
                title: "Time Slot Unavailable",
                text: `The selected time slot (${time}) on ${date} is already booked. Please choose a different time.`,
            });
            return; 
        }

        // Prepare the appointment data for updating
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

        const response = await axios.put(`http://localhost:8086/api/appointment/update/${appointmentId}`, appointmentData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: "Appointment Updated",
                text: "Your appointment has been successfully updated!",
                
            });
            // Optionally navigate to another page after success
            navigate("/appointmentDetails"); 
        } else {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "An error occurred while updating the appointment. Please try again.",
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
              <h1 className="mb-4">Update Your Appointment</h1>
              <p className="mb-4">Update your appointment details below and submit to confirm your changes.</p>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="bg-light rounded h-100 d-flex align-items-center p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ height: '55px' }}
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
                        style={{ height: '55px' }}
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
                        style={{ height: '55px' }}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select border-0"
                        style={{ height: "55px" }}
                        value={doctor_name}
                        onChange={(e) => setDoctor_name(e.target.value)} 
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
                      <select
                        className="form-select border-0"
                        style={{ height: "55px" }}
                        value={time}
                        onChange={(e) => setTime(e.target.value)} 
                        disabled={!doctor_name} 
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
                    <div className="col-12 col-sm-6">
                      <input
                        type="date"
                        className="form-control border-0"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ height: '55px' }}
                      />
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
                    <div className="col-12">
                      <UpdateAppointmentBtn />
                      
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Appointment End */}
    </div>
  );
};

export default UpdateAppointment;
