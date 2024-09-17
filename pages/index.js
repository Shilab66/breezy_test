import Link from 'next/link';  // Assuming you're using Next.js

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Questionnaire Hub</h1>
      <p>Please choose one of the following questionnaires:</p>

      <div style={{ margin: '20px' }}>
        <Link href="/components/COPDQuestionnaire">
          <button style={buttonStyle}>COPD Questionnaire</button>
        </Link>
      </div>

      <div style={{ margin: '20px' }}>
        <Link href="/components/TinkermanQuestionnaire">
          <button style={buttonStyle}>Tinkerman Questionnaire</button>
        </Link>
      </div>
    </div>
  );
};

// Style for the buttons
const buttonStyle = {
  padding: '15px 30px',
  fontSize: '18px',
  cursor: 'pointer',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

export default HomePage;
