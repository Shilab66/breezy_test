import { useState, useRef } from 'react';

const AudioPage = () => {
  const [audioSrc, setAudioSrc] = useState(null); // URL for the uploaded audio file
  const audioPlayerRef = useRef(null); // Reference to the audio player element

  // Function to handle audio file upload
  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioURL = URL.createObjectURL(file);
      setAudioSrc(audioURL);
    }
  };

  // Function to download the audio file
  const handleDownload = () => {
    if (audioSrc) {
      const link = document.createElement('a');
      link.href = audioSrc;
      link.download = 'audio-file.mp3'; // Default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Audio Upload, Player, and Downloader</h2>

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

          {/* Download Button */}
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleDownload}>Download Audio</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPage;
