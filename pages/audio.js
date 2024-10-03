import { useState, useRef } from 'react';

const AudioPage = () => {
  const [audioSrc, setAudioSrc] = useState(null); // URL for the audio file (uploaded or recorded)
  const [isRecording, setIsRecording] = useState(false); // Whether the user is recording or not
  const [recordedChunks, setRecordedChunks] = useState([]); // Chunks of recorded data
  const mediaRecorderRef = useRef(null); // To store MediaRecorder instance
  const audioPlayerRef = useRef(null); // Reference to the audio player element

  // Function to handle audio file upload
  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioURL = URL.createObjectURL(file);
      setAudioSrc(audioURL);
    }
  };

  // Collect audio data chunks when recording
  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Audio Upload and Player</h2>

      {/* Audio Upload */}
      <div>
        <h3>Upload an Audio File</h3>
        <input type="file" accept="audio/*" onChange={handleAudioUpload} />
      </div>

      {/* Audio Player */}
      {audioSrc && (
        <div style={{ marginTop: '20px' }}>
          <h3>Play the Audio</h3>
          <audio ref={audioPlayerRef} controls src={audioSrc} />
        </div>
      )}
    </div>
  );
};

export default AudioPage;
