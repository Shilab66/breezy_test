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

  <div>
       <Link href="/VoiceRecorder">
         <button>Audio Record</button>
       </Link>
     </div>

     <div>
       <Link href="/login">
         <button>Login</button>
       </Link>
     </div>

    <div>
       <Link href="/signup">
         <button>Sign Up</button>
       </Link>
     </div>

  <div>
       <Link href="/slideshow">
         <button>Slideshow</button>
       </Link>
     </div>

   <div>
       <Link href="/calendar">
         <button>Calandar</button>
       </Link>
     </div>

  
   </div>
 );
};


export default HomePage;