import React from 'react'

const Hero = () => {
    useEffect(() => {
       
        const initializeOwlCarousel = () => {
          if ($('.owl-carousel').length > 0) {
            $('.owl-carousel').owlCarousel('destroy'); 
            $('.owl-carousel').owlCarousel({
              items: 1, 
              loop: true,
              autoplay: true,
              autoplayTimeout: 3000,
              autoplayHoverPause: true,
              nav: true,  
              dots: true,  
              navText: ['<', '>'], 
            });
          }
        };
      
        initializeOwlCarousel();
      }, []);
      
  return (
    <div>
    {/* Header Start */}
    <div className="container-fluid header bg-primary p-0 mb-5">
      <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
        <div className="col-lg-6 p-5 wow fadeIn" data-wow-delay="0.1s">
          <h1 className="display-4 text-white mb-5">Good Health Is The Root Of All Heppiness</h1>
          <div className="row g-4">
            <div className="col-sm-4">
              <div className="border-start border-light ps-4">
                <h2 className="text-white mb-1" data-toggle="counter-up">123</h2>
                <p className="text-light mb-0">Expert Doctors</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="border-start border-light ps-4">
                <h2 className="text-white mb-1" data-toggle="counter-up">1234</h2>
                <p className="text-light mb-0">Medical Stuff</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="border-start border-light ps-4">
                <h2 className="text-white mb-1" data-toggle="counter-up">12345</h2>
                <p className="text-light mb-0">Total Patients</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
          <div className="owl-carousel header-carousel">
            <div className="owl-carousel-item position-relative">
            
            <img className="img-fluid" src={carouselImage1} alt="Ramith" />
              <div className="owl-carousel-text">
                <h1 className="display-1 text-white mb-0">Cardiology</h1>
              </div>
            </div>
            <div className="owl-carousel-item position-relative">
              <img className="img-fluid" src={carouselImage2} alt="" />
              <div className="owl-carousel-text">
                <h1 className="display-1 text-white mb-0">Neurology</h1>
              </div>
            </div>
            <div className="owl-carousel-item position-relative">
              <img className="img-fluid" src={carouselImage3} alt="" />
              <div className="owl-carousel-text">
                <h1 className="display-1 text-white mb-0">Pulmonary</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Header End */}
    </div>
  )
}

export default Hero