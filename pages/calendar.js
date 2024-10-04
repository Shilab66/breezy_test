import React, { useState } from 'react';
import '../css/calendar.css'; // Importing the CSS file

const traitsData = {
  1: {
    Cough: { label: 'Intermittent and Worse at Night/Early Morning (Asthma)', points: 2, color: 'darkgreen' },
    ShortnessOfBreath: { label: 'Episodic, Triggered by Specific Stimuli (Asthma)', points: 2, color: 'darkgreen' },
    Wheezing: { label: 'Common, Improved with Inhalers (Asthma)', points: 2, color: 'darkgreen' },
    SputumProduction: { label: 'Less Frequent (Asthma)', points: 2, color: 'darkgreen' },
    SymptomVariation: { label: 'Significant Variation Over Time (Asthma)', points: 2, color: 'darkgreen' }
  },
  2: {
    Cough: { label: 'Persistent and Productive (COPD)', points: 1, color: 'lightgreen' },
    ShortnessOfBreath: { label: 'Progressive, Related to Activity Levels (COPD)', points: 1, color: 'lightgreen' },
    Wheezing: { label: 'Less Common or Not Responsive to Inhalers (COPD)', points: 1, color: 'lightgreen' },
    SputumProduction: { label: 'Regular and Productive (COPD)', points: 1, color: 'lightgreen' },
    SymptomVariation: { label: 'Less Variation, Progressive Symptoms (COPD)', points: 1, color: 'lightgreen' }
  },
  3: {}, // No data for day 3
  // Add similar entries for each day of the month
};

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hoveredDay, setHoveredDay] = useState(null); // To track hovered day
  const [popupInfo, setPopupInfo] = useState(null); // To show pop-up info

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const getTraitColor = (day) => {
    const dayData = traitsData[day];
    if (!dayData) return '#e0e0e0'; // Gray color for no data

    // Calculate a color based on the traits (e.g., prioritize higher severity traits like 2 points)
    const severity = Object.values(dayData).reduce((max, trait) => Math.max(max, trait.points), 0);
    if (severity === 2) return 'darkgreen';
    if (severity === 1) return 'lightgreen';
    return '#e0e0e0'; // Gray for no or zero points
  };

  const getDayInfo = (day) => {
    return traitsData[day] || {}; // Return info for the day, or empty if no data
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
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {renderDays()}
      </div>

      {/* Pop-up info */}
      {hoveredDay && popupInfo && (
        <div className="popup">
          <h4>Day {hoveredDay} Info</h4>
          {Object.keys(popupInfo).length > 0 ? (
            Object.entries(popupInfo).map(([trait, data]) => (
              <div key={trait}>
                <p><strong>{trait}:</strong> {data.label} (Points: {data.points})</p>
              </div>
            ))
          ) : (
            <p>No data available for this day</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
