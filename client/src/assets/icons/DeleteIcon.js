import React from "react";

const DeleteIcon = ({
  fill = "currentColor",
  width = "24",
  height = "24",
  className
}) => (
  <svg width={width} height={height} viewBox="0 0 24 24" className={className}>
    <path fill={fill}  d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
  </svg>
);

export default DeleteIcon;
