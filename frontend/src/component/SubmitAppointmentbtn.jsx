import React from 'react'

const SubmitAppointmentbtn  = ({ handleSubmit, handleViewAppointment ,isUpdate }) =>{
  return (
    <div>
        <div className="col-12 mb-2">
            <button className="btn btn-primary w-100 py-3" type="submit"  onClick={handleSubmit}>Book Appointment</button>
        </div>
        <div className="col-12">
            <button className="btn btn-primary w-100 py-3"  onClick={handleViewAppointment} >View Appointment</button>
        </div>
        
    </div>
  )
}

export default SubmitAppointmentbtn