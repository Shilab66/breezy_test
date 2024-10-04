import React, { useState } from 'react';
import '../css/calendar.css';

const traitsData = {
  Cough: [
    { label: 'Intermittent and Worse at Night/Early Morning (Asthma)', points: 2, color: 'darkgreen' },
    { label: 'Persistent and Productive (COPD)', points: 1, color: 'lightgreen' },
    { label: 'None or Rarely (Healthy)', points: 0, color: 'transparent' }
  ],
  ShortnessOfBreath: [
    { label: 'Episodic, Triggered by Specific Stimuli (Asthma)', points: 2, color: 'darkgreen' },
    { label: 'Progressive, Related to Activity Levels (COPD)', points: 1, color: 'lightgreen' },
    { label: 'None or Mild (Healthy)', points: 0, color: 'transparent' }
  ],
  Wheezing: [
    { label: 'Common, Improved with Inhalers (Asthma)', points: 2, color: 'darkgreen' },
    { label: 'Less Common or Not Responsive to Inhalers (COPD)', points: 1, color: 'lightgreen' },
    { label: 'None or Rarely (Healthy)', points: 0, color: 'transparent' }
  ],
  SputumProduction: [
    { label: 'Less Frequent (Asthma)', points: 2, color: 'darkgreen' },
    { label: 'Regular and Productive (COPD)', points: 1, color: 'lightgreen' },
    { label: 'None or Rarely (Healthy)', points: 0, color: 'transparent' }
  ],
  SymptomVariation: [
    { label: 'Significant Variation Over Time (Asthma)', points: 2, color: 'darkgreen' },
    { label: 'Less Variation, Progressive Symptoms (COPD)', points: 1, color: 'lightgreen' },
    { label: 'Stable or No Symptoms (Healthy)', points: 0, color: 'transparent' }
  ]
};

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedTrait, setSelectedTrait] = useState('Cough');
  const [hoveredDay, setHoveredDay] = useState(null); // To track hovered day
  const [popupInfo, setPopupInfo] = useState(null); // To show pop-up info

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  
  const getTraitColor = (day) => {
    // returns random points based on day. Replace with real data.
    const randomTrait = Math.floor(Math.random() * 3);
    const trait = traitsData[selectedTrait][randomTrait];
    return trait ? trait.color : '#e0e0e0'; // Gray color for no data
  };

  const getDayInfo = () => {
    const randomTrait = Math.floor(Math.random() * 3);
    return traitsData[selectedTrait][randomTrait]; // Return the info for pop-up
  };

  const renderDays = () => {
    const daysArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dayInfo = getDayInfo(day);

      daysArray.push(
        <div 
          key={day} 
          className="calendar-day" 
          style={{ backgroundColor: getTraitColor(day) }}
          onMouseEnter={() => {
            setHoveredDay(day);
            setPopupInfo(dayInfo); // Set info for the day
          }}
          onMouseLeave={() => {
            setHoveredDay(null);
            setPopupInfo(null); // Remove pop-up info on hover leave
          }}
        >
          {day}
        </div>
      );
    }
    return daysArray;
  };

  return (
    <div className="calendar-container">
      {/* Month & Year Selector */}
      <div className="selectors">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={2020 + i}>{2020 + i}</option>
          ))}
        </select>

        {/* Trait Selector */}
        <select value={selectedTrait} onChange={(e) => setSelectedTrait(e.target.value)}>
          {Object.keys(traitsData).map((trait, i) => (
            <option key={i} value={trait}>{trait}</option>
          ))}
        </select>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {renderDays()}
      </div>

      {/* Pop-up info */}
      {hoveredDay && popupInfo && (
        <div className="popup">
          <h4>Day {hoveredDay} Info</h4>
          <p>{popupInfo.label}</p>
          <p>Points: {popupInfo.points}</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
