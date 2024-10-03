// Slideshow.js
import React, { useState } from 'react';

const slides = [
  {
    id: 1,
    image: '/path/to/image1.png', // Update with actual path
    instruction: 'Step 1: Insert Instruction',
    description: 'More text about what to do in step 1'
  },
  {
    id: 2,
    image: '/path/to/image2.png', // Update with actual path
    instruction: 'Step 2: Insert Instruction',
    description: 'More text about what to do in step 2'
  },
  {
    id: 3,
    image: '/path/to/image3.png', // Update with actual path
    instruction: 'Step 3: Insert Instruction',
    description: 'More text about what to do in step 3'
  }
];

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="slideshow">
      <div className="slide" key={slides[currentSlide].id}>
        <h2>Directions</h2>
        <div className="content">
          <img src={slides[currentSlide].image} alt="instruction" />
          <div className="text">
            <h3>{slides[currentSlide].instruction}</h3>
            <p>{slides[currentSlide].description}</p>
          </div>
        </div>
        <div className="controls">
          <button onClick={prevSlide}>&lt;</button>
          <button onClick={nextSlide}>&gt;</button>
        </div>
        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={index === currentSlide ? 'dot active' : 'dot'}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slideshow;
