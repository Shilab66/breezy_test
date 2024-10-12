import { useState } from 'react';
import { auth, db } from '../firebase.js'; // Firebase config

const storeCOPDResult = async (result) => {
  const user = auth.currentUser; // Get the currently authenticated user

  if (user) {
    const userId = user.uid; // Unique user ID

    // Create a reference to the document (user ID is the document ID)
    const userDocRef = doc(db, 'users', userId);

    // Set the COPD in the user's document
    await setDoc(userDocRef, {
      COPDResult: result, // Store the result here
      lastUpdated: new Date().toISOString(), // Optionally track when it was last updated
    }, { merge: true }); // Use 'merge: true' to avoid overwriting other data in this document
  } else {
    console.log('No authenticated user found');
  }
};

// Enum-like constants for the dropdowns
const CoughSound = {
  NORMAL: 'Normal',
  COPD: 'COPD',
};

const Symptoms = {
  NONE: { value: 0, label: 'None' },
  MILD: { value: 1, label: 'Mild' },
  SEVERE: { value: 2, label: 'Coughing, wheezing, and shortness of breath' },
  VERY_SEVERE: { value: 3, label: 'Air flow severely limited' },
  EXTREME: { value: 4, label: 'Extremely hard to breathe' },
};

const COPDGroup = {
  NO_COPD: 'No COPD',
  GROUP_A: 'Group A',
  GROUP_B: 'Group B',
  GROUP_C: 'Group C',
  GROUP_D: 'Group D',
  UNCATEGORIZED: 'Uncategorized',
};

function determineCOPDGroup(coughSound, symptoms, CATScore, exacerbations, hospitalVisits) {
  if (coughSound === CoughSound.NORMAL) {
    return COPDGroup.NO_COPD;
  } else if (CATScore + symptoms.value <= 11 && exacerbations <= 1 && hospitalVisits === 0) {
    return COPDGroup.GROUP_A;
  } else if (CATScore + symptoms.value >= 12 && exacerbations <= 1 && hospitalVisits === 0) {
    return COPDGroup.GROUP_B;
  } else if (CATScore + symptoms.value <= 11 && exacerbations >= 2 && hospitalVisits >= 0) {
    return COPDGroup.GROUP_C;
  } else if (CATScore + symptoms.value <= 11 && exacerbations >= 1 && hospitalVisits >= 1) {
    return COPDGroup.GROUP_C;
  } else if (CATScore + symptoms.value >= 12 && exacerbations >= 1 && hospitalVisits >= 1) {
    return COPDGroup.GROUP_D;
  } else if (CATScore + symptoms.value >= 12 && exacerbations >= 2 && hospitalVisits >= 0) {
    return COPDGroup.GROUP_D;
  }
  return COPDGroup.UNCATEGORIZED;
}

const COPDQuestionnaire = () => {
  const [coughSound, setCoughSound] = useState(CoughSound.NORMAL);
  const [symptoms, setSymptoms] = useState(Symptoms.NONE);
  const [questionScores, setQuestionScores] = useState(Array(8).fill(0)); // Initialize scores for 8 questions
  const [exacerbations, setExacerbations] = useState(0);
  const [hospitalVisits, setHospitalVisits] = useState(0);
  const [result, setResult] = useState('');

  // Calculate CATScore as the sum of all question scores
  const CATScore = questionScores.reduce((a, b) => a + b, 0);

  const handleQuestionChange = (index, value) => {
    const newScores = [...questionScores];
    newScores[index] = parseInt(value, 10);
    setQuestionScores(newScores);
  };

  const handleExacerbationsChange = (e) => {
    setExacerbations(Math.max(0, parseInt(e.target.value, 10) || 0));
  };

  const handleHospitalVisitsChange = (e) => {
    setHospitalVisits(Math.max(0, parseInt(e.target.value, 10) || 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const group = determineCOPDGroup(coughSound, symptoms, CATScore, exacerbations, hospitalVisits);
    setResult(`The patient falls into: ${group}`);
    if (CATScore < 10 && exacerbations <= 1 && hospitalVisits === 0) {
      setDebug(`true`);
    } else {
      setDebug(`false`);
    }
    storeCOPDResult(group);
  };

  return (
    <div>
      <h2>COPD Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cough Sound:</label>
          <select value={coughSound} onChange={(e) => setCoughSound(e.target.value)}>
            {Object.values(CoughSound).map((sound) => (
              <option key={sound} value={sound}>
                {sound}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Symptoms:</label>
          <select
            value={symptoms.label}
            onChange={(e) => setSymptoms(Object.values(Symptoms).find(symptom => symptom.label === e.target.value))}
          >
            {Object.values(Symptoms).map((symptom) => (
              <option key={symptom.value} value={symptom.label}>
                {symptom.label}
              </option>
            ))}
          </select>
        </div>

        {[
          "I never cough / I cough all the time",
          "I have no phlegm in my chest / My chest is full of phlegm",
          "My chest does not feel tight / My chest feels very tight",
          "Not breathless walking up a hill / Very breathless walking up a hill",
          "Not limited in activities / Very limited in activities",
          "Confident leaving home / Not confident leaving home",
          "Sleep soundly / Don't sleep soundly",
          "Lots of energy / No energy at all"
        ].map((question, index) => (
          <div key={index}>
            <label>{question}:</label>
            <select
              value={questionScores[index]}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            >
              {[0, 1, 2, 3, 4, 5].map((score) => (
                <option key={score} value={score}>
                  {score}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div>
          <label>Number of Exacerbations:</label>
          <input
            type="number"
            value={exacerbations}
            onChange={handleExacerbationsChange}
            min="0"
          />
        </div>

        <div>
          <label>Number of Hospital Visits:</label>
          <input
            type="number"
            value={hospitalVisits}
            onChange={handleHospitalVisitsChange}
            min="0"
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {result && <div><strong>{result}</strong></div>}
    </div>
  );
};

export default COPDQuestionnaire;
