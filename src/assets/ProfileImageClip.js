import React from 'react';

export const ProfileImageClip = ({ imageUrl }) => {
  return (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <path d="M0 0H35V17.5C35 27.165 27.165 35 17.5 35C7.83502 35 0 27.165 0 17.5V0Z" fill="url(#pattern0_489_11931)" />
      <defs>
        <pattern id="pattern0_489_11931" patternContentUnits="objectBoundingBox" width="1" height="1">
          <image 
            xlinkHref={imageUrl} 
            transform="translate(0 -0.2) scale(0.00588235)" 
            width="1" 
            height="1" 
          />
        </pattern>
      </defs>
    </svg>
  );
};
