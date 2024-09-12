import { useState } from 'react';

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
  } else if (CATScore + symptoms.value => 12 && exacerbations <= 1 && hospitalVisits === 0) {
      return COPDGroup.GROUP_B;
  } else if (CATScore + symptoms.value <= 11 && exacerbations >= 2 && hospitalVisits >= 0) {
      return COPDGroup.GROUP_C;
  } else if (CATScore + symptoms.value <= 11 && exacerbations >= 1 && hospitalVisits >= 1) {
      return COPDGroup.GROUP_C;
  } else if (CATScore + symptoms.value => 12 && exacerbations >= 1 && hospitalVisits >= 1) {
      return COPDGroup.GROUP_D;
  } else if (CATScore + symptoms.value => 12 && exacerbations >= 2 && hospitalVisits >= 0) {
      return COPDGroup.GROUP_D;
  }
  return COPDGroup.UNCATEGORIZED;
}

const COPDQuestionnaire = () => {
  const [coughSound, setCoughSound] = useState(CoughSound.NORMAL);
  const [symptoms, setSymptoms] = useState(Symptoms.NONE);
  const [CATScore, setCATScore] = useState(0);
  const [exacerbations, setExacerbations] = useState(0);
  const [hospitalVisits, setHospitalVisits] = useState(0);
  const [result, setResult] = useState('');
  const [debug, setDebug] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const group = determineCOPDGroup(coughSound, symptoms, CATScore, exacerbations, hospitalVisits);
    setResult(`The patient falls into: ${group}`);
    //setDebug(`${coughSound} + ${symptoms} + ${CATScore} + ${exacerbations} + ${hospitalVisits}`);
    if(CATScore < 10 && exacerbations <= 1 && hospitalVisits == 0){
      setDebug(`true`);
    } else {
      setDebug(`false`);
    }
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

        <div>
          <label>CAT Score:</label>
          <input type="number" value={CATScore} onChange={(e) => setCATScore(e.target.value)} />
        </div>

        <div>
          <label>Number of Exacerbations:</label>
          <input type="number" value={exacerbations} onChange={(e) => setExacerbations(e.target.value)} />
        </div>

        <div>
          <label>Number of Hospital Visits:</label>
          <input type="number" value={hospitalVisits} onChange={(e) => setHospitalVisits(e.target.value)} />
        </div>

        <button type="submit">Submit</button>
      </form>

      {result && <div><strong>{result}</strong></div>}
      {debug && <div><strong>{debug}</strong></div>}
    </div>
  );
};

export default COPDQuestionnaire;
