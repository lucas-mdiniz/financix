import React from 'react';
import PropTypes from 'prop-types';

const BackgroundLoginSVG = ({ className }) => {
  return (
    <svg
      className={className}
      width="180"
      height="203"
      viewBox="0 0 180 203"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path
          d="M58 40C-8.76837 14.7357 77.7667 -65.4466 104.856 -74.5996L138.944 -66.8704L312.607 81.0649C274.451 120.911 199.066 194.545 202.768 170.315C207.395 140.028 172.225 177.802 128 155C62.0555 121 110.856 60 58 40Z"
          fill="#FFC587"
        />
        <path
          d="M58 40C-8.76837 14.7357 77.7667 -65.4466 104.856 -74.5996L138.944 -66.8704L312.607 81.0649C274.451 120.911 199.066 194.545 202.768 170.315C207.395 140.028 172.225 177.802 128 155C62.0555 121 110.856 60 58 40Z"
          stroke="#FFC587"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.657623"
          y="-86.6809"
          width="340.155"
          height="289.049"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

BackgroundLoginSVG.propTypes = {
  className: PropTypes.string.isRequired,
};

export default BackgroundLoginSVG;
