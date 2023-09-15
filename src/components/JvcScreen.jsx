import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import './JvcScreen.css'

const WebsiteTexture = (props) => {
    const css3DObjectStyle = {
        width: '800px',
        height: '600px',
        backgroundColor: 'red', // Set a visible background color
        position: 'absolute',
        left: '0px',
        top: '0px',
      };
    
      return (
        <Html style={css3DObjectStyle}></Html>
      );
};

export default WebsiteTexture;