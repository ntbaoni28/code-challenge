import type { SVGProps } from "react";
const SwapIcon = (props: SVGProps<SVGSVGElement> ) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M21 7.5L8 7.5M21 7.5L16.6667 3M21 7.5L16.6667 12"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16.5L17 16.5M4 16.5L8.33333 21M4 16.5L8.33333 12"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SwapIcon;
