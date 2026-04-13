

import Carousel from "react-bootstrap/Carousel";

export function HeroCarousel() {
  return (
    <Carousel fade>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80"
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
          src="http://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1600&q=80"
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
          src="http://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
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