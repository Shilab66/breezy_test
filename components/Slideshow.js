// Slideshow.js
import React, { useState } from 'react';

const slides = [
  {
    id: 1,
    image: '/images/image1.png', // Update with actual path
    instruction: 'Step 1: Insert Instruction',
    description: 'More text about what to do in step 1',
  },
  {
    id: 2,
    image: '/images/image2.png', // Update with actual path
    instruction: 'Step 2: Insert Instruction',
    description: 'More text about what to do in step 2',
  },
  {
    id: 3,
    image: '/images/image3.png', // Update with actual path
    instruction: 'Step 3: Insert Instruction',
    description: 'More text about what to do in step 3',
  },
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
    <div style={styles.slideshow}>
      <h2 style={styles.header}>Directions</h2>
      <div key={slides[currentSlide].id} style={styles.slide}>
        <div style={styles.content}>
          <img src={slides[currentSlide].image} alt="instruction" style={styles.image} />
          <div style={styles.text}>
            <h3>{slides[currentSlide].instruction}</h3>
            <p>{slides[currentSlide].description}</p>
          </div>
        </div>
        <div style={styles.controls}>
          <button onClick={prevSlide} style={styles.button}>&lt;</button>
          <button onClick={nextSlide} style={styles.button}>&gt;</button>
        </div>
        <div style={styles.dots}>
          {slides.map((_, index) => (
            <span
              key={index}
              style={index === currentSlide ? { ...styles.dot, ...styles.activeDot } : styles.dot}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  slideshow: {
    width: '80%',
    margin: 'auto',
    textAlign: 'center',
  },
  header: {
    color: '#007bff',
    marginBottom: '20px',
  },
  slide: {
    padding: '20px',
    border: '1px solid #007bff',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '200px',
    height: 'auto',
    marginRight: '20px',
  },
  text: {
    textAlign: 'left',
  },
  controls: {
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px',
    margin: '0 10px',
    cursor: 'pointer',
    fontSize: '18px',
  },
  dots: {
    marginTop: '10px',
  },
  dot: {
    height: '15px',
    width: '15px',
    margin: '0 5px',
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block',
  },
  activeDot: {
    backgroundColor: '#007bff',
  },
};

export default Slideshow;
