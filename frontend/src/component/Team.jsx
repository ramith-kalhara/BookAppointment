// Team.jsx
import React from 'react';
import teamData from '../data/teamData';

const Team = ({ limit }) => {
  return (
    <div>
      {/* Team Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
            <h1>Our Experienced Doctors</h1>
          </div>
          <div className="row g-4">
            {teamData.slice(0, limit).map((doctor, index) => (
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 * (index + 1)}s`} key={doctor.id}>
                <div className="team-item position-relative rounded overflow-hidden">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={doctor.img} alt={doctor.name} />
                  </div>
                  <div className="team-text bg-light text-center p-4">
                    <h5>{doctor.name}</h5>
                    <p className="text-primary">{doctor.department}</p>
                    <div className="team-social text-center">
                      <a className="btn btn-square" href={doctor.socialLinks.facebook}><i className="fab fa-facebook-f" /></a>
                      <a className="btn btn-square" href={doctor.socialLinks.twitter}><i className="fab fa-twitter" /></a>
                      <a className="btn btn-square" href={doctor.socialLinks.instagram}><i className="fab fa-instagram" /></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Team End */}
    </div>
  );
};

export default Team;
