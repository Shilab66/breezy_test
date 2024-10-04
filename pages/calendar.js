import React, { useState } from 'react';
import './css/calendar.css'; // Import the CSS file

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

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  
  const getTraitColor = (day) => {
    // Dummy function: returns random points based on day. Replace with real data.
    const randomTrait = Math.floor(Math.random() * 3);
    const trait = traitsData[selectedTrait][randomTrait];
    return trait.color;
  };

  const renderDays = () => {
    const daysArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(
        <div key={day} className="calendar-day" style={{ backgroundColor: getTraitColor(day) }}>
          {day}
        </div>
      );
    }
    return daysArray;
  };

  return (
    <div>
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
    </div>
  );
};

export default Calendar;
