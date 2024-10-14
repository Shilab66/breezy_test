import { useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs' 

const AudioPage = () => {
  useEffect(() => {
    tf.loadLayersModel("pages/model.json").then(model => {
      this._model = model;
    })
  }, []);

  const [audioSrc, setAudioSrc] = useState(null); // URL for the uploaded audio file
  const [audioBuffer, setAudioBuffer] = useState(null);
  const audioPlayerRef = useRef(null); // Reference to the audio player element
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());

  // Function to handle audio file upload
  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioURL = URL.createObjectURL(file);
      setAudioSrc(audioURL);

      // Process the audio file to extract signal
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const audioContext = audioContextRef.current;

        // Decode the audio data into an audio buffer
        const decodedAudioData = await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(decodedAudioData);

        // Access the raw signal data (audio samples)
        const signalData = decodedAudioData.getChannelData(0); // Get the data from the first channel
        console.log(signalData); // Signal data is an array of audio samples

        // You can now feed `signalData` into your model for prediction
        runModel(signalData);
      };

      reader.readAsArrayBuffer(file);
    }

  };

  const runModel = (audioURL) =>{
    model.predict(audioURL);
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
