

import Carousel from "react-bootstrap/Carousel";

export function HeroCarousel() {
  return (
    <Carousel fade>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
          alt="slide1"
          style={{ height: "420px", objectFit: "cover" }}
        />

        <Carousel.Caption>
          <h2>Modern Living Room Furniture</h2>
          <p>Premium furniture for your beautiful home</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
          alt="slide2"
          style={{ height: "420px", objectFit: "cover" }}
        />

        <Carousel.Caption>
          <h2>Comfortable Sofas</h2>
          <p>Relax with luxury sofas</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920"
          alt="slide3"
          style={{ height: "420px", objectFit: "cover" }} />
        

        <Carousel.Caption>

           
 



 
   
  
          <h2>Luxury Bedroom</h2>
          <p>Best beds for perfect sleep</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}