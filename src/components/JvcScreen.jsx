import React, { useRef } from 'react';
import { Html } from '@react-three/drei';

const WebsiteTexture = () => {
  const iframeRef = useRef(null);

  return (
    <Html center>
      <div style={{ width: '100%', height: '100%' }}>
        <iframe
          ref={iframeRef}
          title="Website"
          src="https://iframetester.com/" 
          style={{ 
            width: '900px',
            height: '500px', 
            position: 'absolute',  
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '-5',
            }}
        ></iframe>
      </div>
    </Html>
  );
};

export default WebsiteTexture;