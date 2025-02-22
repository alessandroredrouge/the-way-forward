import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 32 }: LogoProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 375 375"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M187.5 0C83.945312 0 0 83.945312 0 187.5C0 291.054688 83.945312 375 187.5 375C291.054688 375 375 291.054688 375 187.5C375 83.945312 291.054688 0 187.5 0Z"
      fill="currentColor"
    />
    {/* Add the rest of the SVG paths with their respective colors */}
  </svg>
);

export default Logo;
