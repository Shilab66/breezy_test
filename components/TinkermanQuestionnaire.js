import { useState } from 'react';import { doc, setDoc } from 'firebase/firestore'; // Firestore functions
import { auth, db } from '../firebase.js'; // Firebase config

const storeTinkerManResult = async (result) => {
  const user = auth.currentUser; // Get the currently authenticated user

  if (user) {
    const userId = user.uid; // Unique user ID

    // Create a reference to the document (user ID is the document ID)
    const userDocRef = doc(db, 'users', userId);

    // Set the tinkerManResult in the user's document
    await setDoc(userDocRef, {
      tinkerManResult: result, // Store the result here
      lastUpdated: new Date().toISOString(), // Optionally track when it was last updated
    }, { merge: true }); // Use 'merge: true' to avoid overwriting other data in this document
  } else {
    console.log('No authenticated user found');
  }
};


// Constants for the questionnaire options
const AgeOnset = {
  ASTHMA: { value: 2, label: 'Childhood or Young Adult (Asthma)' },
  COPD: { value: 1, label: 'Middle Age or Older (COPD)' },
  HEALTHY: { value: 0, label: 'Neither (Healthy)' }
};

const SmokingHistory = { 
  SIGNIFICANT: { value: 1, label: 'Significant Smoking History (COPD)' },
  NONE: { value: 0, label: 'No Significant Smoking History (Healthy/Asthma)' }
};

const FamilyHistory = {
  ASTHMA: { value: 2, label: 'Yes (Asthma)' },
  NONE: { value: 0, label: 'No (Healthy/COPD)' }
};

const Cough = {
  ASTHMA: { value: 2, label: 'Intermittent and Worse at Night/Early Morning (Asthma)' },
  COPD: { value: 1, label: 'Persistent and Productive (COPD)' },
  NONE: { value: 0, label: 'None or Rarely (Healthy)' }
};

const ShortnessBreath = {
  ASTHMA: { value: 2, label: 'Episodic, Triggered by Specific Stimuli (Asthma)' },
  COPD: { value: 1, label: 'Progressive, Related to Activity Levels (COPD)' },
  NONE: { value: 0, label: 'None or Mild (Healthy)' }
};

const Wheezing = {
  ASTHMA: { value: 2, label: 'Common, Improved with Inhalers (Asthma)' },
  COPD: { value: 1, label: 'Less Common or Not Responsive to Inhalers (COPD)' },
  NONE: { value: 0, label: 'None or Rarely (Healthy)' }
};

const SputumProduction = {
  ASTHMA: { value: 2, label: 'Less Frequent (Asthma)' },
  COPD: { value: 1, label: 'Regular and Productive (COPD)' },
  NONE: { value: 0, label: 'None or Rarely (Healthy)' }
};

const SymptomVariation = {
  ASTHMA: { value: 2, label: 'Significant Variation Over Time (Asthma)' },
  COPD: { value: 1, label: 'Less Variation, Progressive Symptoms (COPD)' },
  NONE: { value: 0, label: 'Stable or No Symptoms (Healthy)' }
};

function determineDiagnosis(totalScore, ageOnset, smokingHistory, cough) {
  if (totalScore >= 10 && totalScore <= 14) {
    if (ageOnset === AgeOnset.COPD.value && (smokingHistory === SmokingHistory.SIGNIFICANT.value || cough === Cough.COPD.value)) {
      return 'Asthma-COPD Overlap Syndrome (ACOS)';
    }
    return 'Asthma';
  } else if (totalScore >= 4 && totalScore <= 9) {
    return 'COPD';
  } else {
    return 'Healthy';
  }
}

const HealthQuestionnaire = () => {
  const [ageOnset, setAgeOnset] = useState(AgeOnset.HEALTHY.value);
  const [smokingHistory, setSmokingHistory] = useState(SmokingHistory.NONE.value);
  const [familyHistory, setFamilyHistory] = useState(FamilyHistory.NONE.value);
  const [cough, setCough] = useState(Cough.NONE.value);
  const [shortnessBreath, setShortnessBreath] = useState(ShortnessBreath.NONE.value);
  const [wheezing, setWheezing] = useState(Wheezing.NONE.value);
  const [sputumProduction, setSputumProduction] = useState(SputumProduction.NONE.value);
  const [symptomVariation, setSymptomVariation] = useState(SymptomVariation.NONE.value);

  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalScore =
      ageOnset +
      smokingHistory +
      familyHistory +
      cough +
      shortnessBreath +
      wheezing +
      sputumProduction +
      symptomVariation;

    const diagnosis = determineDiagnosis(totalScore, ageOnset, smokingHistory, cough);
    setResult(`Your profile suggests: ${diagnosis}`);
    storeTinkerManResult(diagnosis);
  };

  return (
    <div>
      <h2>Health Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age of Onset:</label>
          <select value={ageOnset} onChange={(e) => setAgeOnset(parseInt(e.target.value, 10))}>
            {Object.values(AgeOnset).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Smoking History:</label>
          <select value={smokingHistory} onChange={(e) => setSmokingHistory(parseInt(e.target.value, 10))}>
            {Object.values(SmokingHistory).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Family History:</label>
          <select value={familyHistory} onChange={(e) => setFamilyHistory(parseInt(e.target.value, 10))}>
            {Object.values(FamilyHistory).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Cough:</label>
          <select value={cough} onChange={(e) => setCough(parseInt(e.target.value, 10))}>
            {Object.values(Cough).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Shortness of Breath:</label>
          <select value={shortnessBreath} onChange={(e) => setShortnessBreath(parseInt(e.target.value, 10))}>
            {Object.values(ShortnessBreath).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Wheezing:</label>
          <select value={wheezing} onChange={(e) => setWheezing(parseInt(e.target.value, 10))}>
            {Object.values(Wheezing).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sputum Production:</label>
          <select value={sputumProduction} onChange={(e) => setSputumProduction(parseInt(e.target.value, 10))}>
            {Object.values(SputumProduction).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Symptom Variation:</label>
          <select value={symptomVariation} onChange={(e) => setSymptomVariation(parseInt(e.target.value, 10))}>
            {Object.values(SymptomVariation).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      {result && <div><strong>{result}</strong></div>}
    </div>
  );
};

export default HealthQuestionnaire;
