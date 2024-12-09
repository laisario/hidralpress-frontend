import React, { useRef, useState } from 'react'

function VideoRecorder() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      mediaRecorderRef.current = new MediaRecorder(mediaStream);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  };

  const startRecording = () => {
    if (!stream) {
      console.error("Media stream not started");
      return;
    }
    setIsRecording(true);
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const downloadRecording = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recording.webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div>
        {!stream && <button onClick={startCamera}>Start Camera</button>}
        {stream && (
          <>
            {!isRecording && <button onClick={startRecording}>Start Recording</button>}
            {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
            {recordedChunks.length > 0 && <button onClick={downloadRecording}>Download</button>}
          </>
        )}
      </div>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%" }} />
    </div>
  );
}

export default VideoRecorder