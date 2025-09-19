import React from "react";

const BoxGradientDefinitions = () => (
  <>
    <linearGradient id={`orange-box-gradient`} x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stopColor="#ca470aff" />
      <stop offset="50%" stopColor="#ef8b07ff" />
      <stop offset="100%" stopColor="#ca470aff" />
    </linearGradient>
    <linearGradient id={`dark-blue-box-gradient`} x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stopColor="#0a3aca" />
      <stop offset="100%" stopColor="#051958" />
    </linearGradient>
  </>
);

export default BoxGradientDefinitions;
