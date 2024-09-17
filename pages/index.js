import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Questionnaire Hub</h1>
      <div>
        <Link href="/copd">
          <button>COPD Questionnaire</button>
        </Link>
      </div>
      <div>
        <Link href="/tinkerman">
          <button>Tinkerman Questionnaire</button>
        </Link>
      </div>

    <div>
        <Link href="/audio">
          <button>Audio Upload</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
