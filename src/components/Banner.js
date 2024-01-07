import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from '../components/ExampleCarouselImage'
import img1 from '../assets/albums/BANNER_28105062611061.webp'
import img2 from '../assets/albums/BANNER_282014765679039.webp'
import img3 from '../assets/albums/BANNER_698558766257983.webp'
// import img2 from '../assets/images (12).jpeg'
import '../components/style.I.css'
function Banner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='carosusel_banner'>
      <Carousel activeIndex={index} className='cb_incr' onSelect={handleSelect}>
        <Carousel.Item>
          <img src={img1} className='banner_imgs' />
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img2} className='banner_imgs' />
          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img3} className='banner_imgs' />
          <Carousel.Caption>


            {/* <h3>Third slide label</h3> */}
            {/* <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className='cb_faded_bottom'></div>
    </div>

  );
}

export default Banner;