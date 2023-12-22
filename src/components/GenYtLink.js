import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function App() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  return (
    <div>
      <h1>YouTube Video Player</h1>
      <input
        type="text"
        placeholder="Enter YouTube Video URL"
        value={videoUrl}
        onChange={handleInputChange}
      />
      <br />
      {videoUrl && (
        <ReactPlayer
          url={videoUrl}
          controls
          width="800px"
          height="450px"
        />
      )}
    </div>
  );
}

export default App;
