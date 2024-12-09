import React from 'react';
import { UserMediaError, useUserMedia } from '@vardius/react-user-media';

function VideoRecorder() {
  const { stream, error } = useUserMedia({ audio: true, video: true });

  if (error) {
    return (
      <UserMediaError error={error} />
    );
  }

  return (
    <div>
      <video autoPlay ref={video => { video.srcObject = stream }} />
    </div>
  );
};

export default VideoRecorder;
