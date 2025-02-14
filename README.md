# BookAppointment
# Appointment Booking System

This project is a full-stack Appointment Booking System built with **React** for the front-end and **Spring Boot** for the back-end. Users can view available doctors, book appointments, and manage their appointments with the ability to view, update, or delete them.

---

## Features:
- **Doctor Listings:** Users can browse and view details about the available doctors, their departments, and their available time slots.
- **Login System:** Users must log in to access the appointment booking system.
- **Appointment Booking:** Once logged in, users can view and choose available time slots and book an appointment with a selected doctor.
- **Appointment Management:** After booking, users can view, update, or delete their appointments.
- **Appointment View:** Users can view the details of their appointments and decide whether they want to make changes or delete them.

---

## Tools & Technologies Used:
- **Front-End:** React
- **Back-End:** Spring Boot
- **Database:** MySQL
- **Styling:** Bootstrap 5
- **Authentication:** JWT (JSON Web Tokens) for securing user login and appointment management
- **APIs:** RESTful APIs for handling requests between front-end and back-end

---

## How the System Works:

1. **Viewing Doctors:**
   Users can visit the homepage to see a list of available doctors along with their departments and time slots.
   
2. **Booking Appointments:**
   - Users must log in to book an appointment.
   - Once logged in, they can visit the appointment page, choose a doctor, and an available time slot.
   - They can add an appointment by filling in their details, selecting a doctor, time, and providing a description of the problem.

3. **Managing Appointments:**
   - After booking an appointment, users can view their appointment details.
   - If needed, users can update or delete their appointment by clicking the "Update" or "Delete" button in the Appointment View section.

4. **Login System:**
   The login system is implemented with JWT (JSON Web Tokens) for secure access. Users need to authenticate themselves before booking or managing appointments.

---

## API Endpoints:

### 1. **User Endpoints:**
   - `POST /api/user/login` - User login with email and password.
   - `POST /api/user/create` - Create a new user.

### 2. **Appointment Endpoints:**
   - `GET /api/appointment/all` - Get all appointments.
   - `POST /api/appointment/create` - Create a new appointment.
   - `GET /api/appointment/{id}` - Get details of a specific appointment.
   - `PUT /api/appointment/{id}` - Update an appointment.
   - `DELETE /api/appointment/{id}` - Delete an appointment.

---

## How to Run the Project Locally:

### Prerequisites:
- **Java (JDK 11 or higher)**
- **MySQL Database**
- **Node.js & npm** for the front-end

### 1. **Setting up the Back-End (Spring Boot):**

- Clone the repository:

  ```bash
  git clone https://github.com/your-repo/appointment-booking-system.git

